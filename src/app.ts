import express from 'express';
import morgan from 'morgan';
import { env } from './configs/env.js';
import authRoutes from './routes/auth.route.js';

import { errorMiddleware } from './middleware/error.middleware.js';

export function buildApp() {
  const app = express();
  const environment = env.ENVIRONMENT;

  app.use(environment === 'dev' ? morgan('dev') : morgan('tiny'));

  app.use(express.json());

  app.use('/api/v1/auth', authRoutes);

  app.use(errorMiddleware);

  return app;
}
