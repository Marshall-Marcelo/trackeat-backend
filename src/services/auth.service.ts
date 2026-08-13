import {
  changeUsername,
  createUser,
  isEmailUsed,
  isUsernameUsed,
} from '../repository/auth.repository.js';
import { ConflictError } from '../utils/error.js';
import { v7 } from 'uuid';
import { generateRandomUsername } from '../utils/random.js';
import bcrypt from 'bcrypt';

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
