import { useNavigate } from 'react-router-dom';
import s from './styles.module.scss';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="inicio" className={s.hero}>
      {/* ── Background: solid navy on the left blending into a port photo ── */}
      <div className={s.hero__bg} aria-hidden="true">
        <div className={s.hero__bgImage} />
        <div className={s.hero__bgOverlay} />
        <div className={s.hero__bgWarm} />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className={s.hero__content}>
        <span className={s.hero__eyebrow}>Su socio en comercio internacional</span>

        <h1 className={s.hero__headline}>
          <span className={s.line}>Conexiones</span>
          <span className={s.line}>Globales</span>
        </h1>

        <p className={s.hero__tagline}>Confianza sin fronteras</p>

        <p className={s.hero__sub}>
          Garantizamos la seguridad de tus operaciones mediante procesos claros,
          visibilidad absoluta y un respaldo constante.
        </p>

        <div className={s.hero__ctas}>
          <button className="btn-green" onClick={() => navigate('/cotizacion')}>
            Solicitar Cotización
          </button>
          <button className={s.hero__ghost} onClick={() => navigate('/servicios')}>
            Nuestros Servicios
          </button>
        </div>
      </div>

      {/* ── Trust badges, pinned over the lower edge of the photo ───────── */}
      <div className={s.hero__badges}>
        <div className={s.hero__badgePill}>
          <span className={s.hero__badge}>500+ Clientes Activos</span>
          <span className={s.hero__badge}>Presencia en 4 Países</span>
          <span className={s.hero__badge}>Carga Asegurada</span>
        </div>
      </div>
    </section>
  );
}
