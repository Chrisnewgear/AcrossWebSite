import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useScrollAnimations from "../../hooks/useScrollAnimations";

export default function MainLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Wire scroll reveals + parallax for whatever the current route renders.
  useScrollAnimations(pathname);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
