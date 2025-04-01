import {NextFunction, Request, Response} from 'express';
import {auth} from "../firebase.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      res.status(401).json({ error: 'Authorization token required' });
      return;
    }

    // Verify the token
    // Attach user to request
    (req as any).user = await auth.verifyIdToken(token);

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};