import s from "./styles.module.scss";

const ADVANTAGES = [
  {
    title: "Red Global de Proveedores",
    desc: "Contamos con una sólida red de fabricantes y proveedores internacionales cuidadosamente seleccionados, lo que nos permite ofrecer productos competitivos, confiables y adaptados a las necesidades de cada cliente.",
  },
  {
    title: "Eficiencia en la Gestión Comercial",
    desc: "Optimizamos cada etapa del proceso de importación, desde la búsqueda de proveedores hasta la entrega final, garantizando operaciones ágiles y seguras.",
  },
  {
    title: "Transparencia y Confianza",
    desc: "Trabajamos con total claridad en cada negociación, brindando información oportuna y acompañamiento constante para que nuestros clientes tomen decisiones con seguridad.",
  },
  {
    title: "Experiencia en Comercio Internacional",
    desc: "Nuestro conocimiento de los mercados globales, procesos aduaneros y logística internacional nos permite minimizar riesgos y generar oportunidades de negocio exitosas.",
  },
];

const COMMISSIONS = [
  {
    rate: "5%",
    type: "Comisión Estándar",
    label: "Pedidos entre $20K y $50K FOB",
  },
  {
    rate: "3.5%",
    type: "Comisión Premium",
    label: "Pedidos superiores a $50K FOB",
  },
  { rate: "$150", type: "Verificación", label: "Auditoría de proveedor + IVA" },
];

export default function Ventajas() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.header} data-reveal="up">
          <h2 className={s.title}>Por qué elegirnos</h2>
        </div>

        <div className={s.grid}>
          {ADVANTAGES.map(({ title, desc }, i) => (
            <article
              key={title}
              className={s.card}
              data-reveal="up"
              data-reveal-delay={(i % 2) * 120}
            >
              <h3 className={s["card-title"]}>{title}</h3>
              <p className={s["card-desc"]}>{desc}</p>
              <span className={s["card-number"]} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>

        <div className={s.commissions}>
          {COMMISSIONS.map(({ rate, type, label }, i) => (
            <div
              key={type}
              className={s["commission-item"]}
              data-reveal="scale"
              data-reveal-delay={i * 110}
            >
              <div className={s["commission-rate"]}>{rate}</div>
              <div className={s["commission-type"]}>{type}</div>
              <div className={s["commission-label"]}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
