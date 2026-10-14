import {
  changeUsername,
  createUser,
  isEmailUsed,
  isUsernameUsed,
  findUser,
  getUser,
} from '../repository/auth.repository.js';
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/error.js';
import { v7 } from 'uuid';
import { generateRandomUsername } from '../utils/random.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../configs/env.js';

export async function registerUser(email: string, password: string) {
  const emailExists = await isEmailUsed(email);

  if (emailExists) {
    throw new ConflictError('Email Already Used');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = v7();
  const randomUsername = generateRandomUsername();

  await createUser(email, hashedPassword, userId, randomUsername);
}

export async function updateUsername(username: string, userId: string) {
  const usernameExists = await isUsernameUsed(username);

  if (usernameExists) {
    throw new ConflictError('Username already taken');
  }

  const updated = await changeUsername(username, userId);

  if (!updated) {
    throw new ConflictError('Username update failed');
  }
}

export async function verifyUser(nameCredential: string, password: string) {
  const user = await findUser(nameCredential);

  if (!user) {
    throw new NotFoundError('User does not exist');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const userDetail = {
    userId: user.user_id,
    email: user.email,
    username: user.username,
  };

  const refreshToken = generateRefreshToken(user.user_id);
  const accessToken = generateAccessToken(user.user_id);

  return { refreshToken, accessToken, userDetail };
}

export async function refreshAccessToken(refreshToken: string) {
  const payload = jwt.verify(refreshToken, env.JWT_SECRET_REFRESH);

  if (typeof payload === 'string') {
    throw new UnauthorizedError('Invalid Refresh Token');
  }

  if (payload.type !== 'refresh') {
    throw new UnauthorizedError('Invalid Refresh Token');
  }

  if (!payload.sub) {
    throw new UnauthorizedError('Invalid Refresh Token');
  }

  const accessToken = generateAccessToken(payload.sub);

  return accessToken;
}

export async function getCurrentUser(accessToken: string) {
  const payload = jwt.verify(accessToken, env.JWT_SECRET_ACCESS);

  if (typeof payload === 'string') {
    throw new UnauthorizedError('Invalid Access Token');
  }

  if (payload.type !== 'access') {
    throw new UnauthorizedError('Invalid Access Token');
  }

  if (!payload.sub) {
    throw new UnauthorizedError('Invalid Access Token');
  }

  const user = await getUser(payload.sub);

  const parsedUser = {
    userId: user?.user_id,
    email: user?.email,
    username: user?.username,
  };

  return parsedUser;
}
