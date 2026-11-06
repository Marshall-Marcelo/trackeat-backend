import type { Request, Response, NextFunction } from 'express';
import {
  createNewNeal,
  getUserMealCategories,
} from '../services/meal.service.js';
import { UnauthorizedError } from '../utils/error.js';

export async function createNewMealController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { mealName, mealType, mealCategories, mealDate } = req.body;
    const userId = req.userId;

    if (!userId) {
      throw new UnauthorizedError('Unauthorized');
    }

    await createNewNeal(userId, mealName, mealType, mealCategories, mealDate);

    res.status(201).json({ message: 'Meal created successfully' });
  } catch (error) {
    next(error);
  }
}

export async function getMealCategoriesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new UnauthorizedError('Unauthorized');
    }

    await getUserMealCategories(userId);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
}
