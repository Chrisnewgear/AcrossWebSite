import { useState } from "react";
import PageHero from "../../components/PageHero";
import Icon from "../../components/Icon";
import s from "./styles.module.scss";

const SUBJECTS = [
  "Cotización de flete",
  "Inspección de calidad",
  "Sourcing de proveedores",
  "Seguimiento de envío",
  "Trading / Intermediación",
  "Otro",
];

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
        breadcrumb="Contacto"
        label="Hablemos de su operación"
        title="Contáctenos"
        subtitle="Nuestro equipo de especialistas está listo para asesorarle en cada etapa de su operación internacional."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
      />

      <section className={s.section}>
        <div className={s.inner}>
          <div className={s["header-bar"]}>Contacto</div>

          <div className={s.panel}>
            <div className={s["form-card"]} data-reveal="up">
              {submitted ? (
                <div className={s.success}>
                  <span className={s["success-icon"]}>
                    <Icon name="checkCircle" size={52} />
                  </span>
                  <h3 className={s["success-title"]}>¡Mensaje Enviado!</h3>
                  <p className={s["success-sub"]}>
                    Hemos recibido su mensaje. Un especialista se pondrá en
                    contacto con usted en menos de 24 horas hábiles.
                  </p>
                </div>
              ) : (
                <>
                  <div className={s["form-header"]}>
                    <h2 className={s["form-title"]}>Envíenos un mensaje</h2>
                    <p className={s["form-sub"]}>
                      Le respondemos en menos de 24 horas hábiles.
                    </p>
                  </div>

                  <form className={s.form} onSubmit={handleSubmit}>
                    <div className={s["form-grid"]}>
                      <div className={s["form-group"]}>
                        <label className={s["form-label"]}>
                          Nombres y Apellidos *
                        </label>
                        <input
                          className={s["form-input"]}
                          placeholder="Ej: Juan García"
                          value={form.nombre}
                          onChange={update("nombre")}
                          required
                        />
                      </div>
                      <div className={s["form-group"]}>
                        <label className={s["form-label"]}>Empresa</label>
                        <input
                          className={s["form-input"]}
                          placeholder="Empresa S.A."
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
                          placeholder="0987654321"
                          value={form.telefono}
                          onChange={update("telefono")}
                        />
                      </div>
                    </div>

                    <div className={s["form-group"]}>
                      <label className={s["form-label"]}>Asunto *</label>
                      <select
                        className={s["form-select"]}
                        value={form.asunto}
                        onChange={update("asunto")}
                        required
                      >
                        <option value="" disabled>
                          Seleccionar motivo...
                        </option>
                        {SUBJECTS.map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                      {form.asunto === "Otro" && (
                        <input
                          className={s["form-input"]}
                          placeholder="Especifique el motivo de su consulta"
                          value={form.asuntoOtro}
                          onChange={update("asuntoOtro")}
                          required
                        />
                      )}
                    </div>

                    <div className={s["form-group"]}>
                      <label className={s["form-label"]}>Mensaje *</label>
                      <textarea
                        className={s["form-textarea"]}
                        placeholder="Cuéntenos sobre su operación: producto, origen, destino, volumen y cualquier consulta específica..."
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
                      {loading ? "Enviando..." : "Enviar Mensaje"}
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
