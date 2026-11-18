import type { Request, Response, NextFunction } from 'express';
import {
  createNewNeal,
  getUserMealCategories,
  getUserMealTypes,
  getMealsByUserId,
  deleteChosenMeal,
  getSpecificMeal,
  editExistingMeal,
} from '../services/meal.service.js';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../utils/error.js';

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

export async function editExistingMealController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { mealId, mealName, mealType, mealCategories, mealDate } = req.body;
    const userId = req.userId;

    if (!userId) {
      throw new UnauthorizedError('Unauthorized');
    }

    await editExistingMeal(
      userId,
      mealId,
      mealName,
      mealType,
      mealCategories,
      mealDate,
    );

    res.status(201).json({ message: 'Meal edit succesful' });
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

export async function getUserMealsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;
    const { year, month } = req.query;

    if (!userId) {
      throw new UnauthorizedError('Unauthorized');
    }

    if (typeof year !== 'string' || typeof month !== 'string') {
      throw new BadRequestError('Incomplete');
    }

    const meals = await getMealsByUserId(userId, year, month);

    res.status(200).json(meals);
  } catch (error) {
    next(error);
  }
}

export async function getSelectedMealController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { mealId } = req.params;
    const userId = req.userId;

    if (!mealId || typeof mealId !== 'string') {
      throw new NotFoundError('Meal ID not found');
    }

    if (!userId) {
      throw new UnauthorizedError('Unauthorized');
    }

    const meal = await getSpecificMeal(userId, mealId);

    res.status(200).json(meal);
  } catch (error) {
    next(error);
  }
}

export async function deleteMealController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { mealId } = req.params;
    const userId = req.userId;

    if (!mealId || typeof mealId !== 'string') {
      throw new NotFoundError('Meal ID not found');
    }

    if (!userId) {
      throw new UnauthorizedError('Unauthorized');
    }

    await deleteChosenMeal(mealId, userId);

    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (error) {
    next(error);
  }
}
