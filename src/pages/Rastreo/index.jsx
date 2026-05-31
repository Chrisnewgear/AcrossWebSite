import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import Icon from "../../components/Icon";
import s from "./styles.module.scss";

const DEMO_SHIPMENT = {
  id: "MSKU7845213",
  origin: "Shanghai, China",
  destination: "Guayaquil, Ecuador",
  type: "Marítimo — FCL 20'",
  eta: "15 Jun 2026",
  status: "transit",
  statusLabel: "En Tránsito",
  events: [
    {
      state: "done",
      date: "01 May 2026 — 09:00",
      event: "Orden de compra confirmada",
      location: "Shanghai, China",
    },
    {
      state: "done",
      date: "08 May 2026 — 14:30",
      event: "Inspección de calidad completada",
      location: "Guangzhou, China",
    },
    {
      state: "done",
      date: "12 May 2026 — 08:00",
      event: "Cargado en contenedor MSKU7845213",
      location: "Puerto de Shanghai",
    },
    {
      state: "done",
      date: "14 May 2026 — 22:15",
      event: "Zarpe desde Shanghai",
      location: "Terminal SIPG, Shanghai",
    },
    {
      state: "active",
      date: "24 May 2026 — 11:00",
      event: "En tránsito — Océano Pacífico",
      location: "Lat: -3.2, Lon: -140.8",
    },
    {
      state: "pending",
      date: "Aprox. 10 Jun 2026",
      event: "Arribo al Canal de Panamá",
      location: "Miraflores, Panamá",
    },
    {
      state: "pending",
      date: "Aprox. 13 Jun 2026",
      event: "Llegada a Puerto Bolívar",
      location: "Puerto Bolívar, Ecuador",
    },
    {
      state: "pending",
      date: "Aprox. 15 Jun 2026",
      event: "Entrega en bodega cliente",
      location: "Guayaquil, Ecuador",
    },
  ],
};

const EXAMPLES = ["MSKU7845213", "AWB-987654", "BL-2026-GYE", "CONT-445512"];

const INFO = [
  {
    icon: "clipboard",
    title: "¿Qué puedo rastrear?",
    text: "Números de contenedor (BIC/ISO), AWB aéreos, Bill of Lading (BL) y números de guía interna Acrosscon.",
  },
  {
    icon: "bell",
    title: "Notificaciones Automáticas",
    text: "Reciba actualizaciones por WhatsApp o correo en cada evento de su envío: zarpe, tránsito, llegada y entrega.",
  },
  {
    icon: "phone",
    title: "¿No encuentra su envío?",
    text: "Contáctenos directamente. Nuestro equipo de operaciones tiene acceso a información en tiempo real de todos sus embarques.",
  },
];

export default function Rastreo() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setResult(null);
    setNotFound(false);

    setTimeout(() => {
      setLoading(false);
      if (
        q.toUpperCase() === DEMO_SHIPMENT.id ||
        q.toLowerCase() === DEMO_SHIPMENT.id.toLowerCase()
      ) {
        setResult(DEMO_SHIPMENT);
      } else {
        setNotFound(true);
      }
    }, 1000);
  };

  const fillExample = (ex) => {
    setQuery(ex);
    setResult(null);
    setNotFound(false);
  };

  return (
    <>
      <PageHero
        breadcrumb="Rastreo"
        label="Seguimiento en tiempo real"
        title="Rastree su Envío"
        subtitle="Ingrese su número de guía, contenedor o AWB para ver el estado en tiempo real de su carga."
        image="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=80"
      />

      <section className={s["search-section"]}>
        <div className={s.inner}>
          <div className={s["search-card"]} data-reveal="up">
            <div className={s["search-label"]}>Búsqueda de Envío</div>
            <h2 className={s["search-title"]}>¿Dónde está su carga?</h2>
            <p className={s["search-sub"]}>
              Pruebe con: <em>MSKU7845213</em> para ver un ejemplo de
              seguimiento en vivo.
            </p>

            <form className={s["search-form"]} onSubmit={handleSearch}>
              <div className={s["search-input-wrap"]}>
                <span className={s["search-icon"]}><Icon name="package" size={20} /></span>
                <input
                  type="text"
                  className={s["search-input"]}
                  placeholder="Ej: MSKU7845213 / AWB-987654 / BL-2026-GYE"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Número de guía o contenedor"
                />
              </div>
              <button
                type="submit"
                className={s["search-btn"]}
                disabled={loading || !query.trim()}
              >
                {loading ? "..." : "Rastrear"}
              </button>
            </form>

            <div className={s["search-hint"]}>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "#8fa3bc",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Ejemplos:
              </span>
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  className={s["search-example"]}
                  onClick={() => fillExample(ex)}
                  type="button"
                >
                  {ex}
                </button>
              ))}
            </div>

            {/* Result */}
            {result && (
              <div className={s.result}>
                <div className={s["result-header"]}>
                  <div>
                    <div className={s["result-id"]}>{result.id}</div>
                    <div className={s["result-meta"]}>
                      <div className={s["result-meta-item"]}>
                        <strong>Origen</strong>
                        {result.origin}
                      </div>
                      <div className={s["result-meta-item"]}>
                        <strong>Destino</strong>
                        {result.destination}
                      </div>
                      <div className={s["result-meta-item"]}>
                        <strong>Tipo</strong>
                        {result.type}
                      </div>
                      <div className={s["result-meta-item"]}>
                        <strong>ETA</strong>
                        {result.eta}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`${s["status-badge"]} ${s[`status-badge--${result.status}`]}`}
                  >
                    {result.statusLabel}
                  </span>
                </div>

                <div className={s.timeline}>
                  {result.events.map((ev, i) => (
                    <div
                      key={i}
                      className={`${s["timeline-item"]} ${s[`timeline-item--${ev.state}`]}`}
                    >
                      <div className={s["timeline-dot"]} />
                      <div className={s["timeline-content"]}>
                        <div className={s["timeline-date"]}>{ev.date}</div>
                        <div className={s["timeline-event"]}>{ev.event}</div>
                        <div className={s["timeline-location"]}>
                          <Icon name="mapPin" size={14} /> {ev.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Not found */}
            {notFound && (
              <div className={s["not-found"]}>
                <p>
                  No encontramos un envío con ese número. Verifique e intente de
                  nuevo, o contáctenos directamente.
                </p>
                <Link
                  to="/contacto"
                  className="btn-green"
                  style={{ display: "inline-flex" }}
                >
                  Contactar a Operaciones
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info cards */}
      <section className={s["info-section"]}>
        <div className={s.inner}>
          <div
            className={s["section-label"]}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#71C200",
              marginBottom: "16px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 24,
                height: 2,
                background: "#71C200",
                borderRadius: 2,
              }}
            />
            Información de Rastreo
          </div>
          <h2
            style={{
              fontFamily: "Barlow Condensed, sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              fontWeight: 800,
              color: "#134289",
              marginBottom: "0",
            }}
          >
            Todo lo que necesita saber
          </h2>
          <div className={s["info-grid"]}>
            {INFO.map(({ icon, title, text }, i) => (
              <div key={title} className={s["info-card"]} data-reveal="up" data-reveal-delay={i * 100}>
                <span className={s["info-icon"]}><Icon name={icon} size={24} /></span>
                <h3 className={s["info-title"]}>{title}</h3>
                <p className={s["info-text"]}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className={s["contact-prompt"]}>
        <div className={s["contact-card"]} data-reveal="scale">
          <div className={s["contact-text"]}>
            <h3>¿Necesita ayuda con su envío?</h3>
            <p>
              Nuestro equipo de operaciones está disponible de lunes a sábado,
              8am – 6pm (GMT-5)
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a
              href="https://wa.me/593998432427"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green"
            >
              WhatsApp
            </a>
            <Link to="/contacto" className="btn-outline-white">
              Formulario de Contacto
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
