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

  return (
    <section className={`${s.hero} ${image ? s["hero--image"] : ""}`}>
      <div className={s.decor} aria-hidden="true">
        {image && (
          <>
            <div
              className={s.media}
              data-parallax="0.07"
              style={{ backgroundImage: `url(${image})` }}
            />
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
