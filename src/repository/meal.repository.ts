import { pool } from '../configs/db.js';
import type { NewMeal, Meal } from '../types/meal.types.js';

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

export async function editMeal(meal: Meal, userId: string) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      `UPDATE meals
       SET meal_name = $1, meal_date = $2
       WHERE meal_id = $3 AND user_id = $4`,
      [meal.mealName, meal.mealDate, meal.mealId, userId],
    );

    await client.query(
      `UPDATE meal_types
       SET type_id = $1
       WHERE meal_id = $2`,
      [meal.mealType, meal.mealId],
    );

    // await client.query(
    //   `DELETE FROM meal_types
    //    WHERE meal_id = $1`,
    //   [meal.mealId],
    // );

    await client.query(
      `DELETE FROM meal_categories
       WHERE meal_id = $1`,
      [meal.mealId],
    );

    // await client.query(
    //   `INSERT INTO meal_types(meal_id, type_id)
    //    VALUES($1, $2)`,
    //   [meal.mealId, meal.mealType],
    // );

    for (const categoryId of meal.mealCategories) {
      await client.query(
        `INSERT INTO meal_categories(meal_id, category_id)
         VALUES($1, $2)`,
        [meal.mealId, categoryId],
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

export async function deleteMeal(mealId: string, userId: string) {
  const result = await pool.query(
    `DELETE FROM meals
     WHERE meal_id = $1 AND user_id = $2`,
    [mealId, userId],
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

export async function getSelectedMeal(userId: string, mealId: string) {
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
    WHERE m.user_id = $1 AND m.meal_id LIKE $2`,
    [userId, mealId],
  );

  return result.rows[0] ?? null;
}
