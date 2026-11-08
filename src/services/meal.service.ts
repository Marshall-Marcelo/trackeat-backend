import {
  createMeal,
  createMealCategory,
  deleteMeal,
  deleteMealCategory,
  getMealCategories,
} from '../repository/meal.repository.js';
import { v7 } from 'uuid';
import type { NewMeal, MealCategory } from '../types/meal.types.js';

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
  const mealCategories: MealCategory[] = [];
  const data = await getMealCategories(userId);

  for (const categories of data) {
    const mealCategory: MealCategory = {
      categoryId: categories.category_id,
      categoryName: categories.category_name,
    };

    mealCategories.push(mealCategory);
  }

  return mealCategories;
}
