import express from 'express';
// import authRoutes from './routes/auth.route.js';

export function buildApp() {
  const app = express();

  app.use(express.json());

  // app.use('/api/v1/auth', authRoutes);

  return app;
}
