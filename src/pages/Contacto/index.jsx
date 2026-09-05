import { useState } from "react";
import PageHero from "../../components/PageHero";
import Icon from "../../components/Icon";
import { useI18n } from "../../i18n/LanguageContext";
import s from "./styles.module.scss";

// Give up on a stuck request rather than spinning forever: PHPMailer's own
// SMTP timeout is 15s, so 20s here always outlives a real send.
const REQUEST_TIMEOUT_MS = 20000;

// Message cap mirrors the server-side limit in api/contact.php.
const MAX_MENSAJE = 5000;

const INITIAL = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  asunto: "",
  asuntoOtro: "",
  mensaje: "",
  // Honeypot — must stay empty. Deliberately not named "website"/"url":
  // browsers and password managers autofill those even with autocomplete off,
  // which would make the server silently discard a real message.
  nombre_confirmacion: "",
};

export default function Contacto() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { t } = useI18n();
  const tc = t.contacto;
  const isOtro = form.asunto === "otro";

  const update = (field) => (e) => {
    const { value } = e.target;
    setForm((f) => ({
      ...f,
      [field]: value,
      // Changing the subject away from "Otro" hides the free-text input, so
      // drop its value too — otherwise it still rides along in the payload.
      ...(field === "asunto" && value !== "otro" ? { asuntoOtro: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Send the human-readable subject label (in the language the visitor is
    // using), not the internal id.
    const subject = tc.subjects.find((o) => o.id === form.asunto);
    const payload = {
      ...form,
      asunto: subject ? subject.label : form.asunto,
      asuntoOtro: isOtro ? form.asuntoOtro : "",
    };

    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        // Optional call: on a browser without AbortSignal.timeout this is
        // undefined (no timeout) rather than a TypeError that would break
        // every submission.
        signal: AbortSignal.timeout?.(REQUEST_TIMEOUT_MS),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 429) {
        setError(tc.errorRate);
        return;
      }
      if (!res.ok || !data.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      setError(tc.error);
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
                <div className={s.success} role="status" aria-live="polite">
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
                      name="nombre_confirmacion"
                      className={s.honeypot}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={form.nombre_confirmacion}
                      onChange={update("nombre_confirmacion")}
                    />
                    <div className={s["form-grid"]}>
                      <div className={s["form-group"]}>
                        <label className={s["form-label"]} htmlFor="c-nombre">
                          {tc.labels.nombre}
                        </label>
                        <input
                          id="c-nombre"
                          name="nombre"
                          autoComplete="name"
                          className={s["form-input"]}
                          placeholder={tc.placeholders.nombre}
                          value={form.nombre}
                          onChange={update("nombre")}
                          required
                        />
                      </div>
                      <div className={s["form-group"]}>
                        <label className={s["form-label"]} htmlFor="c-empresa">
                          {tc.labels.empresa}
                        </label>
                        <input
                          id="c-empresa"
                          name="empresa"
                          autoComplete="organization"
                          className={s["form-input"]}
                          placeholder={tc.placeholders.empresa}
                          value={form.empresa}
                          onChange={update("empresa")}
                        />
                      </div>
                      <div className={s["form-group"]}>
                        <label className={s["form-label"]} htmlFor="c-email">
                          {tc.labels.email}
                        </label>
                        <input
                          id="c-email"
                          name="email"
                          autoComplete="email"
                          className={s["form-input"]}
                          type="email"
                          placeholder={tc.placeholders.email}
                          value={form.email}
                          onChange={update("email")}
                          required
                        />
                      </div>
                      <div className={s["form-group"]}>
                        <label className={s["form-label"]} htmlFor="c-telefono">
                          {tc.labels.telefono}
                        </label>
                        <input
                          id="c-telefono"
                          name="telefono"
                          autoComplete="tel"
                          className={s["form-input"]}
                          type="tel"
                          placeholder={tc.placeholders.telefono}
                          value={form.telefono}
                          onChange={update("telefono")}
                        />
                      </div>
                    </div>

                    <div className={s["form-group"]}>
                      <label className={s["form-label"]} htmlFor="c-asunto">
                        {tc.labels.asunto}
                      </label>
                      <select
                        id="c-asunto"
                        name="asunto"
                        className={s["form-select"]}
                        value={form.asunto}
                        onChange={update("asunto")}
                        required
                      >
                        <option value="" disabled>
                          {tc.asuntoPlaceholder}
                        </option>
                        {tc.subjects.map((o) => (
                          <option key={o.id} value={o.id}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      {isOtro && (
                        <input
                          name="asuntoOtro"
                          aria-label={tc.otroPlaceholder}
                          className={s["form-input"]}
                          placeholder={tc.otroPlaceholder}
                          value={form.asuntoOtro}
                          onChange={update("asuntoOtro")}
                          required
                        />
                      )}
                    </div>

                    <div className={s["form-group"]}>
                      <label className={s["form-label"]} htmlFor="c-mensaje">
                        {tc.labels.mensaje}
                      </label>
                      <textarea
                        id="c-mensaje"
                        name="mensaje"
                        maxLength={MAX_MENSAJE}
                        className={s["form-textarea"]}
                        placeholder={tc.placeholders.mensaje}
                        value={form.mensaje}
                        onChange={update("mensaje")}
                        required
                      />
                    </div>

                    {/* Always mounted so screen readers announce the error
                        when it appears; empty, it takes up no space. */}
                    <div role="status" aria-live="polite">
                      {error && <p className={s["form-error"]}>{error}</p>}
                    </div>

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

              {/* HORARIO DE ATENCIÓN disabled for now — uncomment to re-enable
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
              */}
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
