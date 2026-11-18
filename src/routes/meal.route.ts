import { Router } from 'express';
import {
  createNewMealController,
  getMealCategoriesController,
  getMealTypesController,
  getUserMealsController,
  deleteMealController,
  getSelectedMealController,
  editExistingMealController,
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
router.get('/get-meals', verifyAccessToken, getUserMealsController);
router.get('/get-meal/:mealId', verifyAccessToken, getSelectedMealController);
router.delete('/delete-meal/:mealId', verifyAccessToken, deleteMealController);
router.patch('/edit-meal', verifyAccessToken, editExistingMealController);

export default router;
