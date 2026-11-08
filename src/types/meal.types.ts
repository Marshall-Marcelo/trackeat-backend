export interface NewMeal {
  mealId: string;
  userId: string;
  mealName: string;
  mealType: string;
  mealCategories: string[];
  mealDate: string;
}

export interface NewCategory {
  categoryId: string;
  userId: string;
  categoryName: string;
}

export interface MealCategory {
  categoryId: string;
  categoryName: string;
}

export interface MealType {
  typeId: string;
  typeName: string;
}
