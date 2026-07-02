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
};

export default function Contacto() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { t } = useI18n();
  const tc = t.contacto;
  const isOtro = form.asunto === tc.subjects[tc.subjects.length - 1];

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
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
                        <label className={s["form-label"]}>{tc.labels.empresa}</label>
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
                      <label className={s["form-label"]}>{tc.labels.asunto}</label>
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
                      <label className={s["form-label"]}>{tc.labels.mensaje}</label>
                      <textarea
                        className={s["form-textarea"]}
                        placeholder={tc.placeholders.mensaje}
                        value={form.mensaje}
                        onChange={update("mensaje")}
                        required
                      />
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
          </div>
        </div>
      </section>
    </>
  );
}
