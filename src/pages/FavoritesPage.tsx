import { useMemo } from "react";
import { DrinkCard } from "../components";
import { useAppStore } from "../store/useAppStore";

const FavoritesPage = () => {

   const { favorites } = useAppStore();

   const hasFavorites = useMemo(() => favorites.length, [ favorites ]);

   return (
      <>
         <h1 className="text-6xl font-extrabold">Favoritos</h1>

         { hasFavorites
            ? (<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 my-10">
               { favorites.map(favorite => (
                  <DrinkCard
                     key={favorite.idDrink}
                     drink={favorite}
                  />
               ))}
            </div>)
            : (<p className="my-10 text-center text-2xl">
               Los favoritos se monstrarán acá...
            </p>)
         }
      </>
   )
}

export default FavoritesPage;
