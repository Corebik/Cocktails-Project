import { useMemo } from "react";
import { useAppStore } from "../store/useAppStore"
import { DrinkCard } from "../components";

const IndexPage = () => {

   const { drinks } = useAppStore();
   const hasDrinks = useMemo(() => drinks.drinks.length, [drinks]);

   return (
      <>
         <h1 className="text-6xl font-extrabold">Recetas</h1>
         { hasDrinks 
            ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
               { drinks.drinks.map( drink => (
                  <DrinkCard key={ drink.idDrink } drink={ drink } />
               ))}
            </div>) 
            : (<p className="my-10 text-center text-2xl">
               No hay resultados aún, utiliza el formulario para buscar recetas.
            </p>) 
         }
      </>
   )
}

export default IndexPage;