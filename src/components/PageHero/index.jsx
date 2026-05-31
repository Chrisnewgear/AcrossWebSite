import { Link } from "react-router-dom";
import s from "./styles.module.scss";

export default function PageHero({
  label,
  title,
  subtitle,
  actions,
  breadcrumb,
}) {
  return (
    <section className={s.hero}>
      <div className={s.inner}>
        {breadcrumb && (
          <nav className={s.breadcrumb} aria-label="Miga de pan">
            <Link to="/">Inicio</Link>
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
