import type { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/error.js';
import { env } from '../configs/env.js';
import jwt from 'jsonwebtoken';

export function verifyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new UnauthorizedError('Invalid Token');
    }

    const payload = jwt.verify(accessToken, env.JWT_SECRET_ACCESS);

    if (typeof payload === 'string' || !payload.sub) {
      throw new UnauthorizedError('Invalid token');
    }

    req.userId = payload.sub;

    next();
  } catch (error) {
    next(error);
  }
}
