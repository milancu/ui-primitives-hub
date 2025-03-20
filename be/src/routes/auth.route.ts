import express from "express";
import {AuthService} from "../services/auth.service";

const router = express.Router();

router.get("/figma", (req, res) => {
  const url = AuthService.buildFigmaAuthUrl();
  res.redirect(url);
});

router.get("/figma/callback", async (req: any, res: any) => {
  const {code, state} = req.query;
  if (state !== "YOUR_UNIQUE_STATE") {
    return res.status(400).json({error: "Invalid state"});
  }

  try {
    const accessToken = await AuthService.exchangeCodeForToken(code as string);
    const figmaUser = await AuthService.getFigmaUserProfile(accessToken);
    const firebaseUser = await AuthService.handleFigmaAuth(figmaUser)
    const redirectUrl = await AuthService.generateFrontendRedirectUrl(firebaseUser.uid);
    res.redirect(redirectUrl);
  } catch (err: any) {
    console.error("Callback error:", err.response?.data || err.message);
    res.status(500).json({error: "Authorization failed"});
  }
});

export default router;
