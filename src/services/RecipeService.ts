import axios from "axios";
import { DrinksAPISchema, RecipeAPISchema, RecipeResponseSchema } from "../schema/recipes-schema";
import { Drink, SearchFilter } from "../types";

export const getCategories = async() => {
   
   try{

      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
      const { data } = await axios.get(url);
      
      const result = RecipeAPISchema.safeParse(data);
      if(result.success) {
         return result.data;
      }

   }catch(error){
      console.log(error);
   }

}

export const getRecipes = async( filters : SearchFilter ) => {
   
   try{     
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}&i=${filters.ingredient}`;
      const { data } = await axios.get(url);
      const result = DrinksAPISchema.safeParse(data);
      if(result.success) {
         return result.data;
      }

   }catch(error){
      console.log(error);
   }

}

export const getRecipeById = async( id : Drink['idDrink'] ) => {
   
   try{
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { data } = await axios.get(url);
      const result = RecipeResponseSchema.safeParse(data.drinks[0]);
      if(result.success) {
         return result.data;
      }
   }catch(error){
      console.log(error);
   }
}