import type { Request } from 'express';

export interface UserPayload {
  userId: string;
  username: string;
  email: string;
}

export interface AuthRequest extends Request {
  user: UserPayload;
}
