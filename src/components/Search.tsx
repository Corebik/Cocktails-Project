import { useState, ChangeEvent } from "react";
import { useAppStore } from "../store/useAppStore";
import type { SearchFilter } from "../types";

const FormState = {
   ingredient: "",
   category: ""
}

export const Search = () => {

   const [searchFilters, setSearchFilters] = useState<SearchFilter>(FormState)
   const { categories: { drinks }, searchRecipes, showNotification } = useAppStore();

   const onFormChange = ( event : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
      const { name, value } = event.target;
      setSearchFilters({ ...searchFilters, [name]: value });
   }

   const onFormSubmit = ( event : ChangeEvent<HTMLFormElement> ) => {
      event.preventDefault();
      if( !searchFilters.ingredient || !searchFilters.category ) {
         showNotification({ text: "Todos los campos son obligatorios", error: true });
         return;
      }

      searchRecipes( searchFilters );
   }

   return (
      <form 
         className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
         onSubmit={ onFormSubmit } 
      >
         <div className="space-y-4">
            <label
               htmlFor="ingredient"
               className="block text-white uppercase font-extrabold text-lg"
            >
               Nombre o Ingredientes
            </label>
            <input
               id="ingredient"
               type="text"
               name="ingredient"
               className="p-3 w-full rounded-lg focus:outline-none"
               placeholder="Nombre o Ingrediente. Ej. Vodka, Whisky, Tequila..."
               value={ searchFilters.ingredient }
               onChange={ onFormChange } 
            />
         </div>

         <div className="space-y-4">
            <label
               htmlFor="category"
               className="block text-white uppercase font-extrabold text-lg"
            >
               Categoría
            </label>
            <select
               id="category"
               name="category"
               className="p-3 w-full rounded-lg focus:outline-none"
               value={ searchFilters.category }
               onChange={ onFormChange }
            >
               <option value="">-- Seleccione --</option>
               { drinks.map((drink) => (
                  <option
                     key={ drink.strCategory }
                     value={ drink.strCategory }
                  >
                     { drink.strCategory }
                  </option>
               ))}
            </select>
         </div>

         <input
            type="submit"
            value="Buscar Recetas"
            className="cursor-pointer bg-orange-800 hover:bg-orange-900 
      text-white font-extrabold w-full p-2 rounded-lg uppercase" />

      </form>
   )
}
