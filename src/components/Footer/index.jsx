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
  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.top}>
          {/* Brand */}
          <div className={s.brand}>
            <Link to="/" className={s.logo}>
              <div className={s["logo-icon"]}><Icon name="globe" size={26} strokeWidth={1.8} /></div>
              <div className={s["logo-text"]}>
                <span className={s["logo-name"]}>Across Continents</span>
                <span className={s["logo-tagline"]}>Come on, you get it</span>
              </div>
            </Link>
            <p className={s["brand-desc"]}>
              Su socio confiable en trading e intermediación internacional.
              Conectamos mercados desde Asia y Europa hasta su destino.
            </p>
            <span className={s.flag} title="Ecuador">
              🇪🇨
            </span>
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <div className={s["contact-item"]}>
                <span><Icon name="mapPin" size={18} /></span>
                <span>
                  Av. del Bombero, La Vista de San Eduardo, Edificio 100A Of.
                  502, Guayaquil, Ecuador
                </span>
              </div>
              <div className={s["contact-item"]}>
                <span><Icon name="phone" size={18} /></span>
                <a href="tel:+593998432427" style={{ color: "inherit" }}>
                  +593 99 843 2427
                </a>
              </div>
              <div className={s["contact-item"]}>
                <span><Icon name="mail" size={18} /></span>
                <a
                  href="mailto:info@acrosscon.com"
                  style={{ color: "inherit" }}
                >
                  info@acrosscon.com
                </a>
              </div>
              <div className={s["contact-item"]}>
                <span><Icon name="globe" size={18} /></span>
                <span>www.acrosscon.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className={s.bottom}>
          <span className={s.copyright}>
            © 2026 Across Continents Trading. Todos los derechos reservados.
          </span>
          <select
            className={s["lang-selector"]}
            defaultValue="es"
            aria-label="Idioma"
          >
            <option value="es">Español (ES)</option>
            <option value="en">English (EN)</option>
            <option value="zh">中文 (ZH)</option>
          </select>
        </div>
      </div>
    </footer>
  );
}
