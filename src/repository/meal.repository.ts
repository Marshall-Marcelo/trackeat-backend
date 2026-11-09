import { pool } from '../configs/db.js';
import type { NewMeal, NewCategory } from '../types/meal.types.js';

export async function createMeal(mealDetails: NewMeal) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      `INSERT INTO meals(meal_id, user_id, meal_name, meal_date)
       VALUES ($1, $2, $3, $4)`,
      [
        mealDetails.mealId,
        mealDetails.userId,
        mealDetails.mealName,
        mealDetails.mealDate,
      ],
    );

    await client.query(
      `INSERT INTO meal_types(meal_id, type_id)
       VALUES ($1, $2)`,
      [mealDetails.mealId, mealDetails.mealType],
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

export async function getMealTypes(userId: string) {
  const result = await pool.query(
    `SELECT type_id, type_name FROM types
     WHERE status = 'DEFAULT' OR user_id = $1`,
    [userId],
  );

  return result.rows ?? null;
}

export async function getUserMeals(
  userId: string,
  year: string,
  month: string,
) {
  const result = await pool.query(
    `SELECT
    m.meal_id AS "mealId",
    m.meal_name AS "mealName",
    m.meal_date AS "mealDate",

    COALESCE(
        (
            SELECT JSON_AGG(
                JSON_BUILD_OBJECT(
                    'categoryId', c.category_id,
                    'categoryName', c.category_name
                )
                ORDER BY c.category_name
            )
            FROM meal_categories mc
            INNER JOIN categories c
                ON mc.category_id = c.category_id
            WHERE mc.meal_id = m.meal_id
        ),
        '[]'::json
    ) AS "mealCategories",

    (
        SELECT JSON_BUILD_OBJECT(
            'typeId', t.type_id,
            'typeName', t.type_name
        )
        FROM meal_types mt
        INNER JOIN types t
            ON mt.type_id = t.type_id
        WHERE mt.meal_id = m.meal_id
    ) AS "mealType"

    FROM meals m
    WHERE m.user_id = $1 AND m.meal_date LIKE $2
    ORDER BY m.meal_date DESC`,
    [userId, `${year}-${month}-%`],
  );

  return result.rows ?? null;
}
