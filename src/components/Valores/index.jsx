import Icon from '../Icon';
import { useI18n } from '../../i18n/LanguageContext';
import s from './styles.module.scss';

const ICONS = ['heartHandshake', 'users', 'messageSquare'];

export default function Valores() {
  const { t } = useI18n();

  return (
    <section className={s.section}>
      {/* Full-bleed banner — green counterpart to "Lo que nos define" */}
      <div className={s.banner}>
        <span className={s.banner__text}>{t.valores.banner}</span>
      </div>

      <div className={s.inner}>
        <div className={s.grid}>
          {t.valores.items.map(({ name, desc }, i) => (
            <article
              key={name}
              className={s.card}
              data-reveal="up"
              data-reveal-delay={i * 120}
            >
              <div className={s.card__icon}><Icon name={ICONS[i]} size={30} /></div>
              <h3 className={s.card__title}>{name}</h3>
              <span className={s.card__rule} />
              <p className={s.card__desc}>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
