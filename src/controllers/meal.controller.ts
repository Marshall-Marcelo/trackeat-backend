import type { Request, Response, NextFunction } from 'express';
import {
  createNewNeal,
  getUserMealCategories,
  getUserMealTypes,
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

    const mealCategories = await getUserMealCategories(userId);

    res.status(200).json(mealCategories);
  } catch (error) {
    next(error);
  }
}

export async function getMealTypesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new UnauthorizedError('Unauthorized');
    }

    const mealTypes = await getUserMealTypes(userId);

    res.status(200).json(mealTypes);
  } catch (error) {
    next(error);
  }
}
