import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import s from './styles.module.scss';

// Floating image cards — each parallaxes at its own depth (--srate scroll rate,
// --mrange mouse range) to build the layered, Apple-style sense of depth.
const FLOAT_CARDS = [
  {
    src: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=700&q=80',
    alt: 'Terminal de contenedores',
    cls: 'card--a',
  },
  {
    src: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=700&q=80',
    alt: 'Carga aérea',
    cls: 'card--b',
  },
  {
    src: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=700&q=80',
    alt: 'Transporte terrestre',
    cls: 'card--c',
  },
];

const LANES = ['Shanghai', 'Rotterdam', 'Guayaquil', 'Mumbai', 'Hamburg', 'Hong Kong', 'Miami'];

const BADGES = ['500+ Clientes Activos', 'Presencia en 4 Países', 'Carga Asegurada'];

export default function Hero() {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState('');

  // Smoothed parallax: a single rAF loop eases scroll + pointer values into
  // CSS custom properties (--sy, --mx, --my) that the stylesheet consumes.
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const target = { y: 0, mx: 0, my: 0 };
    const curr = { y: 0, mx: 0, my: 0 };
    let raf = 0;

    const onScroll = () => { target.y = window.scrollY; };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      target.mx = e.clientX / r.width - 0.5;
      target.my = e.clientY / r.height - 0.5;
    };
    const onLeave = () => { target.mx = 0; target.my = 0; };

    const loop = () => {
      curr.y  += (target.y  - curr.y)  * 0.08;
      curr.mx += (target.mx - curr.mx) * 0.07;
      curr.my += (target.my - curr.my) * 0.07;
      el.style.setProperty('--sy', curr.y.toFixed(2));
      el.style.setProperty('--mx', curr.mx.toFixed(4));
      el.style.setProperty('--my', curr.my.toFixed(4));
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleTrack = (e) => {
    e.preventDefault();
    navigate('/rastreo');
  };

  return (
    <section id="inicio" className={s.hero} ref={heroRef}>
      {/* ── Parallax background stack ───────────────────────────── */}
      <div className={s.hero__bg} aria-hidden="true">
        <div className={s.hero__bgImage} />
        <div className={s.hero__bgGradient} />
        <div className={s.hero__grid} />
      </div>

      {/* ── Floating photo cards (desktop depth layer) ──────────── */}
      <div className={s.hero__gallery} aria-hidden="true">
        {FLOAT_CARDS.map(({ src, alt, cls }) => (
          <figure key={cls} className={`${s.card} ${s[cls]}`}>
            <div className={s.card__inner}>
              <img src={src} alt={alt} loading="eager" />
            </div>
          </figure>
        ))}
        <div className={s.hero__glow} />
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className={s.hero__content}>
        <div className={s.hero__eyebrow}>
          <span className={s.hero__eyebrowDot} />
          Su socio en comercio internacional
        </div>

        <h1 className={s.hero__headline}>
          <span className={s.line}><span>Conectamos</span></span>
          <span className={s.line}><span className={s.accent}>el Mundo</span></span>
          <span className={s.line}><span>con su Negocio</span></span>
        </h1>

        <p className={s.hero__sub}>
          Soluciones integrales de importación y exportación desde Asia y Europa.
          Gestionamos cada detalle para garantizar el éxito de su operación comercial.
        </p>

        <div className={s.hero__ctas}>
          <button className="btn-green" onClick={() => navigate('/cotizacion')}>
            Solicitar Cotización
            <Icon name="arrowRight" size={16} />
          </button>
          <button className="btn-outline-white" onClick={() => navigate('/servicios')}>
            Nuestros Servicios
          </button>
        </div>

        {/* Compact tracker */}
        <form className={s.tracker} onSubmit={handleTrack}>
          <div className={s.tracker__field}>
            <span className={s.tracker__icon}><Icon name="package" size={18} /></span>
            <input
              type="text"
              className={s.tracker__input}
              placeholder="Rastree su envío — N° de guía o contenedor"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              aria-label="Número de guía o contenedor"
            />
          </div>
          <button type="submit" className={s.tracker__btn}>
            Rastrear
            <Icon name="arrowRight" size={16} />
          </button>
        </form>

        <div className={s.hero__badges}>
          {BADGES.map((b) => (
            <div key={b} className={s.hero__badge}>
              <Icon name="check" size={15} />
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* ── Lane marquee ────────────────────────────────────────── */}
      <div className={s.hero__marquee} aria-hidden="true">
        <div className={s.hero__marqueeTrack}>
          {[...LANES, ...LANES].map((lane, i) => (
            <span key={i} className={s.hero__lane}>
              <Icon name="globe" size={13} />
              {lane}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ──────────────────────────────────────────── */}
      <button
        className={s.hero__scroll}
        onClick={() => document.querySelector('#stats')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="Desplazar hacia abajo"
      >
        <span className={s.hero__scrollLine} />
        <span>Scroll</span>
      </button>
    </section>
  );
}
