import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/LanguageContext";
import s from "./styles.module.scss";

export default function Hero() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const heroRef = useRef(null);

  // Subtle hover parallax: write the normalised cursor offset (-0.5..0.5) to
  // CSS vars on the section. Direct DOM writes — no state, no re-render — the
  // background layer just reads them via a smoothed CSS transition.
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
      id="inicio"
      className={s.hero}
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* ── Background: solid navy on the left blending into a port photo ── */}
      <div className={s.hero__bg} data-parallax="0.12" aria-hidden="true">
        <div className={s.hero__bgMouse}>
          <div className={s.hero__bgImage} />
          <div className={s.hero__bgOverlay} />
          <div className={s.hero__bgWarm} />
        </div>
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
          <button className="btn-green" onClick={() => navigate("/cotizacion")}>
            {t.hero.ctaQuote}
          </button>
          <button
            className={s.hero__ghost}
            onClick={() => navigate("/servicios")}
          >
            {t.hero.ctaServices}
          </button>
        </div>
      </div>

      {/* ── Trust badges, pinned over the lower edge of the photo ───────── */}
      {/* <div className={s.hero__badges}>
        <div className={s.hero__badgePill}>
          {t.hero.badges.map((badge) => (
            <span key={badge} className={s.hero__badge}>{badge}</span>
          ))}
        </div>
      </div> */}
    </section>
  );
}
