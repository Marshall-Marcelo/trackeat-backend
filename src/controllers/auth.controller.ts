import type { Request, Response, NextFunction } from 'express';
import {
  registerUser,
  verifyUser,
  refreshAccessToken,
  getCurrentUser,
} from '../services/auth.service.js';
import { UnauthorizedError } from '../utils/error.js';

export async function registerUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email, password } = req.body;
    await registerUser(email, password);

    res.status(201).json({ message: 'Account created successfully' });
  } catch (error) {
    next(error);
  }
}

export async function loginUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { nameCredential, password } = req.body;
    const { refreshToken, accessToken, userDetail } = await verifyUser(
      nameCredential,
      password,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax', //strict in prod
      // secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax', //strict in prod
      // secure: true,
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({ user: userDetail, message: 'Login Success' });
  } catch (error) {
    next(error);
  }
}

export async function refreshAccessTokenController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError('Refresh Token Missing');
    }

    const accessToken = await refreshAccessToken(refreshToken);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax', //strict in prod
      // secure: true,
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).end();
  } catch (error) {
    next(error);
  }
}

export async function getCurrentUserController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
      throw new UnauthorizedError('Access Token missing');
    }

    const currentUser = await getCurrentUser(accessToken);

    res.status(200).json({ user: currentUser });
  } catch (error) {
    next(error);
  }
}
