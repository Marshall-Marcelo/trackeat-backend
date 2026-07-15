import { Pool } from 'pg';
import { env } from './env.js';

export const pool = new Pool({
  connectionString: env.DB_CONNECTION_URL,
  max: 20,
});
