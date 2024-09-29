import { Dialog, DialogPanel, Transition, TransitionChild, DialogTitle } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../store/useAppStore';
import { Recipe } from '../types';

export default function Modal() {

   const { modal, recipeSelected, closeModal, onFavoriteClick, favoriteExist, showNotification, favorites } = useAppStore();

   const renderIngredients = () => {

      if ( !recipeSelected ) return;

      const ingredients : JSX.Element[] = [];

      for ( let i = 1; i <= 7; i++ ) {
         const ingredient = recipeSelected[`strIngredient${i}` as keyof Recipe]
         const measure = recipeSelected[`strMeasure${i}` as keyof Recipe]

         if ( ingredient && measure ) {
            ingredients.push(
               <li key={ i } className="text-lg font-normal">
                  { ingredient } - { measure } 
               </li>
            )
         }
      }
      return ingredients
   }

   const onFavorite = () => {
      
      if(!recipeSelected) return;
      
      onFavoriteClick( recipeSelected! );
      const exist = favorites.some( favorite => favorite.idDrink === recipeSelected.idDrink );
      
      if( exist ) {
         showNotification({ text: 'Se eliminó de favoritos', error: true });
         closeModal();
      } else {
         showNotification({ text: 'Agregado a favoritos', error: false });
         closeModal();
      }

   }

   return (
      <>
         <Transition appear show={modal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={ closeModal }>
               <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
               >
                  <div className="fixed inset-0 bg-black bg-opacity-70" />
               </TransitionChild>

               <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                     <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                     >
                        <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                           <DialogTitle as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                              { recipeSelected?.strDrink }
                           </DialogTitle>
                           <img src={recipeSelected?.strDrinkThumb} alt={`Imagen de ${recipeSelected?.strDrink}`} className="mx-auto w-96" />
                           <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                              Ingredientes y Cantidades
                           </DialogTitle>
                           {renderIngredients()}
                           <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                              Instrucciones
                           </DialogTitle>
                           <p className="text-lg">{ recipeSelected?.strInstructions }</p>
                           {/* BOTONES */}
                           <div className="mt-5 flex justify-between gap-4">
                              <button
                                 type="button"
                                 className="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white hover:bg-gray-500 shadow"
                                 onClick={ closeModal }
                              >
                                 Cerrar
                              </button>
                              <button
                                 type="button"
                                 className="w-full rounded bg-orange-600 p-3 font-bold uppercase text-white hover:bg-orange-500 shadow"
                                 onClick={() => onFavorite()}
                              >
                                 { favoriteExist( recipeSelected?.idDrink ?? '' ) ? 'Quitar de favoritos' : 'Añadir a favoritos' }
                              </button>
                           </div>
                        </DialogPanel>
                     </TransitionChild>
                  </div>
               </div>
            </Dialog>
         </Transition>
      </>
   )
}