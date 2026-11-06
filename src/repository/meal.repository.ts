import { pool } from '../configs/db.js';
import type { NewMeal, NewCategory } from '../types/meal.types.js';

export async function createMeal(mealDetails: NewMeal) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      `INSERT INTO meals(meal_id, user_id, meal_name, meal_type, meal_date)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        mealDetails.mealId,
        mealDetails.userId,
        mealDetails.mealName,
        mealDetails.mealType,
        mealDetails.mealDate,
      ],
    );

    for (const categoryId of mealDetails.mealCategories) {
      await client.query(
        `INSERT INTO meal_categories(meal_id, category_id)
         VALUES ($1, $2)`,
        [mealDetails.mealId, categoryId],
      );
    }

    await client.query('COMMIT');

    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export async function createMealCategory(mealCategory: NewCategory) {
  const result = await pool.query(
    `INSERT INTO categories(category_id, user_id, category_name)
     VALUES ($1, $2, $3)`,
    [mealCategory.categoryId, mealCategory.userId, mealCategory.categoryName],
  );

  return (result.rowCount ?? 0) > 0;
}

export async function deleteMeal(mealId: string, userId: string) {
  const result = await pool.query(
    `DELETE FROM meals
     WHERE meal_id = $1 AND user_id = $2`,
    [mealId, userId],
  );

  return (result.rowCount ?? 0) > 0;
}

export async function deleteMealCategory(categoryId: string, userId: string) {
  const result = await pool.query(
    `DELETE FROM categories
     WHERE category_id = $1 AND user_id = $2`,
    [categoryId, userId],
  );

  return (result.rowCount ?? 0) > 0;
}

export async function getMealCategories(userId: string) {
  const result = await pool.query(
    `SELECT category_id, category_name FROM categories
     WHERE status = 'DEFAULT' OR user_id = $1`,
    [userId],
  );

  return result.rows ?? null;
}
