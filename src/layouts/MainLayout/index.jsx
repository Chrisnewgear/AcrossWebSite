import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useI18n } from "../../i18n/LanguageContext";
import useScrollAnimations from "../../hooks/useScrollAnimations";

export default function MainLayout() {
  const { pathname } = useLocation();
  const { lang } = useI18n();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  // Wire scroll reveals + parallax for whatever the current route renders.
  // Also re-run on language change: React remounts text-keyed nodes then, and
  // the fresh DOM needs re-observing or it stays hidden.
  useScrollAnimations(pathname, lang);

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
