import Hero from "../../components/Hero";
// import CitiesBar from "../../components/CitiesBar";
// import Stats from "../../components/Stats";
import MisionVision from "../../components/MisionVision";
import Valores from "../../components/Valores";
import Ventajas from "../../components/Ventajas";
// import PresenciaGlobal from "../../components/PresenciaGlobal";
// import CTABanner from "../../components/CTABanner";
// Removed: components/CotizacionForm was a mock that faked a successful submit
// without sending anything. Use the /cotizacion page, which posts to the API.

export default function Home() {
  return (
    <>
      <Hero />
      {/* <CitiesBar /> */}
      {/* <Stats /> */}
      <MisionVision />
      <Valores />
      <Ventajas />
      {/* <PresenciaGlobal /> */}
      {/* <CTABanner /> */}
    </>
  );
}
