import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import CTABanner from "../../components/CTABanner";
import Icon from "../../components/Icon";
import s from "./styles.module.scss";

const TRANSPORT = [
  {
    icon: "ship",
    tag: "Transporte Marítimo",
    badge: "FCL / LCL / Consolidado",
    title: "Carga Marítima Internacional",
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80",
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

const ADDITIONAL = [
  {
    icon: "search",
    title: "Verificación de Proveedores",
    desc: "Auditamos la fábrica antes de cualquier transferencia de dinero. Verificamos capacidad productiva, licencias comerciales, historial de exportación y condiciones laborales.",
    price: "$150 + IVA por proveedor",
  },
  {
    icon: "cart",
    title: "Sourcing B2B",
    desc: "Le conseguimos hasta 5 propuestas de proveedores verificados para su producto. Negociamos precios, muestras y condiciones de pago en su nombre.",
    price: "Hasta 5 SKUs sin costo",
  },
  {
    icon: "chart",
    title: "Gestión de Importación",
    desc: "Coordinamos todos los trámites aduaneros, pagos de aranceles, permisos sanitarios (ARCSA) y demás requisitos para el ingreso de su mercancía al Ecuador.",
    price: "Cotización según producto",
  },
  {
    icon: "package",
    title: "Empaque y Etiquetado",
    desc: "Supervisamos que el empaque cumpla con normativa ecuatoriana (INEN, NTE) y requisitos de retailer. Coordinamos re-etiquetado y kitting en origen si es necesario.",
    price: "Cotización según volumen",
  },
  {
    icon: "handshake",
    title: "Intermediación Comercial",
    desc: "Actuamos como su departamento de compras internacionales. Negociamos, emitimos órdenes de compra, gestionamos pagos y controlamos producción.",
    price: "Comisión del 3.5% al 5% FOB",
  },
  {
    icon: "lock",
    title: "Privacidad Estratégica",
    desc: "Figuramos como embarcador real. Su competencia jamás conocerá la identidad de su fabricante. Contrato de confidencialidad incluido con cada operación.",
    price: "Incluido en cada operación",
  },
];

const INSPECTION_PHASES = [
  {
    phase: "Durante Producción",
    title: "Inspección en Planta",
    desc: "Supervisión en fábrica mientras se fabrica su pedido. Ideal para detectar defectos de proceso y corregir antes de que sea tarde.",
    rate: "$475",
  },
  {
    phase: "Post Producción",
    title: "Inspección Final",
    desc: "Inspección del lote terminado antes del embalaje final. Verificamos calidad, cantidad, marcado y cumplimiento de especificaciones.",
    rate: "$475",
  },
  {
    phase: "Carga de Contenedor",
    title: "Supervisión de Estiba",
    desc: "Verificación de la correcta carga y estiba del contenedor. Documentación fotográfica completa del estado de la mercancía al embarque.",
    rate: "$475",
  },
];

const AQL_DATA = [
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

export default function Servicios() {
  return (
    <>
      <PageHero
        breadcrumb="Servicios"
        label="Nuestras capacidades"
        title="Soluciones Logísticas Integrales"
        subtitle="Desde el proveedor hasta su bodega — gestionamos cada paso de su cadena de suministro internacional."
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

      {/* Transport Modes */}
      <section className={s["transport-section"]}>
        <div className={s.inner}>
          <div className={s["section-label"]}>Modos de Transporte</div>
          <h2 className={s["section-title"]}>Cobertura Mar, Aire y Tierra</h2>
          <p className={s["section-sub"]}>
            Operamos las tres modalidades de transporte para ofrecerle la
            solución más eficiente según su producto, volumen y urgencia.
          </p>

          {TRANSPORT.map(
            ({ icon, tag, badge, title, img, desc, features, reverse }) => (
              <div
                key={title}
                className={`${s["transport-row"]} ${reverse ? s["transport-row--reverse"] : ""}`}
              >
                <div className={s["transport-img"]}>
                  <img src={img} alt={title} loading="lazy" />
                  <span className={s["transport-img-badge"]}>{badge}</span>
                </div>
                <div className={s["transport-content"]}>
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

      {/* Additional Services */}
      <section className={s.additional}>
        <div className={s.inner}>
          <div className={s["section-label"]}>Servicios Complementarios</div>
          <h2 className={s["section-title"]}>Más allá del transporte</h2>
          <p className={s["section-sub"]}>
            Su departamento de compras internacionales externo — verificamos,
            negociamos, inspeccionamos y protegemos su inversión.
          </p>
          <div className={s["add-grid"]}>
            {ADDITIONAL.map(({ icon, title, desc, price }) => (
              <div key={title} className={s["add-card"]}>
                <span className={s["add-icon"]}><Icon name={icon} size={26} /></span>
                <h3 className={s["add-title"]}>{title}</h3>
                <p className={s["add-desc"]}>{desc}</p>
                <span className={s["add-price"]}>{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspection */}
      <section className={s.inspection}>
        <div className={s.inner}>
          <div className={s["section-label"]} style={{ color: "#71C200" }}>
            Inspección de Calidad
          </div>
          <h2 className={s["section-title"]} style={{ color: "white" }}>
            Control de Calidad AQL en Fábrica
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "1.125rem",
              maxWidth: 540,
              lineHeight: 1.7,
              marginBottom: "3rem",
            }}
          >
            Inspeccionamos en las principales ciudades de China con cobertura
            extendida bajo evaluación de viáticos.
          </p>
          <div className={s["insp-grid"]}>
            {INSPECTION_PHASES.map(({ phase, title, desc, rate }) => (
              <div key={phase} className={s["insp-card"]}>
                <div className={s["insp-phase"]}>{phase}</div>
                <h3 className={s["insp-title"]}>{title}</h3>
                <p className={s["insp-desc"]}>{desc}</p>
                <div className={s["insp-rate"]}>
                  {rate}
                  <span style={{ fontSize: "1rem", fontWeight: 400 }}>
                    {" "}
                    + IVA / día
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AQL Table */}
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
          <div style={{ overflowX: "auto" }}>
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

      <CTABanner />
    </>
  );
}
