import express from 'express';
import {authenticate} from "../middleware/auth.js";
import { AuthService } from '../services/auth.service.js';

const router = express.Router();

router.use(authenticate as express.RequestHandler);

router.post("/device/verify", async (req, res) => {
  const {userCode} = req.body;
  const token = req.headers.authorization?.split('Bearer ')[1];


  try {
    await AuthService.verifyDeviceCode(userCode, token!);
    res.json({success: true});
  } catch (error: any) {
    const statusCode = error.message.includes("expired") ? 410 : 400;
    res.status(statusCode).json({error: error.message});
  }
});

export default router;