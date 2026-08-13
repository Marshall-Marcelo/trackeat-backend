import type { Request, Response, NextFunction } from 'express';
import { registerUser } from '../services/auth.service.js';

export async function registerUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;
    await registerUser(email, password);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
}
