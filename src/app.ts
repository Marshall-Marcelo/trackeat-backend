import express from 'express';
import morgan from 'morgan';
import { env } from './configs/env.js';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';

import { errorMiddleware } from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';

export function buildApp() {
  const app = express();
  const environment = env.ENVIRONMENT;

  app.use(environment === 'dev' ? morgan('dev') : morgan('tiny'));

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(cookieParser());

  app.use('/api/v1/auth', authRoutes);

  // app.use('/test', (req, res) => {
  //   res.status(200).json({
  //     message: 'Server is working still',
  //   });
  // });

  app.use(errorMiddleware);

  return app;
}
