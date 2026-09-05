import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import Icon from "../../components/Icon";
import { useI18n } from "../../i18n/LanguageContext";
import s from "./styles.module.scss";

const EXAMPLES = ["MSKU7845213", "AWB-987654", "BL-2026-GYE", "CONT-445512"];
const INFO_ICONS = ["clipboard", "bell", "phone"];
const DEMO_STATUS = "transit"; // drives the status-badge color modifier

export default function Rastreo() {
  const { t } = useI18n();
  const tr = t.rastreo;
  const demo = tr.demo;

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
      if (q.toLowerCase() === demo.id.toLowerCase()) {
        setResult(demo);
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
        breadcrumb={tr.breadcrumb}
        label={tr.heroLabel}
        title={tr.heroTitle}
        subtitle={tr.heroSub}
        image="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=80"
      />

      <section className={s["search-section"]}>
        <div className={s.inner}>
          <div className={s["search-card"]} data-reveal="up">
            <div className={s["search-label"]}>{tr.searchLabel}</div>
            <h2 className={s["search-title"]}>{tr.searchTitle}</h2>
            <p className={s["search-sub"]}>
              {tr.searchSubPre}
              <em>{demo.id}</em>
              {tr.searchSubPost}
            </p>

            <form className={s["search-form"]} onSubmit={handleSearch}>
              <div className={s["search-input-wrap"]}>
                <span className={s["search-icon"]}><Icon name="package" size={20} /></span>
                <input
                  type="text"
                  className={s["search-input"]}
                  placeholder={tr.placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label={tr.searchLabel}
                />
              </div>
              <button
                type="submit"
                className={s["search-btn"]}
                disabled={loading || !query.trim()}
              >
                {loading ? "..." : tr.searchBtn}
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
                {tr.examplesLabel}
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
                        <strong>{tr.resultLabels.origen}</strong>
                        {result.origin}
                      </div>
                      <div className={s["result-meta-item"]}>
                        <strong>{tr.resultLabels.destino}</strong>
                        {result.destination}
                      </div>
                      <div className={s["result-meta-item"]}>
                        <strong>{tr.resultLabels.tipo}</strong>
                        {result.type}
                      </div>
                      <div className={s["result-meta-item"]}>
                        <strong>{tr.resultLabels.eta}</strong>
                        {result.eta}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`${s["status-badge"]} ${s[`status-badge--${DEMO_STATUS}`]}`}
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
                <p>{tr.notFound}</p>
                <Link
                  to="/contacto"
                  className="btn-green"
                  style={{ display: "inline-flex" }}
                >
                  {tr.notFoundCta}
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
            {tr.infoLabel}
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
            {tr.infoTitle}
          </h2>
          <div className={s["info-grid"]}>
            {tr.info.map(({ title, text }, i) => (
              <div key={title} className={s["info-card"]} data-reveal="up" data-reveal-delay={i * 100}>
                <span className={s["info-icon"]}><Icon name={INFO_ICONS[i]} size={24} /></span>
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
            <h3>{tr.contactTitle}</h3>
            <p>{tr.contactText}</p>
          </div>
          <div
            className="on-dark"
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {/* WhatsApp button disabled for now — uncomment to re-enable
            <a
              href="https://wa.me/593998432427"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-green"
            >
              WhatsApp
            </a>
            */}
            <Link to="/contacto" className="btn-outline-white">
              {tr.contactCta}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
