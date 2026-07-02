import Hero from "../../components/Hero";
// import CitiesBar from "../../components/CitiesBar";
import Stats from "../../components/Stats";
import MisionVision from "../../components/MisionVision";
import Valores from "../../components/Valores";
import Ventajas from "../../components/Ventajas";
import PresenciaGlobal from "../../components/PresenciaGlobal";
// import CTABanner from "../../components/CTABanner";
// import CotizacionForm from "../../components/CotizacionForm";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <CitiesBar /> */}
      <Stats />
      <MisionVision />
      <Valores />
      <Ventajas />
      <PresenciaGlobal />
      {/* <CTABanner />
      <CotizacionForm /> */}
    </>
  );
}
