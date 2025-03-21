import {ProjectService} from './project.service';
import {User} from "../models/user.model";
import {auth, db} from "../firebase";
import axios from "axios";

export class AuthService {
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
    return `http://localhost:5173/auth/callback?token=${firebaseToken}`;
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