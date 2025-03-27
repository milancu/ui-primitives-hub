import {ProjectService} from './project.service';
import {User} from "../models/user.model";
import {auth, db} from "../firebase";
import axios from "axios";
import {generatePKCE} from "../utils/pkce";
import crypto from "crypto";
import * as dotenv from "dotenv";

const DEVICE_CODES_REF = "deviceCodes";
const CODE_EXPIRATION = 15 * 60 * 1000;

dotenv.config();

export class AuthService {
  static async generateDeviceCode() {
    const deviceCode = this.generateUniqueId();
    const userCode = this.generateHumanFriendlyCode();
    const {codeChallenge} = generatePKCE();

    await db.ref(`${DEVICE_CODES_REF}/${deviceCode}`).set({
      userCode,
      codeChallenge,
      status: "pending",
      createdAt: Date.now()
    });

    return {
      device_code: deviceCode,
      user_code: userCode,
      verification_uri: `${process.env.FRONTEND_URL}/activate`,
      expires_in: CODE_EXPIRATION
    };
  }

  static async verifyDeviceCode(userCode: string, token: string) {
    const deviceCode = await this.findDeviceCodeByUserCode(userCode);

    await db.ref(`${DEVICE_CODES_REF}/${deviceCode}`).update({
      status: "approved",
      token:token,
    });
  }

  static async pollDeviceCode(deviceCode: string) {
    const snapshot = await db.ref(`${DEVICE_CODES_REF}/${deviceCode}`).get();
    const codeData = snapshot.val();

    if (!codeData) throw new Error("Invalid device code");
    if (codeData.status === "expired") throw new Error("Session expired");

    return {
      status: codeData.status,
      token: codeData.token
    };
  }

  static async handleFigmaCallback(code: string, state: string) {
    if (state !== process.env.OAUTH_STATE_SECRET) {
      throw new Error("Invalid state parameter");
    }

    const accessToken = await AuthService.exchangeCodeForToken(code);
    const figmaUser = await AuthService.getFigmaUserProfile(accessToken);
    const firebaseUser = await this.getOrCreateFirebaseUser(figmaUser);

    return `${process.env.FRONTEND_URL}/auth/callback?token=${await auth.createCustomToken(firebaseUser.uid)}`;
  }

  private static async findDeviceCodeByUserCode(userCode: string) {
    const snapshot = await db.ref(DEVICE_CODES_REF)
      .orderByChild("userCode")
      .equalTo(userCode)
      .once("value");

    if (!snapshot.exists()) throw new Error("Invalid user code");
    return Object.keys(snapshot.val())[0];
  }

  private static async getOrCreateFirebaseUser(figmaUser: any) {
    const uid = `figma:${figmaUser.id}`;

    try {
      return await auth.getUser(uid);
    } catch {
      return auth.createUser({
        uid,
        email: figmaUser.email,
        displayName: figmaUser.handle,
        photoURL: figmaUser.img_url
      });
    }
  }

  private static generateHumanFriendlyCode() {
    const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    return Array.from({length: 6}, () => chars[Math.floor(Math.random() * chars.length)])
      .join("")
      .match(/.{1,3}/g)?.join("") || "";
  }

  private static generateUniqueId() {
    return crypto.randomBytes(16).toString("hex");
  }

  static async handleFigmaAuth(figmaUser: any): Promise<User> {
    const user = await this.getOrCreateUser(figmaUser);
    await this.initializeUserProjects(user);
    return user;
  }

  static buildFigmaAuthUrl = () => {
    const params = new URLSearchParams({
      client_id: process.env.FIGMA_CLIENT_ID!,
      redirect_uri: process.env.FIGMA_REDIRECT_URI!,
      scope: "file_read",
      state: "YOUR_UNIQUE_STATE",
      response_type: "code",
    });
    return `https://www.figma.com/oauth?${params.toString()}`;
  };

  static exchangeCodeForToken = async (code: string): Promise<string> => {
    const res = await axios.post(
      "https://api.figma.com/v1/oauth/token",
      new URLSearchParams({
        client_id: process.env.FIGMA_CLIENT_ID!,
        client_secret: process.env.FIGMA_CLIENT_SECRET!,
        redirect_uri: process.env.FIGMA_REDIRECT_URI!,
        code,
        grant_type: "authorization_code",
      }),
      {
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
      }
    );
    return res.data.access_token;
  };

  static getFigmaUserProfile = async (accessToken: string) => {
    const res = await axios.get("https://api.figma.com/v1/me", {
      headers: {Authorization: `Bearer ${accessToken}`},
    });
    return res.data;
  };

  static generateFrontendRedirectUrl = async (uid: string) => {
    const firebaseToken = await auth.createCustomToken(uid);
    return `${process.env.FRONTEND_URL}/auth/callback?token=${firebaseToken}`;
  };

  static async getOrCreateUser(figmaUser: any): Promise<User> {
    const uid = `figma:${figmaUser.id}`;
    try {
      const existingUser = await auth.getUser(uid);
      return this.mapToUserModel(existingUser, figmaUser);
    } catch (error) {
      const newUser = await auth.createUser({
        uid,
        email: figmaUser.email,
        displayName: figmaUser.handle,
        photoURL: figmaUser.img_url
      });
      return this.createUserInDatabase(newUser, figmaUser);
    }
  }

  static async createUserInDatabase(user: any, figmaUser: any): Promise<User> {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      figmaId: figmaUser.id,
      createdAt: new Date(),
      photoURL: user.photoURL,
      projects: []
    };

    await db.ref(`users/${user.uid}`).set(userData);
    return userData;
  }

  static async initializeUserProjects(user: User): Promise<void> {
    const snapshot = await db.ref(`users/${user.uid}/projects`).once('value');
    const projects = snapshot.val();
    const length = projects ? Object.keys(projects).length : 0;

    if (length === 0) {
      await ProjectService.createProject(user.uid, 'My First Project');
    }
  }

  static mapToUserModel(user: any, figmaUser: any): User {
    return {
      uid: user.uid,
      email: user.email,
      figmaId: figmaUser.id,
      createdAt: new Date(user.metadata.creationTime),
      photoURL: user.photoURL,
      projects: []
    };
  }
}