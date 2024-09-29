import { StateCreator } from "zustand";
import { Recipe } from "../types";

export type FavoritesSliceType = {
   favorites: Recipe[],
   onFavoriteClick: ( recipe: Recipe ) => void,
   favoriteExist: ( id : Recipe['idDrink'] ) => boolean
   loadFromStorage: () => void
}

export const createFavoritesSlice: StateCreator<FavoritesSliceType> = (set, get) => ({
   favorites: [],

   onFavoriteClick: ( recipe ) => {

      if(get().favorites.some(favorite => favorite.idDrink === recipe.idDrink)) {
         set({ 
            favorites: get().favorites.filter(favorite => favorite.idDrink !== recipe.idDrink) 
         });
      }else{
         set((state => ({ favorites: [...state.favorites, recipe] })));
      }

      localStorage.setItem('favorites', JSON.stringify(get().favorites));
   },

   favoriteExist: ( id ) => {
      return get().favorites.some(favorite => favorite.idDrink === id);
   },

   loadFromStorage: () => {
      const storedFavorites = localStorage.getItem('favorites');
      if( storedFavorites ) {
         set({ favorites: JSON.parse(storedFavorites) });
      }
   }
});