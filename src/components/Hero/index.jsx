import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/LanguageContext';
import s from './styles.module.scss';

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <section id="inicio" className={s.hero}>
      {/* ── Background: solid navy on the left blending into a port photo ── */}
      <div className={s.hero__bg} aria-hidden="true">
        <div className={s.hero__bgImage} />
        <div className={s.hero__bgOverlay} />
        <div className={s.hero__bgWarm} />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className={s.hero__content}>
        <span className={s.hero__eyebrow}>{t.hero.eyebrow}</span>

        <h1 className={s.hero__headline}>
          <span className={s.line}>{t.hero.line1}</span>
          <span className={s.line}>{t.hero.line2}</span>
        </h1>

        <p className={s.hero__tagline}>{t.hero.tagline}</p>

        <p className={s.hero__sub}>{t.hero.sub}</p>

        <div className={s.hero__ctas}>
          <button className="btn-green" onClick={() => navigate('/cotizacion')}>
            {t.hero.ctaQuote}
          </button>
          <button className={s.hero__ghost} onClick={() => navigate('/servicios')}>
            {t.hero.ctaServices}
          </button>
        </div>
      </div>

      {/* ── Trust badges, pinned over the lower edge of the photo ───────── */}
      <div className={s.hero__badges}>
        <div className={s.hero__badgePill}>
          {t.hero.badges.map((badge) => (
            <span key={badge} className={s.hero__badge}>{badge}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
