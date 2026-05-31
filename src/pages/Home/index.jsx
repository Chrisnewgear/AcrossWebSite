import Hero from "../../components/Hero";
import Stats from "../../components/Stats";
import MisionVision from "../../components/MisionVision";
import Servicios from "../../components/Servicios";
import Ventajas from "../../components/Ventajas";
import PresenciaGlobal from "../../components/PresenciaGlobal";
import CTABanner from "../../components/CTABanner";
import CotizacionForm from "../../components/CotizacionForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <MisionVision />
      <Servicios />
      <Ventajas />
      <PresenciaGlobal />
      <CTABanner />
      <CotizacionForm />
    </>
  );
}
