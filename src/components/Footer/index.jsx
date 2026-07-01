import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import s from "./styles.module.scss";

const SERVICES = [
  { label: "Transporte Marítimo", to: "/servicios" },
  { label: "Transporte Aéreo", to: "/servicios" },
  { label: "Transporte Terrestre", to: "/servicios" },
  { label: "Rastreo de Envíos", to: "/rastreo" },
  { label: "Verificación Proveedores", to: "/servicios" },
  { label: "Inspección de Calidad", to: "/servicios" },
];

const COMPANY = [
  { label: "Nosotros", to: "/" },
  { label: "Misión y Visión", to: "/" },
  { label: "Presencia Global", to: "/" },
  { label: "Cotización", to: "/cotizacion" },
  { label: "Contacto", to: "/contacto" },
];

const SOCIALS = [
  { icon: "x", href: "#", label: "Twitter/X" },
  { icon: "linkedin", href: "#", label: "LinkedIn" },
  { icon: "youtube", href: "#", label: "YouTube" },
  { icon: "instagram", href: "#", label: "Instagram" },
];

export default function Footer() {
  const [lang, setLang] = useState("es");

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.top}>
          {/* Brand */}
          <div className={s.brand}>
            <Link to="/" className={s.logo}>
              <div className={s["logo-icon"]}><Icon name="globe" size={26} strokeWidth={1.8} /></div>
              <div className={s["logo-text"]}>
                <span className={s["logo-name"]}>Across Continents Trading</span>
                <span className={s["logo-tagline"]}>name it &amp; you get it</span>
              </div>
            </Link>
            <p className={s["brand-desc"]}>
              Su socio confiable en trading e intermediación internacional.
              Conectamos mercados desde Asia y Europa hasta su destino.
            </p>
            <div className={s.socials}>
              {SOCIALS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className={s["social-link"]}
                  aria-label={label}
                >
                  <Icon name={icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div>
            <div className={s["col-title"]}>Servicios</div>
            <div className={s["col-links"]}>
              {SERVICES.map(({ label, to }) => (
                <Link key={label} to={to} className={s["col-link"]}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* La Empresa */}
          <div>
            <div className={s["col-title"]}>La Empresa</div>
            <div className={s["col-links"]}>
              {COMPANY.map(({ label, to }) => (
                <Link key={label} to={to} className={s["col-link"]}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <div className={s["col-title"]}>Contacto</div>
            <div className={s["contact-list"]}>
              <p className={s["contact-line"]}>
                Av. del Bombero, La Vista de San Eduardo, Edificio 100A Of. 502,
                Guayaquil, Ecuador
              </p>
              <p className={s["contact-line"]}>
                <a href="tel:+593998432427">+593 99 843 2427</a>
              </p>
              <p className={s["contact-line"]}>
                <a href="mailto:info@acrosscon.com">info@acrosscon.com</a>
              </p>
              <p className={s["contact-line"]}>www.acrosscon.com</p>
            </div>
            <div
              className={s["lang-toggle"]}
              data-active={lang}
              role="group"
              aria-label="Idioma"
            >
              <span className={s["lang-thumb"]} aria-hidden="true" />
              <button
                type="button"
                className={s["lang-option"]}
                onClick={() => setLang("es")}
                aria-pressed={lang === "es"}
              >
                ES
              </button>
              <button
                type="button"
                className={s["lang-option"]}
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        <div className={s.bottom}>
          <span className={s.copyright}>
            © 2026 Across Continents Trading. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  );
}
