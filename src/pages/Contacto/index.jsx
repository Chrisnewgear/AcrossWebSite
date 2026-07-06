import { useState } from "react";
import PageHero from "../../components/PageHero";
import Icon from "../../components/Icon";
import { useI18n } from "../../i18n/LanguageContext";
import s from "./styles.module.scss";

const INITIAL = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  asunto: "",
  asuntoOtro: "",
  mensaje: "",
  website: "", // honeypot — must stay empty
};

export default function Contacto() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { t } = useI18n();
  const tc = t.contacto;
  const isOtro = form.asunto === tc.subjects[tc.subjects.length - 1];

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        breadcrumb={tc.breadcrumb}
        label={tc.heroLabel}
        title={tc.heroTitle}
        subtitle={tc.heroSub}
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
      />

      <section className={s.section}>
        <div className={s.inner}>
          <div className={s["header-bar"]}>{tc.headerBar}</div>

          <div className={s.panel}>
            <div className={s["form-card"]} data-reveal="up">
              {submitted ? (
                <div className={s.success}>
                  <span className={s["success-icon"]}>
                    <Icon name="checkCircle" size={52} />
                  </span>
                  <h3 className={s["success-title"]}>{tc.success.title}</h3>
                  <p className={s["success-sub"]}>{tc.success.sub}</p>
                </div>
              ) : (
                <>
                  <div className={s["form-header"]}>
                    <h2 className={s["form-title"]}>{tc.formTitle}</h2>
                    <p className={s["form-sub"]}>{tc.formSub}</p>
                  </div>

                  <form className={s.form} onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="website"
                      className={s.honeypot}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={form.website}
                      onChange={update("website")}
                    />
                    <div className={s["form-grid"]}>
                      <div className={s["form-group"]}>
                        <label className={s["form-label"]}>
                          {tc.labels.nombre}
                        </label>
                        <input
                          className={s["form-input"]}
                          placeholder={tc.placeholders.nombre}
                          value={form.nombre}
                          onChange={update("nombre")}
                          required
                        />
                      </div>
                      <div className={s["form-group"]}>
                        <label className={s["form-label"]}>
                          {tc.labels.empresa}
                        </label>
                        <input
                          className={s["form-input"]}
                          placeholder={tc.placeholders.empresa}
                          value={form.empresa}
                          onChange={update("empresa")}
                        />
                      </div>
                      <div className={s["form-group"]}>
                        <label className={s["form-label"]}>
                          {tc.labels.email}
                        </label>
                        <input
                          className={s["form-input"]}
                          type="email"
                          placeholder={tc.placeholders.email}
                          value={form.email}
                          onChange={update("email")}
                          required
                        />
                      </div>
                      <div className={s["form-group"]}>
                        <label className={s["form-label"]}>
                          {tc.labels.telefono}
                        </label>
                        <input
                          className={s["form-input"]}
                          type="tel"
                          placeholder={tc.placeholders.telefono}
                          value={form.telefono}
                          onChange={update("telefono")}
                        />
                      </div>
                    </div>

                    <div className={s["form-group"]}>
                      <label className={s["form-label"]}>
                        {tc.labels.asunto}
                      </label>
                      <select
                        className={s["form-select"]}
                        value={form.asunto}
                        onChange={update("asunto")}
                        required
                      >
                        <option value="" disabled>
                          {tc.asuntoPlaceholder}
                        </option>
                        {tc.subjects.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                      {isOtro && (
                        <input
                          className={s["form-input"]}
                          placeholder={tc.otroPlaceholder}
                          value={form.asuntoOtro}
                          onChange={update("asuntoOtro")}
                          required
                        />
                      )}
                    </div>

                    <div className={s["form-group"]}>
                      <label className={s["form-label"]}>
                        {tc.labels.mensaje}
                      </label>
                      <textarea
                        className={s["form-textarea"]}
                        placeholder={tc.placeholders.mensaje}
                        value={form.mensaje}
                        onChange={update("mensaje")}
                        required
                      />
                    </div>

                    {error && <p className={s["form-error"]}>{tc.error}</p>}

                    <button
                      type="submit"
                      className={s["btn-submit"]}
                      disabled={loading}
                    >
                      {loading ? tc.submitting : tc.submit}
                    </button>
                  </form>
                </>
              )}
            </div>

            <aside className={s["info-card"]} data-reveal="up">
              <div className={s["info-block"]}>
                <h3 className={s["info-block-title"]}>{tc.channelsTitle}</h3>
                <div className={s["channel-list"]}>
                  {tc.channels.map((ch) => (
                    <a
                      key={ch.label}
                      href={ch.href}
                      className={s["channel-item"]}
                      target={ch.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        ch.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      <span className={s["channel-icon"]}>
                        <Icon name={ch.icon} size={20} />
                      </span>
                      <span className={s["channel-info"]}>
                        <span className={s["channel-label"]}>{ch.label}</span>
                        <span className={s["channel-value"]}>{ch.value}</span>
                      </span>
                      <span className={s["channel-action"]}>
                        {ch.action}
                        <Icon name="arrowRight" size={14} />
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className={s["info-block"]}>
                <h3 className={s["info-block-title"]}>{tc.hoursTitle}</h3>
                <div className={s["hours-list"]}>
                  {tc.hours.map((h) => (
                    <div key={h.day} className={s["hours-row"]}>
                      <span>{h.day}</span>
                      <span className={s["hours-time"]}>{h.time}</span>
                    </div>
                  ))}
                </div>
                <p className={s["hours-note"]}>{tc.hoursNote}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
