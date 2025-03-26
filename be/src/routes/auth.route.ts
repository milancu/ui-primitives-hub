import express from "express";
import {AuthService} from "../services/auth.service";

const router = express.Router();

// Device Code Flow endpoints
router.post("/device/code", async (req, res) => {
  try {
    const deviceCode = await AuthService.generateDeviceCode();
    res.json(deviceCode);
  } catch (error) {
    res.status(500).json({error: "Failed to generate device code"});
  }
});

router.post("/device/poll", async (req, res) => {
  const {device_code} = req.body;

  try {
    const result = await AuthService.pollDeviceCode(device_code);
    console.log(result)
    res.json(result);
  } catch (error: any) {
    const statusCode = error.message.includes("expired") ? 410 : 404;
    res.status(statusCode).json({error: error.message});
  }
});

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
