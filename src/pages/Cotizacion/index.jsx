import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import Icon from "../../components/Icon";
import { useI18n } from "../../i18n/LanguageContext";
import s from "./styles.module.scss";

// Incoterm codes stay in code; copy comes from translations.
const INCOTERMS = ["EXW", "FOB", "CIF", "CFR", "DDP", "FCA"];

const INITIAL = {
  service: "",
  origen: "",
  destino: "",
  incoterm: "",
  volumen: "",
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  descripcion: "",
  comentarios: "",
};

const TOTAL_STEPS = 3;

export default function Cotizacion() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documento, setDocumento] = useState(null);
  const [docError, setDocError] = useState("");
  const [error, setError] = useState(false);

  const { t } = useI18n();
  const tc = t.cotizacion;
  const stepLabel = tc.stepLabel
    .replace("{n}", step)
    .replace("{total}", TOTAL_STEPS);

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const MAX_MB = 10;
  const ALLOWED_EXT = ["pdf", "docx", "xlsx", "jpg", "jpeg", "png"];
  const handleFile = (e) => {
    const f = e.target.files?.[0] || null;
    setDocError("");
    if (f) {
      const ext = f.name.split(".").pop().toLowerCase();
      if (!ALLOWED_EXT.includes(ext)) {
        setDocError(tc.fileErrors.type);
        e.target.value = "";
        return;
      }
      if (f.size > MAX_MB * 1024 * 1024) {
        setDocError(tc.fileErrors.size);
        e.target.value = "";
        return;
      }
    }
    setDocumento(f);
  };

  const canNext1 = form.service && form.origen && form.destino;
  const canNext2 = form.nombre && form.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("website", ""); // honeypot
      if (documento) fd.append("documento", documento);
      const res = await fetch("/api/cotizacion.php", {
        method: "POST",
        body: fd,
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
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80"
      />

      <section className={s.section}>
        <div className={s.inner}>
          <div className={s["header-bar"]}>{tc.headerBar}</div>

          <div className={s.panel}>
            {/* Left — ¿Cómo funciona? */}
            <aside className={s.how} data-reveal="left">
              <h2 className={s["how-title"]}>{tc.howTitle}</h2>
              <p className={s["how-sub"]}>{tc.howSub}</p>

              <div className={s["steps-list"]}>
                {tc.steps.map(({ title, desc }, i) => (
                  <div key={i} className={s["step-card"]}>
                    <span className={s["step-num"]}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h4 className={s["step-title"]}>{title}</h4>
                    <p className={s["step-desc"]}>{desc}</p>
                  </div>
                ))}
              </div>
            </aside>

            {/* Right — light form card */}
            <div className={s["form-card"]} data-reveal="right">
              {submitted ? (
                <div className={s.success}>
                  <span className={s["success-icon"]}>
                    <Icon name="checkCircle" size={52} />
                  </span>
                  <h3 className={s["success-title"]}>{tc.success.title}</h3>
                  <p className={s["success-sub"]}>{tc.success.sub}</p>
                  <div className={s["success-actions"]}>
                    {/* WhatsApp button disabled for now — uncomment to re-enable
                    <a
                      href="https://wa.me/593998432427"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-green"
                    >
                      WhatsApp Directo
                    </a>
                    */}
                    <Link to="/" className={s["btn-outline"]}>
                      {tc.success.backHome}
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className={s["form-header"]}>
                    <h2 className={s["form-title"]}>{tc.formTitle}</h2>
                    <p className={s["form-subtitle"]}>{stepLabel}</p>
                    <div className={s.progress}>
                      {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                        <div
                          key={i}
                          className={`${s["progress-step"]} ${
                            i + 1 < step
                              ? s["progress-step--done"]
                              : i + 1 === step
                                ? s["progress-step--active"]
                                : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <form className={s["form-body"]} onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="website"
                      className={s.honeypot}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value=""
                      onChange={() => {}}
                    />
                    {/* Step 1 — Service + Route */}
                    {step === 1 && (
                      <>
                        <div className={s["form-grid"]}>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>
                              {tc.labels.servicio}
                            </label>
                            <select
                              className={s["form-select"]}
                              value={form.service}
                              onChange={update("service")}
                              required
                            >
                              <option value="" disabled>
                                {tc.placeholders.servicio}
                              </option>
                              {tc.services.map((name) => (
                                <option key={name} value={name}>
                                  {name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>
                              {tc.labels.origen}
                            </label>
                            <input
                              className={s["form-input"]}
                              placeholder={tc.placeholders.origen}
                              value={form.origen}
                              onChange={update("origen")}
                              required
                            />
                          </div>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>
                              {tc.labels.destino}
                            </label>
                            <input
                              className={s["form-input"]}
                              placeholder={tc.placeholders.destino}
                              value={form.destino}
                              onChange={update("destino")}
                              required
                            />
                          </div>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>
                              {tc.labels.incoterm}
                            </label>
                            <select
                              className={s["form-select"]}
                              value={form.incoterm}
                              onChange={update("incoterm")}
                            >
                              <option value="" disabled>
                                {tc.placeholders.incoterm}
                              </option>
                              {INCOTERMS.map((code) => (
                                <option key={code}>{code}</option>
                              ))}
                            </select>
                          </div>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>
                              {tc.labels.documento}
                            </label>
                            <input
                              type="file"
                              accept=".pdf,.docx,.xlsx,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                              className={s["form-input"]}
                              onChange={handleFile}
                            />
                            <span className={s["file-hint"]}>{tc.fileHint}</span>
                            {docError && (
                              <span className={s["form-error"]}>{docError}</span>
                            )}
                          </div>
                        </div>

                        <div className={s["form-group"]}>
                          <label className={s["form-label"]}>
                            {tc.labels.descripcion}
                          </label>
                          <textarea
                            className={s["form-textarea"]}
                            placeholder={tc.placeholders.descripcion}
                            value={form.descripcion}
                            onChange={update("descripcion")}
                          />
                        </div>

                        <div className={s["form-actions"]}>
                          <span />
                          <button
                            type="button"
                            className={s["btn-next"]}
                            disabled={!canNext1}
                            onClick={() => setStep(2)}
                          >
                            {tc.buttons.continuar} <Icon name="arrowRight" size={16} />
                          </button>
                        </div>
                      </>
                    )}

                    {/* Step 2 — Contact info */}
                    {step === 2 && (
                      <>
                        <h3 className={s["section-heading"]}>
                          {tc.sectionDatos}
                        </h3>
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
                            {tc.labels.comentarios}
                          </label>
                          <textarea
                            className={s["form-textarea"]}
                            placeholder={tc.placeholders.comentarios}
                            value={form.comentarios}
                            onChange={update("comentarios")}
                          />
                        </div>
                        <div className={s["form-actions"]}>
                          <button
                            type="button"
                            className={s["btn-prev"]}
                            onClick={() => setStep(1)}
                          >
                            <Icon name="arrowLeft" size={16} /> {tc.buttons.atras}
                          </button>
                          <button
                            type="button"
                            className={s["btn-next"]}
                            disabled={!canNext2}
                            onClick={() => setStep(3)}
                          >
                            {tc.buttons.revisar} <Icon name="arrowRight" size={16} />
                          </button>
                        </div>
                      </>
                    )}

                    {/* Step 3 — Review + submit */}
                    {step === 3 && (
                      <>
                        <h3 className={s["section-heading"]}>
                          {tc.sectionConfirmar}
                        </h3>
                        <div className={s.review}>
                          {[
                            [tc.review.servicio, form.service || tc.review.dash],
                            [tc.review.ruta, `${form.origen} → ${form.destino}`],
                            [tc.review.incoterm, form.incoterm || tc.review.dash],
                            [tc.review.contacto, `${form.nombre} — ${form.email}`],
                            [tc.review.empresa, form.empresa || tc.review.dash],
                          ].map(([k, v]) => (
                            <div key={k} className={s["review-row"]}>
                              <span className={s["review-key"]}>{k}</span>
                              <span className={s["review-value"]}>{v}</span>
                            </div>
                          ))}
                        </div>
                        {error && (
                          <p className={s["form-error"]}>{tc.error}</p>
                        )}
                        <div className={s["form-actions"]}>
                          <button
                            type="button"
                            className={s["btn-prev"]}
                            onClick={() => setStep(2)}
                          >
                            <Icon name="arrowLeft" size={16} /> {tc.buttons.atras}
                          </button>
                          <button
                            type="submit"
                            className={s["btn-next"]}
                            disabled={loading}
                          >
                            {loading ? (
                              tc.buttons.enviando
                            ) : (
                              <>
                                <Icon name="check" size={16} /> {tc.buttons.enviar}
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
