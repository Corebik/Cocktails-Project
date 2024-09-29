import { z } from 'zod';
import { DrinksAPISchema, RecipeAPISchema, SearchFilterSchema, DrinkAPISchema, RecipeResponseSchema } from '../schema/recipes-schema';

export type Categories = z.infer<typeof RecipeAPISchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Drinks = z.infer<typeof DrinksAPISchema>
export type Drink = z.infer<typeof DrinkAPISchema>;
export type Recipe = z.infer<typeof RecipeResponseSchema>