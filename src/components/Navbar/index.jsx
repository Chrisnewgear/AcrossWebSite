import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Icon from "../Icon";
import { useI18n } from "../../i18n/LanguageContext";
import s from "./styles.module.scss";

const NAV_LINKS = [
  { key: "inicio", to: "/" },
  { key: "servicios", to: "/servicios" },
  { key: "rastreo", to: "/rastreo" },
  { key: "cotizacion", to: "/cotizacion" },
  { key: "contacto", to: "/contacto" },
];

// WhatsApp button disabled for now — uncomment together with the buttons below to re-enable
// const WhatsAppIcon = () => (
//   <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
//   </svg>
// );

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useI18n();
  const { pathname } = useLocation();

  // On home page use transparent bg; on inner pages always use scrolled style
  const isHome = pathname === "/";
  const solidBg = !isHome || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`${s.navbar} ${solidBg ? s["navbar--scrolled"] : s["navbar--transparent"]}`}
      >
        <div className={s.navbar__inner}>
          <Link to="/" className={s.logo}>
            <div className={s.logo__icon}>
              <Icon name="globe" size={26} strokeWidth={1.8} />
            </div>
            <div className={s.logo__text}>
              <span className={s.logo__name}>Across Continents</span>
              <span className={s.logo__tagline}>Come on, you get it</span>
            </div>
          </Link>

          <nav className={s.nav} aria-label={t.common.navMain}>
            {NAV_LINKS.map(({ key, to }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `${s.nav__link} ${isActive ? s["nav__link--active"] : ""}`
                }
              >
                {t.nav[key]}
              </NavLink>
            ))}
          </nav>

          <div className={s.actions}>
            {/* WhatsApp button disabled for now — uncomment to re-enable
            <a
              href="https://wa.me/593998432427"
              target="_blank"
              rel="noopener noreferrer"
              className={s.whatsapp}
              aria-label="Contáctanos por WhatsApp"
            >
              <WhatsAppIcon />
              <span>¡Te Ayudamos!</span>
            </a>
            */}

            <div
              className={s["lang-toggle"]}
              data-active={lang}
              role="group"
              aria-label={t.common.language}
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

            <button
              className={`${s.hamburger} ${menuOpen ? s["hamburger--open"] : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t.common.menuClose : t.common.menuOpen}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`${s["mobile-menu"]} ${menuOpen ? s["mobile-menu--open"] : ""}`}
        role="navigation"
        aria-label={t.common.menuMobile}
      >
        {NAV_LINKS.map(({ key, to }) => (
          <Link key={to} to={to} onClick={() => setMenuOpen(false)}>
            {t.nav[key]}
          </Link>
        ))}
        {/* WhatsApp button disabled for now — uncomment to re-enable
        <a
          href="https://wa.me/593998432427"
          target="_blank"
          rel="noopener noreferrer"
          className={s["whatsapp-mobile"]}
          onClick={() => setMenuOpen(false)}
        >
          <WhatsAppIcon /> ¡Te Ayudamos por WhatsApp!
        </a>
        */}
      </div>
    </>
  );
}
