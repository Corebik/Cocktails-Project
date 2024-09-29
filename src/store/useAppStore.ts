import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createRecipeSlice, RecipesSliceType, FavoritesSliceType, createFavoritesSlice, createNotificationSlice, NotificationSliceType } from './';

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(
   devtools((...a) => ({
      ...createRecipeSlice(...a),
      ...createFavoritesSlice(...a),
      ...createNotificationSlice(...a)
})))

