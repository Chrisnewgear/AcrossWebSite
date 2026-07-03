import { useI18n } from "../../i18n/LanguageContext";
import s from "./styles.module.scss";

export default function Ventajas() {
  const { t } = useI18n();

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.header} data-reveal="up">
          <h2 className={s.title}>{t.ventajas.title}</h2>
        </div>

        <div className={s.grid}>
          {t.ventajas.advantages.map(({ title, desc }, i) => (
            <article
              key={title}
              className={s.card}
              data-reveal="up"
              data-reveal-delay={(i % 2) * 120}
            >
              <h3 className={s["card-title"]}>{title}</h3>
              <p className={s["card-desc"]}>{desc}</p>
              <span className={s["card-number"]} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>

        {/* <div className={s.commissions}>
          {t.ventajas.commissions.map(({ rate, type, label }, i) => (
            <div
              key={type}
              className={s["commission-item"]}
              data-reveal="scale"
              data-reveal-delay={i * 110}
            >
              <div className={s["commission-rate"]}>{rate}</div>
              <div className={s["commission-type"]}>{type}</div>
              <div className={s["commission-label"]}>{label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}
