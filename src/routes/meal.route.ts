import { Router } from 'express';
import {
  createNewMealController,
  getMealCategoriesController,
  getMealTypesController,
} from '../controllers/meal.controller.js';
import { verifyAccessToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/new-meal', verifyAccessToken, createNewMealController);
router.get(
  '/get-meal-categories',
  verifyAccessToken,
  getMealCategoriesController,
);
router.get('/get-meal-types', verifyAccessToken, getMealTypesController);

export default router;
