import { useRef } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../i18n/LanguageContext";
import s from "./styles.module.scss";

export default function PageHero({
  label,
  title,
  subtitle,
  actions,
  breadcrumb,
  image,
}) {
  const { t } = useI18n();
  const heroRef = useRef(null);

  // Subtle hover parallax on the background photo: write the normalised
  // cursor offset (-0.5..0.5) to CSS vars — direct DOM writes, no state, no
  // re-renders (same pattern as Hero/PresenciaGlobal). `.mediaImg` reads them
  // via a smoothed transition, nested inside `.media` so it never fights that
  // layer's own scroll-driven transform (applied via [data-parallax]).
  const handlePointerMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const handlePointerLeave = () => {
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  };

  return (
    <section
      className={`${s.hero} ${image ? s["hero--image"] : ""}`}
      ref={heroRef}
      onPointerMove={image ? handlePointerMove : undefined}
      onPointerLeave={image ? handlePointerLeave : undefined}
    >
      <div className={s.decor} aria-hidden="true">
        {image && (
          <>
            <div className={s.media} data-parallax="0.07">
              <div
                className={s.mediaImg}
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
            <div className={s.scrim} />
          </>
        )}
        <span className={s.blobA} data-parallax="0.16" />
        <span className={s.blobB} data-parallax="-0.12" />
        <span className={s.grid} data-parallax="0.05" />
      </div>

      <div className={s.inner}>
        {breadcrumb && (
          <nav className={s.breadcrumb} aria-label="Miga de pan">
            <Link to="/">{t.common.home}</Link>
            <span>/</span>
            <span>{breadcrumb}</span>
          </nav>
        )}
        {label && <div className={s.label}>{label}</div>}
        <h1 className={s.title}>{title}</h1>
        {subtitle && <p className={s.subtitle}>{subtitle}</p>}
        {actions && <div className={s.actions}>{actions}</div>}
      </div>
    </section>
  );
}
