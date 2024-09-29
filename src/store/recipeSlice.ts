import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService";
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types";

export type RecipesSliceType = {
   categories: Categories;
   drinks: Drinks;
   recipeSelected: Recipe | null;
   modal: boolean;
   fetCategories: () => Promise<void>;
   searchRecipes: ( searchFilters : SearchFilter ) => Promise<void>;
   selectRecipe: ( id : Drink['idDrink'] ) => Promise<void>;
   closeModal: () => void;
}

export const createRecipeSlice : StateCreator<RecipesSliceType> = (set) => ({
   categories: {
      drinks: []
   },
   drinks: {
      drinks: []
   },
   recipeSelected: null,
   modal: false,
   fetCategories: async() => {
      const categories = await getCategories();
      set({ categories })
   },
   searchRecipes: async( filters ) => {
      const drinks = await getRecipes( filters );
      set({ drinks });
   },
   selectRecipe: async( id ) => {
      const recipeSelected = await getRecipeById( id );
      set({ recipeSelected, modal: true });
   },
   closeModal: () => {
      set({ modal: false, recipeSelected: null });
   }
})