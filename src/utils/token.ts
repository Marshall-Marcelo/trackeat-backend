import jwt from 'jsonwebtoken';
import { env } from '../configs/env.js';

export function generateAccessToken(userId: string) {
  return jwt.sign(
    {
      sub: userId,
      type: 'access',
    },
    env.JWT_SECRET_ACCESS,
    { expiresIn: '15m' },
  );
}

export function generateRefreshToken(userId: string) {
  return jwt.sign(
    {
      sub: userId,
      type: 'refresh',
    },
    env.JWT_SECRET_REFRESH,
    { expiresIn: '7D' },
  );
}
