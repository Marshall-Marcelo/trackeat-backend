import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  ENVIRONMENT: process.env.ENVIRONMENT || 'dev',
  JWT_SECRET_ACCESS: process.env.JWT_SECRET_ACCESS || '',
  JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
  DATABASE_URL: process.env.DATABASE_URL,
  CLIENT_URL: process.env.CLIENT_URL,
};
