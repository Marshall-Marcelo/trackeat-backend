import { env } from './env.js';
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: env.DB_CONNECTION_URL,
  max: 5,
});
