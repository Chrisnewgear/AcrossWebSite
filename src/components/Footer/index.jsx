import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../Icon";
import { useI18n } from "../../i18n/LanguageContext";
import logo from "../../assets/logo-silver.svg";
import s from "./styles.module.scss";

// `i` indexes into t.footer.services — the same six services as the Servicios
// page, but listed in process order here, so the two orders differ on purpose.
// Every one lands on the service card grid rather than the top of the page.
const SERVICES_GRID = "/servicios#nuestros-servicios";
const SERVICE_LINKS = [
  { i: 0, to: SERVICES_GRID }, // Sourcing de Proveedores
  { i: 1, to: SERVICES_GRID }, // Negociación y Compras
  { i: 2, to: SERVICES_GRID }, // Inspección y Control de Calidad
  { i: 3, to: SERVICES_GRID }, // Logística Internacional
  { i: 4, to: SERVICES_GRID }, // Gestión Aduanera
  { i: 5, to: SERVICES_GRID }, // Consultoría en Comercio Exterior
];

// Index-aligned with t.footer.company — all resolve to live routes.
// A `#hash` target scrolls to that section on the home page.
// Keep this array the same length as t.footer.company in EVERY language:
// a label with no matching entry here silently links to the wrong page.
const COMPANY_LINKS = ["/", "/#mision-vision", "/contacto"];

// Only Instagram is active for now. Re-enable the others when accounts exist.
const SOCIALS = [
  // { icon: "x", href: "#", label: "Twitter/X" },
  // { icon: "linkedin", href: "#", label: "LinkedIn" },
  // { icon: "youtube", href: "#", label: "YouTube" },
  {
    icon: "instagram",
    href: "https://www.instagram.com/acrosscontinentstrading.ec?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    label: "Instagram",
  },
];

export default function Footer() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Navigate to a "path#section" target and smooth-scroll to it. Already on that
  // page, just scroll; otherwise route there first, then scroll once mounted —
  // the delay also outlasts MainLayout's scroll-to-top on route change, which
  // would otherwise land the visitor at the top of the page instead.
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
              <img
                src={logo}
                alt="Across Continents Trading"
                className={s["logo-img"]}
              />
            </Link>
            <p className={s["brand-desc"]}>{t.footer.brandDesc}</p>
            <div className={s.socials}>
              {SOCIALS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s["social-link"]}
                  aria-label={label}
                >
                  <Icon name={icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Servicios */}
          <div className={s.col}>
            <div className={s["col-title"]}>{t.footer.servicesTitle}</div>
            <div className={s["col-links"]}>
              {SERVICE_LINKS.map(({ i, to }) => (
                <Link
                  key={i}
                  to={to}
                  className={s["col-link"]}
                  onClick={(e) => handleHashNav(e, to)}
                >
                  {t.footer.services[i]}
                </Link>
              ))}
            </div>
          </div>

          {/* La Empresa */}
          <div className={s.col}>
            <div className={s["col-title"]}>{t.footer.companyTitle}</div>
            <div className={s["col-links"]}>
              {t.footer.company.map((label, i) => {
                const to = COMPANY_LINKS[i];
                return (
                  <Link
                    key={label}
                    to={to}
                    className={s["col-link"]}
                    onClick={
                      to.includes("#") ? (e) => handleHashNav(e, to) : undefined
                    }
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contacto */}
          <div className={s["col-contact"]}>
            <div className={s["col-title"]}>{t.footer.contactTitle}</div>
            <div className={s["contact-list"]}>
              <p className={s["contact-line"]}>{t.footer.address}</p>
              <p className={s["contact-line"]}>
                <a href="mailto:info@acrosscon.com">info@acrosscon.com</a>
              </p>
              {/* <p className={s["contact-line"]}>www.acrosscon.com</p> */}
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
