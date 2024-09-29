import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './layouts/Layout';

const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const IndexPage = lazy(() => import('./pages/IndexPage'));


export const AppRouter = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route element={<Layout />} >

               <Route path="/" element={
                  <Suspense fallback="Cargando...">   
                     <IndexPage />
                  </Suspense>
               } index />
               <Route path="/favorites" element={
                  <Suspense fallback="Cargando...">
                     <FavoritesPage />
                  </Suspense>
               } />

               <Route path="*" element={<IndexPage />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}
