import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  refreshAccessTokenController,
  getCurrentUserController,
} from '../controllers/auth.controller.js';
import { verifyAccessToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.post('/refresh', refreshAccessTokenController);
router.get('/me', verifyAccessToken, getCurrentUserController);

export default router;
