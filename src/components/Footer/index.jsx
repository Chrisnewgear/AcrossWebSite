import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../Icon";
import { useI18n } from "../../i18n/LanguageContext";
import logo from "../../assets/logo.png";
import s from "./styles.module.scss";

// `i` indexes into t.footer.services. Commented entries are temporarily
// disabled — re-enable when their page/section exists.
const SERVICE_LINKS = [
  { i: 0, to: "/servicios" }, // Transporte Marítimo
  { i: 1, to: "/servicios" }, // Transporte Aéreo
  { i: 2, to: "/servicios" }, // Transporte Terrestre
  // { i: 3, to: "/rastreo" },   // Rastreo de Envíos
  // { i: 4, to: "/servicios" }, // Verificación Proveedores
  // { i: 5, to: "/servicios" }, // Inspección de Calidad
];

// Index-aligned with t.footer.company — all resolve to live routes.
// A `#hash` target scrolls to that section on the home page.
const COMPANY_LINKS = ["/", "/#mision-vision", "/#presencia-internacional", "/cotizacion", "/contacto"];

const SOCIALS = [
  { icon: "x", href: "#", label: "Twitter/X" },
  { icon: "linkedin", href: "#", label: "LinkedIn" },
  { icon: "youtube", href: "#", label: "YouTube" },
  { icon: "instagram", href: "#", label: "Instagram" },
];

export default function Footer() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Navigate to a "/#section" target and smooth-scroll to it. If already on the
  // home page, just scroll; otherwise route home first, then scroll once mounted.
  function handleHashNav(e, to) {
    const [path, id] = to.split("#");
    e.preventDefault();
    const scrollToSection = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (pathname === (path || "/")) {
      scrollToSection();
    } else {
      navigate(path || "/");
      setTimeout(scrollToSection, 120);
    }
  }

  return (
    <footer className={s.footer}>
      <div className={s.inner}>
        <div className={s.top}>
          {/* Brand */}
          <div className={s.brand}>
            <Link to="/" className={s.logo}>
              <img src={logo} alt="Across Continents Trading" className={s["logo-img"]} />
            </Link>
            <p className={s["brand-desc"]}>{t.footer.brandDesc}</p>
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
            <div className={s["col-title"]}>{t.footer.servicesTitle}</div>
            <div className={s["col-links"]}>
              {SERVICE_LINKS.map(({ i, to }) => (
                <Link key={i} to={to} className={s["col-link"]}>
                  {t.footer.services[i]}
                </Link>
              ))}
            </div>
          </div>

          {/* La Empresa */}
          <div>
            <div className={s["col-title"]}>{t.footer.companyTitle}</div>
            <div className={s["col-links"]}>
              {t.footer.company.map((label, i) => {
                const to = COMPANY_LINKS[i];
                return (
                  <Link
                    key={label}
                    to={to}
                    className={s["col-link"]}
                    onClick={to.includes("#") ? (e) => handleHashNav(e, to) : undefined}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <div className={s["col-title"]}>{t.footer.contactTitle}</div>
            <div className={s["contact-list"]}>
              <p className={s["contact-line"]}>{t.footer.address}</p>
              <p className={s["contact-line"]}>
                <a href="tel:+593998432427">+593 99 843 2427</a>
              </p>
              <p className={s["contact-line"]}>
                <a href="mailto:info@acrosscon.com">info@acrosscon.com</a>
              </p>
              <p className={s["contact-line"]}>www.acrosscon.com</p>
            </div>
          </div>
        </div>

        <div className={s.bottom}>
          <span className={s.copyright}>{t.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
