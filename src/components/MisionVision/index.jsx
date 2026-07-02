import Icon from '../Icon';
import { useI18n } from '../../i18n/LanguageContext';
import s from './styles.module.scss';

const PILLARS = [
  { key: 'mision', icon: 'target' },
  { key: 'vision', icon: 'compass' },
];

export default function MisionVision() {
  const { t } = useI18n();

  return (
    <section className={s.section}>
      {/* Full-bleed banner — the section's defining header */}
      <div className={s.banner}>
        <span className={s.banner__text}>{t.misionVision.banner}</span>
      </div>

      <div className={s.inner}>
        <div className={s.grid}>
          {PILLARS.map(({ key, icon }, i) => (
            <article
              key={key}
              className={`${s.pillar} ${s[`pillar--${key}`]}`}
              data-reveal={i === 0 ? 'left' : 'right'}
            >
              <div className={s.pillar__icon}><Icon name={icon} size={30} /></div>
              <h3 className={s.pillar__title}>{t.misionVision[key].title}</h3>
              <span className={s.pillar__rule} />
              <p className={s.pillar__text}>{t.misionVision[key].text}</p>
              <span className={s.pillar__watermark} aria-hidden="true">
                <Icon name={icon} size={240} strokeWidth={1} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
