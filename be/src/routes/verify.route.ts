import express from 'express';
import {ProjectService} from '../services/project.service';
import {authenticate} from "../middleware/auth";
import {AuthService} from "../services/auth.service";

const router = express.Router();

router.use(authenticate as express.RequestHandler);

router.post("/device/verify", async (req, res) => {
  const {userCode} = req.body;
  const userId = (req as any).user.uid

  try {
    await AuthService.verifyDeviceCode(userCode, userId);
    res.json({success: true});
  } catch (error: any) {
    const statusCode = error.message.includes("expired") ? 410 : 400;
    res.status(statusCode).json({error: error.message});
  }
});

export default router;