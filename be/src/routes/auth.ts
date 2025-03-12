import express from "express";
import {
  buildFigmaAuthUrl,
  exchangeCodeForToken,
  getFigmaUserProfile,
  getOrCreateFirebaseUser,
  saveUserToDatabase,
  generateFrontendRedirectUrl,
} from "../services/figmaService";

const router = express.Router();

router.get("/figma", (req, res) => {
  const url = buildFigmaAuthUrl();
  res.redirect(url);
});

router.get("/figma/callback", async (req: any, res: any) => {
  const { code, state } = req.query;
  if (state !== "YOUR_UNIQUE_STATE") {
    return res.status(400).json({ error: "Neplatný stavový parametr" });
  }

  try {
    const accessToken = await exchangeCodeForToken(code as string);
    const figmaUser = await getFigmaUserProfile(accessToken);
    const firebaseUser = await getOrCreateFirebaseUser(figmaUser);
    await saveUserToDatabase(firebaseUser.uid, figmaUser);
    const redirectUrl = await generateFrontendRedirectUrl(firebaseUser.uid);
    res.redirect(redirectUrl);
  } catch (err: any) {
    console.error("Chyba v callbacku:", err.response?.data || err.message);
    res.status(500).json({ error: "Authorization failed" });
  }
});

export default router;
