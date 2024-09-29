import { Outlet } from "react-router-dom";
import { Header, Modal, Notification } from "../components";
import { useEffect } from "react";
import { useAppStore } from "../store/useAppStore";

export const Layout = () => {

   const { loadFromStorage } = useAppStore();

   useEffect(() => {
      loadFromStorage();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
   

  return (
    <>
      <Header />
      <main className="container mx-auto md:px-10 py-16">
         <Outlet />
      </main>

      <Modal />
      <Notification />
    </>
  )
}
