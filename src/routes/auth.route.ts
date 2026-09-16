import { Router } from 'express';
import {
  registerUserController,
  loginUserController,
  refreshAccessTokenController,
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', registerUserController);
router.post('/login', loginUserController);
router.post('/refresh', refreshAccessTokenController);

export default router;
