import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../configs/env.js';

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Error' });
    }

    const token = authHeader.split(' ')[1]!;
    const decoded = jwt.verify(token, env.JWT_SECRET);
  } catch {}
};
