import { useI18n } from "../../i18n/LanguageContext";
import s from "./styles.module.scss";
import image1 from "../../assets/images/Imagen1.png";
import image2 from "../../assets/images/Imagen2.png";
import image3 from "../../assets/images/Imagen3.png";
import image4 from "../../assets/images/Imagen4.png";

const advantageImages = [image1, image2, image3, image4];

export default function Ventajas() {
  const { t } = useI18n();

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.header} data-reveal="up">
          <h2 className={s.title}>{t.ventajas.title}</h2>
          <p className={s.intro}>{t.ventajas.intro}</p>
        </div>

        <div className={s.advantages}>
          {t.ventajas.advantages.map(({ title, desc }, i) => (
            <article
              key={title}
              className={s.advantage}
              data-reveal="up"
            >
              <img
                className={s.image}
                src={advantageImages[i]}
                alt=""
                width={1448}
                height={1086}
                loading="lazy"
                decoding="async"
              />
              <div className={s.content}>
                <h3 className={s["advantage-title"]}>{title}</h3>
                <p className={s["advantage-desc"]}>{desc}</p>
              </div>
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
