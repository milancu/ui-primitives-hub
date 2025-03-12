import {NextFunction, Request, Response} from "express";
import {auth} from "../firebase";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // @ts-ignore
    req.user = await auth.verifyIdToken(token);
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};