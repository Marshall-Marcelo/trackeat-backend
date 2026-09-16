import { pool } from '../configs/db.js';
import type { UserRow } from '../types/auth.types.js';

export async function createUser(
  email: string,
  password: string,
  userId: string,
  username: string,
) {
  const result = await pool.query(
    `INSERT INTO users (user_id, email, password, username)
     VALUES ($1, $2, $3, $4)`,
    [userId, email, password, username],
  );

  return result.rows.length > 0;
}

export async function changeUsername(username: string, userId: string) {
  const result = await pool.query(
    `UPDATE users 
     SET username = $1 
     WHERE user_id = $2`,
    [username, userId],
  );

  return result.rows.length > 0;
}

export async function findUser(
  nameCredential: string,
): Promise<UserRow | null> {
  const result = await pool.query<UserRow>(
    `SELECT user_id, email, password, username 
       FROM users 
       WHERE email = $1 OR username = $1 
       LIMIT 1`,
    [nameCredential],
  );

  return result.rows[0] ?? null;
}

export async function getUser(userId: string) {
  const result = await pool.query(
    `SELECT user_id, email, username
     FROM users
     WHERE user_id = $1`,
    [userId],
  );

  return result.rows[0] ?? null;
}

export async function isEmailUsed(email: string) {
  const result = await pool.query(
    `SELECT email
       FROM users
       WHERE email = $1
       LIMIT 1`,
    [email],
  );

  return result.rows.length > 0;
}

export async function isUsernameUsed(username: string) {
  const result = await pool.query(
    `SELECT username
       FROM users
       WHERE username = $1
       LIMIT 1`,
    [username],
  );

  return result.rows.length > 0;
}
