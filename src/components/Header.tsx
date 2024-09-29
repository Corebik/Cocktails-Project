import { useEffect, useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Search } from "./Search";
import { useAppStore } from "../store/useAppStore";

export const Header = () => {

   const { pathname } = useLocation();
   const { fetCategories } = useAppStore();

   const isHome = useMemo(() => pathname === "/", [pathname]);

   useEffect(() => {
      fetCategories();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   

   return (
      <header className={ isHome ? "bg-header bg-center bg-cover" : "bg-slate-800" }>
         <div className="mx-auto container md:px-10 py-16">
            <div className="flex justify-between items-center">
               <div>
                  <img src="/logo.svg" alt="Logotipo" className="w-32" />
               </div>
               <nav className="flex gap-4">
                  <NavLink
                     to="/"
                     className={({ isActive }) =>
                        isActive
                           ? "text-orange-500 uppercase font-bold"
                           : "text-white uppercase font-bold"
                     }
                  > Inicio </NavLink>
                  <NavLink
                     to="/favorites"
                     className={({ isActive }) =>
                        isActive
                           ? "text-orange-500 uppercase font-bold"
                           : "text-white uppercase font-bold"
                     }
                  > Favoritos </NavLink>
               </nav>
            </div>

            { isHome && ( <Search /> ) }

         </div>
      </header>
   )
}
