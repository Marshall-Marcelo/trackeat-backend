import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT || '3000',
  ENVIRONMENT: process.env.ENVIRONMENT || 'dev',
  JWT_SECRET_ACCESS: process.env.JWT_SECRET_ACCESS || '',
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  DB_CONNECTION_URL: process.env.DATABASE_URL,
};
