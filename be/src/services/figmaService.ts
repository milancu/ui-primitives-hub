import axios from "axios";
import { auth, db } from "../firebase";

export const buildFigmaAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.FIGMA_CLIENT_ID!,
    redirect_uri: process.env.FIGMA_REDIRECT_URI!,
    scope: "file_read",
    state: "YOUR_UNIQUE_STATE",
    response_type: "code",
  });
  return `https://www.figma.com/oauth?${params.toString()}`;
};

export const exchangeCodeForToken = async (code: string): Promise<string> => {
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
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
  return res.data.access_token;
};

export const getFigmaUserProfile = async (accessToken: string) => {
  const res = await axios.get("https://api.figma.com/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data;
};

export const getOrCreateFirebaseUser = async (figmaUser: any) => {
  const uid = `figma:${figmaUser.id}`;
  try {
    return await auth.getUser(uid);
  } catch (err: any) {
    if (err.code === "auth/user-not-found") {
      return await auth.createUser({
        uid,
        displayName: figmaUser.handle,
        email: figmaUser.email || "",
      });
    }
    throw err;
  }
};

export const saveUserToDatabase = async (uid: string, figmaUser: any) => {
  const userRef = db.ref(`users/${uid}`);
  await userRef.set({
    uid,
    email: figmaUser.email,
    figmaId: figmaUser.id,
    createdAt: new Date().toISOString(),
  });
};

export const generateFrontendRedirectUrl = async (uid: string) => {
  const firebaseToken = await auth.createCustomToken(uid);
  return `http://localhost:5173/auth/callback?token=${firebaseToken}`;
};