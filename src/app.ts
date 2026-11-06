import express from 'express';
import morgan from 'morgan';
import { env } from './configs/env.js';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import mealRoutes from './routes/meal.route.js';

import { errorMiddleware } from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';

export function buildApp() {
  const app = express();
  const environment = env.ENVIRONMENT;

  app.use(environment === 'dev' ? morgan('dev') : morgan('tiny'));

  //'http://192.168.254.104:5173'
  app.use(
    cors({
      origin: ['http://localhost:5173'],
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(cookieParser());

  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/meal', mealRoutes);

  app.use(errorMiddleware);

  return app;
}
