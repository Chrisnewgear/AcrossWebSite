import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
//import CTABanner from "../../components/CTABanner";
import Icon from "../../components/Icon";
import s from "./styles.module.scss";

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

const COMPLEMENTARY = [
  {
    icon: "search",
    title: "Búsqueda y Desarrollo de Proveedores Internacionales",
    desc: "Identificamos, evaluamos y seleccionamos fabricantes y proveedores confiables en mercados internacionales, garantizando calidad, competitividad y seguridad comercial.",
  },
  {
    icon: "package",
    title: "Gestión Integral de Importaciones",
    desc: "Coordinamos todo el ciclo de importación —trámites aduaneros, aranceles, permisos y logística— para que su mercancía llegue a destino sin contratiempos.",
  },
  {
    icon: "handshake",
    title: "Negociación y Compras Internacionales",
    desc: "Representamos los intereses de nuestros clientes en negociaciones comerciales, obteniendo las mejores condiciones de precio, calidad y plazos de entrega.",
  },
  {
    icon: "truck",
    title: "Logística y Coordinación de Transporte Internacional",
    desc: "Gestionamos el transporte marítimo, aéreo y terrestre, asegurando una cadena logística eficiente y un seguimiento continuo de la mercancía.",
  },
  {
    icon: "document",
    title: "Asesoría en Comercio Exterior",
    desc: "Brindamos orientación especializada en normativas, documentación, requisitos aduaneros, aranceles y procesos de importación para minimizar riesgos.",
  },
  {
    icon: "shieldCheck",
    title: "Inspección y Control de Calidad",
    desc: "Coordinamos verificaciones e inspecciones de productos antes del embarque para garantizar que cumplan con las especificaciones y estándares requeridos.",
  },
];

const INSPECTION = [
  {
    key: "carga",
    tab: "Carga de Contenedor",
    subtitle: "Supervisión de Estiba y Carga",
    desc: "Verificamos que la mercancía sea cargada correctamente en el contenedor, asegurando la integridad de los productos durante el transporte internacional.",
    includes: [
      "Verificación del estado del contenedor.",
      "Confirmación de cantidades cargadas.",
      "Supervisión de manipulación y estiba.",
      "Control de distribución y aseguramiento de la carga.",
      "Registro fotográfico completo del proceso.",
    ],
    benefit:
      "Evita daños durante el transporte, reduce riesgos logísticos y proporciona evidencia documental del estado de la mercancía al momento del embarque.",
  },
  {
    key: "durante",
    tab: "Durante Producción",
    subtitle: "Inspección en Planta (DUPRO)",
    desc: "Supervisamos el proceso de fabricación mientras su pedido se encuentra en producción, permitiendo detectar desviaciones, defectos o incumplimientos antes de que afecten la totalidad del lote.",
    includes: [
      "Verificación del avance de producción.",
      "Revisión de materias primas y componentes.",
      "Evaluación de procesos de fabricación.",
      "Detección temprana de defectos.",
      "Informe detallado con evidencia fotográfica.",
    ],
    benefit:
      "Reduce riesgos, evita retrasos y permite aplicar acciones correctivas antes de finalizar la producción.",
  },
  {
    key: "post",
    tab: "Post Producción",
    subtitle: "Inspección Final Pre-Embarque",
    desc: "Realizamos una evaluación completa del lote terminado antes de su despacho, utilizando criterios de muestreo AQL para verificar que los productos cumplan con los estándares de calidad establecidos.",
    includes: [
      "Control de calidad visual y funcional.",
      "Verificación de cantidades y referencias.",
      "Revisión de etiquetado, marcados y códigos.",
      "Inspección de empaque y embalaje.",
      "Informe técnico con fotografías y resultados de inspección.",
    ],
    benefit:
      "Garantiza que la mercancía enviada corresponde a lo solicitado y minimiza reclamaciones, devoluciones y pérdidas económicas.",
  },
];

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
  // Center card ("Durante Producción") is featured by default, matching the design.
  const [activePhase, setActivePhase] = useState(1);

  return (
    <>
      <PageHero
        breadcrumb="Servicios"
        label="Nuestras capacidades"
        title="Soluciones Logísticas Integrales"
        subtitle="Desde el proveedor hasta su bodega — gestionamos cada paso de su cadena de suministro internacional."
        image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80"
        actions={
          <>
            <Link to="/cotizacion" className="btn-green">
              Solicitar Cotización
            </Link>
            <Link to="/contacto" className="btn-outline-white">
              Hablar con un Experto
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
          Servicios Complementarios
        </div>
        <div className={s.inner}>
          <div className={s["comp-grid"]}>
            {COMPLEMENTARY.map(({ icon, title, desc }, i) => (
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
                  <Icon name={icon} size={26} />
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
          Inspección de Calidad
        </div>
        <div className={s.inner}>
          <div className={s["insp-panel"]}>
            <h2 className={s["insp-heading"]}>
              Control de Calidad AQL en Fábrica
            </h2>
            <span className={s["insp-pill"]}>
              Proteja su inversión antes de que la mercancía salga de origen.
            </span>
            <span className={s["insp-divider"]} aria-hidden="true" />
            <p className={s["insp-intro"]}>
              Realizamos inspecciones de calidad bajo estándares internacionales
              AQL (Acceptable Quality Limit) en las principales zonas
              industriales de China, verificando que los productos cumplan con
              las especificaciones acordadas antes del embarque.
            </p>

            <div
              className={s["insp-tabs"]}
              role="tablist"
              aria-label="Fases de inspección"
            >
              {INSPECTION.map((p, i) => (
                <button
                  key={p.key}
                  type="button"
                  role="tab"
                  aria-selected={activePhase === i}
                  className={`${s["insp-tab"]} ${activePhase === i ? s["insp-tab--active"] : ""}`}
                  onClick={() => setActivePhase(i)}
                >
                  {p.tab}
                </button>
              ))}
            </div>

            <div className={s["insp-cards"]}>
              {INSPECTION.map((p, i) => (
                <article
                  key={p.key}
                  className={`${s["insp-item"]} ${activePhase === i ? s["insp-item--active"] : ""}`}
                >
                  <h3 className={s["insp-item-title"]}>{p.tab}</h3>
                  <p className={s["insp-item-sub"]}>{p.subtitle}</p>
                  <p className={s["insp-item-desc"]}>{p.desc}</p>

                  <div className={s["insp-box"]}>
                    <span className={s["insp-tag"]}>Incluye</span>
                    <ul className={s["insp-list"]}>
                      {p.includes.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={s["insp-box"]}>
                    <span className={s["insp-tag"]}>
                      Beneficio para el cliente
                    </span>
                    <p className={s["insp-benefit"]}>{p.benefit}</p>
                  </div>
                </article>
              ))}
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
