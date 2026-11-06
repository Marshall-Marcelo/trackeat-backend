import {
  createMeal,
  createMealCategory,
  deleteMeal,
  deleteMealCategory,
  getMealCategories,
} from '../repository/meal.repository.js';
import { v7 } from 'uuid';
import type { NewMeal } from '../types/meal.types.js';

export async function createNewNeal(
  userId: string,
  mealName: string,
  mealType: string,
  mealCategories: string[],
  mealDate: string,
) {
  const mealId = v7();

  const mealDetails: NewMeal = {
    mealId: mealId,
    userId: userId,
    mealName: mealName,
    mealType: mealType,
    mealCategories: mealCategories,
    mealDate: mealDate,
  };

  await createMeal(mealDetails);
}

export async function getUserMealCategories(userId: string) {
  await getMealCategories(userId);
}
