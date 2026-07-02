import { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../../components/PageHero";
import Icon from "../../components/Icon";
import s from "./styles.module.scss";

const SERVICES = [
  { icon: "ship", name: "Marítimo" },
  { icon: "truck", name: "Terrestre" },
  { icon: "search", name: "Inspección" },
  { icon: "plane", name: "Aéreo" },
  { icon: "factory", name: "Sourcing" },
  { icon: "handshake", name: "Trading" },
];

const STEPS_INFO = [
  {
    n: "01",
    title: "Complete el formulario",
    desc: "Indique tipo de servicio, origen, destino y datos de contacto.",
  },
  {
    n: "02",
    title: "Análisis en 24h",
    desc: "Nuestro equipo revisa su solicitud y prepara una propuesta.",
  },
  {
    n: "03",
    title: "Propuesta personalizada",
    desc: "Recibe cotización con opciones de pago adaptadas a su operación.",
  },
  {
    n: "04",
    title: "Inicio de operación",
    desc: "Aprueba y comenzamos a trabajar en su importación o exportación.",
  },
];

const INITIAL = {
  service: "",
  origen: "",
  destino: "",
  incoterm: "",
  peso: "",
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

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));
  const setService = (name) => setForm((f) => ({ ...f, service: name }));

  const canNext1 = form.service && form.origen && form.destino;
  const canNext2 = form.nombre && form.email;

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
        breadcrumb="Cotización"
        label="Solicitud de cotización"
        title="Cotice su Operación Internacional"
        subtitle="Propuestas de pago personalizadas adaptadas a su situación financiera y volumen de operación."
        image="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80"
      />

      <section className={s.section}>
        <div className={s.inner}>
          <div className={s["header-bar"]}>Cotización</div>

          <div className={s.panel}>
            {/* Left — ¿Cómo funciona? */}
            <aside className={s.how} data-reveal="left">
              <h2 className={s["how-title"]}>¿Cómo funciona?</h2>
              <p className={s["how-sub"]}>
                Reciba una cotización detallada en menos de 24 horas hábiles con
                el mejor precio del mercado.
              </p>

              <div className={s["steps-list"]}>
                {STEPS_INFO.map(({ n, title, desc }) => (
                  <div key={n} className={s["step-card"]}>
                    <span className={s["step-num"]}>{n}</span>
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
                  <h3 className={s["success-title"]}>¡Cotización Enviada!</h3>
                  <p className={s["success-sub"]}>
                    Hemos recibido su solicitud. Nuestro equipo la revisará y le
                    enviará una propuesta personalizada en menos de 24 horas
                    hábiles.
                  </p>
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
                      Volver al Inicio
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className={s["form-header"]}>
                    <h2 className={s["form-title"]}>Solicitar Cotización</h2>
                    <p className={s["form-subtitle"]}>
                      Paso {step} de {TOTAL_STEPS}
                    </p>
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
                    {/* Step 1 — Service + Route */}
                    {step === 1 && (
                      <>
                        <div className={s["tiles-panel"]}>
                          <div className={s["service-grid"]}>
                            {SERVICES.map(({ icon, name }) => (
                              <div key={name} className={s["service-option"]}>
                                <input
                                  type="radio"
                                  id={`svc-${name}`}
                                  name="service"
                                  value={name}
                                  checked={form.service === name}
                                  onChange={() => setService(name)}
                                />
                                <label htmlFor={`svc-${name}`}>
                                  <span className={s["service-option-icon"]}>
                                    <Icon name={icon} size={22} />
                                  </span>
                                  <span className={s["service-option-name"]}>
                                    {name}
                                  </span>
                                </label>
                              </div>
                            ))}
                          </div>
                          <div className={s["tiles-heading"]}>
                            Tipo de Servicio y Ruta
                          </div>
                        </div>

                        <div className={s["form-grid"]}>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>
                              Ciudad / Puerto de Origen *
                            </label>
                            <input
                              className={s["form-input"]}
                              placeholder="Ej: Shanghai, China"
                              value={form.origen}
                              onChange={update("origen")}
                              required
                            />
                          </div>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>
                              País de Destino *
                            </label>
                            <input
                              className={s["form-input"]}
                              placeholder="Ej: Ecuador"
                              value={form.destino}
                              onChange={update("destino")}
                              required
                            />
                          </div>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>Incoterm</label>
                            <select
                              className={s["form-select"]}
                              value={form.incoterm}
                              onChange={update("incoterm")}
                            >
                              <option value="" disabled>
                                Seleccionar...
                              </option>
                              {["EXW", "FOB", "CIF", "CFR", "DDP", "FCA"].map(
                                (t) => (
                                  <option key={t}>{t}</option>
                                ),
                              )}
                            </select>
                          </div>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>
                              Peso estimado (kg)
                            </label>
                            <input
                              className={s["form-input"]}
                              type="number"
                              placeholder="Ej: 5000"
                              value={form.peso}
                              onChange={update("peso")}
                            />
                          </div>
                        </div>

                        <div className={s["form-group"]}>
                          <label className={s["form-label"]}>
                            Descripción del Producto *
                          </label>
                          <textarea
                            className={s["form-textarea"]}
                            placeholder="Describa brevemente la mercancía, HS code si lo conoce, y cualquier consideración especial (peligrosa, refrigerada, frágil, etc.)"
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
                            Continuar <Icon name="arrowRight" size={16} />
                          </button>
                        </div>
                      </>
                    )}

                    {/* Step 2 — Contact info */}
                    {step === 2 && (
                      <>
                        <h3 className={s["section-heading"]}>
                          Datos de Contacto
                        </h3>
                        <div className={s["form-grid"]}>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>
                              Nombres y Apellidos *
                            </label>
                            <input
                              className={s["form-input"]}
                              placeholder="Juan García"
                              value={form.nombre}
                              onChange={update("nombre")}
                              required
                            />
                          </div>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>Empresa</label>
                            <input
                              className={s["form-input"]}
                              placeholder="Mi Empresa S.A."
                              value={form.empresa}
                              onChange={update("empresa")}
                            />
                          </div>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>
                              Correo Electrónico *
                            </label>
                            <input
                              className={s["form-input"]}
                              type="email"
                              placeholder="su@empresa.com"
                              value={form.email}
                              onChange={update("email")}
                              required
                            />
                          </div>
                          <div className={s["form-group"]}>
                            <label className={s["form-label"]}>
                              Teléfono / WhatsApp
                            </label>
                            <input
                              className={s["form-input"]}
                              type="tel"
                              placeholder="+593 99 000 0000"
                              value={form.telefono}
                              onChange={update("telefono")}
                            />
                          </div>
                        </div>
                        <div className={s["form-group"]}>
                          <label className={s["form-label"]}>
                            Comentarios adicionales
                          </label>
                          <textarea
                            className={s["form-textarea"]}
                            placeholder="¿Tiene alguna fecha límite, consideración especial o pregunta?"
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
                            <Icon name="arrowLeft" size={16} /> Atrás
                          </button>
                          <button
                            type="button"
                            className={s["btn-next"]}
                            disabled={!canNext2}
                            onClick={() => setStep(3)}
                          >
                            Revisar <Icon name="arrowRight" size={16} />
                          </button>
                        </div>
                      </>
                    )}

                    {/* Step 3 — Review + submit */}
                    {step === 3 && (
                      <>
                        <h3 className={s["section-heading"]}>
                          Confirmar Solicitud
                        </h3>
                        <div className={s.review}>
                          {[
                            ["Servicio", form.service || "—"],
                            ["Ruta", `${form.origen} → ${form.destino}`],
                            ["Incoterm", form.incoterm || "—"],
                            [
                              "Peso estimado",
                              form.peso ? `${form.peso} kg` : "—",
                            ],
                            ["Contacto", `${form.nombre} — ${form.email}`],
                            ["Empresa", form.empresa || "—"],
                          ].map(([k, v]) => (
                            <div key={k} className={s["review-row"]}>
                              <span className={s["review-key"]}>{k}</span>
                              <span className={s["review-value"]}>{v}</span>
                            </div>
                          ))}
                        </div>
                        <div className={s["form-actions"]}>
                          <button
                            type="button"
                            className={s["btn-prev"]}
                            onClick={() => setStep(2)}
                          >
                            <Icon name="arrowLeft" size={16} /> Atrás
                          </button>
                          <button
                            type="submit"
                            className={s["btn-next"]}
                            disabled={loading}
                          >
                            {loading ? (
                              "Enviando..."
                            ) : (
                              <>
                                <Icon name="check" size={16} /> Enviar Cotización
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
