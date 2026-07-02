import { Link } from "react-router-dom";
import Icon from "../Icon";
import { useI18n } from "../../i18n/LanguageContext";
import logo from "../../assets/logo.png";
import s from "./styles.module.scss";

// Routes are index-aligned with t.footer.services / t.footer.company
const SERVICE_LINKS = ["/servicios", "/servicios", "/servicios", "/rastreo", "/servicios", "/servicios"];
const COMPANY_LINKS = ["/", "/", "/", "/cotizacion", "/contacto"];

const SOCIALS = [
  { icon: "x", href: "#", label: "Twitter/X" },
  { icon: "linkedin", href: "#", label: "LinkedIn" },
  { icon: "youtube", href: "#", label: "YouTube" },
  { icon: "instagram", href: "#", label: "Instagram" },
];

export default function Footer() {
  const { t } = useI18n();

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
              {t.footer.services.map((label, i) => (
                <Link key={label} to={SERVICE_LINKS[i]} className={s["col-link"]}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* La Empresa */}
          <div>
            <div className={s["col-title"]}>{t.footer.companyTitle}</div>
            <div className={s["col-links"]}>
              {t.footer.company.map((label, i) => (
                <Link key={label} to={COMPANY_LINKS[i]} className={s["col-link"]}>
                  {label}
                </Link>
              ))}
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
