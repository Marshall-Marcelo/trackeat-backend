import {
  createMeal,
  createMealCategory,
  deleteMeal,
  deleteMealCategory,
  getMealCategories,
  getMealTypes,
} from '../repository/meal.repository.js';
import { v7 } from 'uuid';
import type { NewMeal, MealCategory, MealType } from '../types/meal.types.js';

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

  for (const category of data) {
    const mealCategory: MealCategory = {
      categoryId: category.category_id,
      categoryName: category.category_name,
    };

    mealCategories.push(mealCategory);
  }

  return mealCategories;
}

export async function getUserMealTypes(userId: string) {
  const mealTypes: MealType[] = [];
  const data = await getMealTypes(userId);

  for (const dbType of data) {
    const mealType: MealType = {
      typeId: dbType.type_id,
      typeName: dbType.type_name,
    };

    mealTypes.push(mealType);
  }

  return mealTypes;
}
