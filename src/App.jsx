import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/main.scss";

import { LanguageProvider } from "./i18n/LanguageContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Servicios from "./pages/Servicios";
import Rastreo from "./pages/Rastreo";
import Cotizacion from "./pages/Cotizacion";
import Contacto from "./pages/Contacto";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="servicios" element={<Servicios />} />
            <Route path="rastreo" element={<Rastreo />} />
            <Route path="cotizacion" element={<Cotizacion />} />
            <Route path="contacto" element={<Contacto />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
