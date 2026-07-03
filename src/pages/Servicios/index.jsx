import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
//import CTABanner from "../../components/CTABanner";
import Icon from "../../components/Icon";
import { useI18n } from "../../i18n/LanguageContext";
import s from "./styles.module.scss";

// Icons stay in code; copy comes from translations (index-aligned).
const COMP_ICONS = ["search", "package", "handshake", "truck", "document", "shieldCheck"];

/* const TRANSPORT = [
  {
    icon: "ship",
    tag: "Transporte Marítimo",
    badge: "FCL / LCL / Consolidado",
    title: "Carga Marítima Internacional",
    img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
    desc: "Gestionamos envíos de contenedor completo (FCL) y grupaje (LCL) desde los principales puertos de China, India y Europa hacia Ecuador y Latinoamérica. Nuestros agentes en origen supervisan cada etapa del proceso.",
    features: [
      "Puertos de origen: Shanghai, Ningbo, Guangzhou, Mumbai, Rotterdam, Hamburg",
      "Incoterms: FOB, CIF, CFR, EXW — adaptados a su operación",
      "Documentación: BL, C/O, packing list, factura comercial",
      "Seguro de carga opcional con cobertura all-risk",
      "Seguimiento en tiempo real con actualizaciones por WhatsApp",
    ],
    reverse: false,
  },
  {
    icon: "plane",
    tag: "Transporte Aéreo",
    badge: "Express / Estándar",
    title: "Carga Aérea de Alto Valor",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    desc: "Para envíos urgentes, muestras, productos perecederos o mercancías de alto valor. Trabajamos con las principales aerolíneas de carga y consolidadores para ofrecerle las mejores tarifas y tiempos de tránsito.",
    features: [
      "Aeropuertos de origen: PVG, PEK, HKG, BOM, AMS, FRA",
      "Modalidades: carga general, perecederos, mercancías peligrosas",
      "Documentación AWB y gestión de aduana incluida",
      "Tiempo de tránsito: 3-7 días hábiles según destino",
      "Empaque y preparación de carga aérea especializada",
    ],
    reverse: true,
  },
  {
    icon: "truck",
    tag: "Transporte Terrestre",
    badge: "FTL / LTL / Última Milla",
    title: "Distribución Terrestre Integral",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80",
    desc: "Desde la llegada al puerto o aeropuerto hasta las bodegas de su empresa, coordinamos el transporte terrestre con nuestra red de carriers certificados en Ecuador y la región andina.",
    features: [
      "Cobertura nacional: Guayaquil, Quito, Cuenca y todo Ecuador",
      "Transporte refrigerado para productos sensibles a temperatura",
      "GPS en tiempo real y reporte de entrega",
      "Almacenamiento temporal en bodegas de distribución",
      "Coordinación con agentes de aduana para despacho ágil",
    ],
    reverse: false,
  },
];
*/

/* const AQL_DATA = [
  {
    nivel: "Crítico",
    descripcion: "Defecto que pone en riesgo al usuario o incumple regulación",
    aceptacion: "0",
    rechazo: "1+",
  },
  {
    nivel: "Grave",
    descripcion:
      "Defecto que afecta funcionalidad o apariencia significativamente",
    aceptacion: "5",
    rechazo: "6+",
  },
  {
    nivel: "Menor",
    descripcion: "Defecto menor que no afecta funcionalidad",
    aceptacion: "7",
    rechazo: "8+",
  },
];
*/

export default function Servicios() {
  const { t } = useI18n();
  const ts = t.servicios;
  // Center card ("Durante Producción") is featured by default, matching the design.
  const [activePhase, setActivePhase] = useState(1);

  // On mobile the phase cards become a swipeable scroll-snap carousel; on desktop
  // the same DOM stays a 3-up featured grid (the track never scrolls there).
  const trackRef = useRef(null);
  const rafPending = useRef(false);

  // Center the card at index `i` in the carousel and flag it active.
  const goToPhase = (i) => {
    const idx = Math.max(0, Math.min(i, ts.phases.length - 1));
    setActivePhase(idx);
    const track = trackRef.current;
    const card = track?.children[idx];
    if (track && card) {
      track.scrollTo({
        left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  };

  // As the user swipes, sync the active card to whichever is nearest centre.
  const handleScroll = () => {
    if (rafPending.current) return;
    rafPending.current = true;
    requestAnimationFrame(() => {
      rafPending.current = false;
      const track = trackRef.current;
      if (!track) return;
      const centre = track.scrollLeft + track.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      Array.from(track.children).forEach((card, i) => {
        const d = Math.abs(card.offsetLeft + card.clientWidth / 2 - centre);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActivePhase((prev) => (prev === best ? prev : best));
    });
  };

  // On mobile, start the carousel centred on the default phase so the visible
  // card matches the active dot (desktop is a static grid — the guard skips it).
  useEffect(() => {
    requestAnimationFrame(() => {
      const track = trackRef.current;
      const card = track?.children[activePhase];
      if (track && card && track.scrollWidth > track.clientWidth + 1) {
        track.scrollTo({
          left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
          behavior: "auto",
        });
      }
    });
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHero
        breadcrumb={ts.breadcrumb}
        label={ts.heroLabel}
        title={ts.heroTitle}
        subtitle={ts.heroSub}
        image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80"
        actions={
          <>
            <Link to="/cotizacion" className="btn-green">
              {ts.ctaQuote}
            </Link>
            <Link to="/contacto" className="btn-outline-white">
              {ts.ctaExpert}
            </Link>
          </>
        }
      />

      {/* Transport Modes — comentado temporalmente
      <section className={s["transport-section"]}>
        <div className={s.inner}>
          <div className={s["section-label"]} data-reveal="up">
            Modos de Transporte
          </div>
          <h2
            className={s["section-title"]}
            data-reveal="up"
            data-reveal-delay={80}
          >
            Cobertura Mar, Aire y Tierra
          </h2>
          <p
            className={s["section-sub"]}
            data-reveal="up"
            data-reveal-delay={140}
          >
            Operamos las tres modalidades de transporte para ofrecerle la
            solución más eficiente según su producto, volumen y urgencia.
          </p>

          {TRANSPORT.map(
            ({ icon, tag, badge, title, img, desc, features, reverse }) => (
              <div
                key={title}
                className={`${s["transport-row"]} ${reverse ? s["transport-row--reverse"] : ""}`}
              >
                <div
                  className={s["transport-img"]}
                  data-reveal={reverse ? "right" : "left"}
                >
                  <div
                    className={s["transport-img-parallax"]}
                    data-parallax="0.05"
                  >
                    <img src={img} alt={title} loading="lazy" />
                  </div>
                  <span className={s["transport-img-badge"]}>{badge}</span>
                </div>
                <div
                  className={s["transport-content"]}
                  data-reveal={reverse ? "left" : "right"}
                >
                  <div className={s["transport-tag"]}>
                    <Icon name={icon} size={18} /> {tag}
                  </div>
                  <h3 className={s["transport-title"]}>{title}</h3>
                  <p className={s["transport-desc"]}>{desc}</p>
                  <ul className={s["transport-features"]}>
                    {features.map((f) => (
                      <li key={f} className={s["transport-feat"]}>
                        <span className={s["transport-feat-dot"]} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to="/cotizacion" className={s["transport-btn"]}>
                    Cotizar este servicio <Icon name="arrowRight" size={16} />
                  </Link>
                </div>
              </div>
            ),
          )}
        </div>
      </section>
      */}

      {/* Servicios Complementarios */}
      <section className={s.complementary}>
        <div className={`${s.ribbon} ${s["ribbon--blue"]}`}>
          {ts.complementaryRibbon}
        </div>
        <div className={s.inner}>
          <div className={s["comp-grid"]}>
            {ts.complementary.map(({ title, desc }, i) => (
              <article
                key={title}
                className={s["comp-card"]}
                data-reveal="up"
                data-reveal-delay={(i % 2) * 90}
              >
                <span className={s["comp-num"]} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={s["comp-icon"]}>
                  <Icon name={COMP_ICONS[i]} size={26} />
                </span>
                <h3 className={s["comp-title"]}>{title}</h3>
                <p className={s["comp-desc"]}>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Inspección de Calidad */}
      <section className={s.inspection}>
        <div className={`${s.ribbon} ${s["ribbon--green"]}`}>
          {ts.inspectionRibbon}
        </div>
        <div className={s.inner}>
          <div className={s["insp-panel"]}>
            <h2 className={s["insp-heading"]}>{ts.inspHeading}</h2>
            <span className={s["insp-pill"]}>{ts.inspPill}</span>
            <span className={s["insp-divider"]} aria-hidden="true" />
            <p className={s["insp-intro"]}>{ts.inspIntro}</p>

            <div
              className={s["insp-tabs"]}
              role="tablist"
              aria-label={ts.tabsLabel}
            >
              {ts.phases.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={activePhase === i}
                  className={`${s["insp-tab"]} ${activePhase === i ? s["insp-tab--active"] : ""}`}
                  onClick={() => goToPhase(i)}
                >
                  {p.tab}
                </button>
              ))}
            </div>

            <div
              className={s["insp-cards"]}
              ref={trackRef}
              onScroll={handleScroll}
            >
              {ts.phases.map((p, i) => (
                <article
                  key={i}
                  className={`${s["insp-item"]} ${activePhase === i ? s["insp-item--active"] : ""}`}
                >
                  <h3 className={s["insp-item-title"]}>{p.tab}</h3>
                  <p className={s["insp-item-sub"]}>{p.subtitle}</p>
                  <p className={s["insp-item-desc"]}>{p.desc}</p>

                  <div className={s["insp-box"]}>
                    <span className={s["insp-tag"]}>{ts.includesTag}</span>
                    <ul className={s["insp-list"]}>
                      {p.includes.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={s["insp-box"]}>
                    <span className={s["insp-tag"]}>{ts.benefitTag}</span>
                    <p className={s["insp-benefit"]}>{p.benefit}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Carousel controls — shown only on mobile (tabs are hidden there).
                Prev/next arrows flank the position dots; the dots are the sole
                tablist on mobile, so there is no a11y duplication with the tabs. */}
            <div className={s["insp-nav"]}>
              <button
                type="button"
                className={s["insp-arrow"]}
                onClick={() => goToPhase(activePhase - 1)}
                disabled={activePhase === 0}
                aria-label={ts.prevPhase}
              >
                <Icon name="arrowLeft" size={22} />
              </button>

              <div
                className={s["insp-dots"]}
                role="tablist"
                aria-label={ts.tabsLabel}
              >
                {ts.phases.map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    role="tab"
                    aria-selected={activePhase === i}
                    aria-label={p.tab}
                    className={`${s["insp-dot"]} ${activePhase === i ? s["insp-dot--active"] : ""}`}
                    onClick={() => goToPhase(i)}
                  />
                ))}
              </div>

              <button
                type="button"
                className={s["insp-arrow"]}
                onClick={() => goToPhase(activePhase + 1)}
                disabled={activePhase === ts.phases.length - 1}
                aria-label={ts.nextPhase}
              >
                <Icon name="arrowRight" size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AQL Table — comentado temporalmente
      <section className={s.aql}>
        <div className={s.inner}>
          <div className={s["section-label"]}>Estándares AQL</div>
          <h2 className={s["section-title"]}>
            Niveles de Aceptación de Calidad
          </h2>
          <p className={s["section-sub"]}>
            Trabajamos bajo el estándar AQL (Acceptance Quality Level) — en un
            lote de 1.000 unidades se inspeccionan estadísticamente 80 unidades.
          </p>
          <div style={{ overflowX: "auto" }} data-reveal="up">
            <table className={s["aql-table"]}>
              <thead>
                <tr>
                  <th>Nivel de Defecto</th>
                  <th>Descripción</th>
                  <th>Unidades Aceptadas</th>
                  <th>Unidades de Rechazo</th>
                </tr>
              </thead>
              <tbody>
                {AQL_DATA.map(({ nivel, descripcion, aceptacion, rechazo }) => (
                  <tr key={nivel}>
                    <td>
                      <span
                        className={`${s["aql-badge"]} ${s[`aql-badge--${nivel.toLowerCase()}`]}`}
                      >
                        {nivel}
                      </span>
                    </td>
                    <td>{descripcion}</td>
                    <td>
                      <strong>{aceptacion}</strong>
                    </td>
                    <td>
                      <strong>{rechazo}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      */}

      {/* <CTABanner /> */}
    </>
  );
}
