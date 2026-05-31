import { useState } from "react";
import PageHero from "../../components/PageHero";
import Icon from "../../components/Icon";
import s from "./styles.module.scss";

const OFFICES = [
  {
    flag: "🇨🇳",
    city: "Shanghai",
    role: "Oficina Principal — Asia",
    address: "No. 1000 Lujiazui Ring Rd, Pudong New Area",
    phone: "+86 21 5888 0000",
    hours: "Lun–Vie 09:00–18:00 (CST)",
  },
  {
    flag: "🇪🇨",
    city: "Guayaquil",
    role: "Oficina Regional — Ecuador",
    address: "Av. del Bombero, Edificio 100A Of. 502",
    phone: "+593 99 843 2427",
    hours: "Lun–Sáb 08:00–18:00 (GMT-5)",
  },
  {
    flag: "🇺🇸",
    city: "Plantation, FL",
    role: "Representación — Norteamérica",
    address: "1800 N Pine Island Rd, Suite 210",
    phone: "+1 954 000 0000",
    hours: "Lun–Vie 09:00–17:00 (EST)",
  },
  {
    flag: "🇮🇳",
    city: "Mumbai",
    role: "Representación — Sur de Asia",
    address: "Bandra Kurla Complex, BKC, Mumbai 400051",
    phone: "+91 22 0000 0000",
    hours: "Lun–Vie 09:00–18:00 (IST)",
  },
];

const CHANNELS = [
  {
    icon: "smartphone",
    label: "WhatsApp",
    value: "+593 99 843 2427",
    href: "https://wa.me/593998432427",
    cta: "Iniciar chat",
  },
  {
    icon: "mail",
    label: "Correo",
    value: "info@acrosscon.com",
    href: "mailto:info@acrosscon.com",
    cta: "Enviar email",
  },
  {
    icon: "phone",
    label: "Teléfono",
    value: "+593 99 843 2427",
    href: "tel:+593998432427",
    cta: "Llamar ahora",
  },
];

const INITIAL = {
  nombre: "",
  empresa: "",
  email: "",
  telefono: "",
  asunto: "",
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
      />

      {/* Main contact zone */}
      <section className={s.section}>
        <div className={s.inner}>
          <div className={s.layout}>
            {/* Left — form */}
            <div className={s["form-card"]}>
              {submitted ? (
                <div className={s.success}>
                  <span className={s["success-icon"]}><Icon name="checkCircle" size={52} /></span>
                  <h3 className={s["success-title"]}>¡Mensaje Enviado!</h3>
                  <p className={s["success-sub"]}>
                    Hemos recibido su mensaje. Un especialista se pondrá en
                    contacto con usted en menos de 24 horas hábiles.
                  </p>
                  <a
                    href="https://wa.me/593998432427"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-green"
                  >
                    WhatsApp Directo
                  </a>
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
                        {[
                          "Cotización de flete",
                          "Inspección de calidad",
                          "Sourcing de proveedores",
                          "Seguimiento de envío",
                          "Trading / Intermediación",
                          "Otro",
                        ].map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
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
                      {loading ? "Enviando..." : <><Icon name="arrowRight" size={16} /> Enviar Mensaje</>}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Right — info */}
            <aside className={s.sidebar}>
              <div className={s["channels-block"]}>
                <div className={s["block-label"]}>Canales de Atención</div>
                <div className={s.channels}>
                  {CHANNELS.map(({ icon, label, value, href, cta }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={s.channel}
                    >
                      <span className={s["channel-icon"]}><Icon name={icon} size={22} /></span>
                      <div className={s["channel-info"]}>
                        <div className={s["channel-label"]}>{label}</div>
                        <div className={s["channel-value"]}>{value}</div>
                      </div>
                      <span className={s["channel-cta"]}>{cta} <Icon name="arrowRight" size={14} /></span>
                    </a>
                  ))}
                </div>
              </div>

              <div className={s["hours-block"]}>
                <div className={s["block-label"]}>Horario de Atención</div>
                <div className={s["hours-grid"]}>
                  <div className={s["hours-row"]}>
                    <span>Lunes – Viernes</span>
                    <strong>08:00 – 18:00</strong>
                  </div>
                  <div className={s["hours-row"]}>
                    <span>Sábado</span>
                    <strong>08:00 – 13:00</strong>
                  </div>
                  <div className={s["hours-row"]}>
                    <span>Domingo</span>
                    <strong className={s.closed}>Cerrado</strong>
                  </div>
                </div>
                <p className={s["hours-note"]}>
                  Zona horaria GMT-5 (Ecuador). Operaciones Asia disponibles por
                  WhatsApp fuera de horario.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Global offices */}
      <section className={s.offices}>
        <div className={s.inner}>
          <div className={s["section-label"]}>Presencia Global</div>
          <h2 className={s["section-title"]}>Nuestras Oficinas</h2>
          <p className={s["section-sub"]}>
            Con presencia en cuatro países, coordinamos operaciones en los
            principales hubs comerciales del mundo.
          </p>
          <div className={s["offices-grid"]}>
            {OFFICES.map(({ flag, city, role, address, phone, hours }) => (
              <div key={city} className={s["office-card"]}>
                <div className={s["office-flag"]}>{flag}</div>
                <div className={s["office-city"]}>{city}</div>
                <div className={s["office-role"]}>{role}</div>
                <div className={s["office-details"]}>
                  <div className={s["office-detail"]}>
                    <span><Icon name="mapPin" size={16} /></span>
                    {address}
                  </div>
                  <div className={s["office-detail"]}>
                    <span><Icon name="phone" size={16} /></span>
                    {phone}
                  </div>
                  <div className={s["office-detail"]}>
                    <span><Icon name="clock" size={16} /></span>
                    {hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
