import { useState, useRef, useEffect } from "react";
import { useI18n } from "../../i18n/LanguageContext";
import s from "./styles.module.scss";
import flagChina from "../../assets/flags/China.jpg";
import flagUSA from "../../assets/flags/USA.jpg";
import flagEcuador from "../../assets/flags/Ecuador.png";
import flagIndia from "../../assets/flags/india.png";
import flagPeru from "../../assets/flags/Peru.jpg";
import flagGreece from "../../assets/flags/Grecia.jpg";
import flagItaly from "../../assets/flags/Italia.jpg";
import flagIsrael from "../../assets/flags/Israel.jpg";
import flagChile from "../../assets/flags/Chile.jpg";
import flagBrazil from "../../assets/flags/brazil.jpg";
import cityShanghai from "../../assets/cities/shanghai.jpg";
import cityPlantation from "../../assets/cities/plantation.jpg";
import cityGuayaquil from "../../assets/cities/Guayaquil.jpg";
import cityMumbai from "../../assets/cities/mumbai.jpg";
import cityLima from "../../assets/cities/lima.jpg";
import cityAthens from "../../assets/cities/Atenas.jpg";
import cityRome from "../../assets/cities/Roma.jpg";
import cityJerusalem from "../../assets/cities/Jerusalem.jpeg";
import citySantiago from "../../assets/cities/Santiago.jpeg";
import cityBrasilia from "../../assets/cities/Brasilia.jpeg";

// Only the number of offices matters for the carousel math; the displayed
// city/country text is pulled from translations by index at render time.
const OFFICES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Index-aligned with the `offices` arrays in translations.js
const FLAGS = [
  flagChina,
  flagUSA,
  flagEcuador,
  flagIndia,
  flagPeru,
  flagGreece,
  flagItaly,
  flagIsrael,
  flagChile,
  flagBrazil,
];
const CITIES = [
  cityShanghai,
  cityPlantation,
  cityGuayaquil,
  cityMumbai,
  cityLima,
  cityAthens,
  cityRome,
  cityJerusalem,
  citySantiago,
  cityBrasilia,
];

const N = OFFICES.length;
const GAP = 20; // px — must equal `gap` value in .slides SCSS
const SPEED = 0.8; // px / frame  (~48 px/s at 60 fps)

// Render several identical copies side-by-side so the strip is wider than any
// viewport. The visible "centered" card lives in an inner copy (ANCHOR_COPY),
// guaranteeing real cards always fill BOTH edges — the wrap teleport is then
// pixel-identical (truly seamless, no blank/pop on either side).
const COPIES = 4; // total copies; left buffer = ANCHOR_COPY, rest buffers the right
const ANCHOR_COPY = 1; // which copy's card-0 sits centred at rest
const SLOTS = Array.from({ length: COPIES }, () => OFFICES).flat();

const TWEEN_MS = 600; // dot-click glide duration
const easeInOutCubic = (k) =>
  k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;

export default function PresenciaGlobal() {
  const { t } = useI18n();
  const offices = t.presenciaGlobal.offices;
  const [activeDot, setActiveDot] = useState(0);
  const [ready, setReady] = useState(false);

  const slidesRef = useRef(null);
  const wrapRef = useRef(null);
  const card0Ref = useRef(null); // ref on slot 0 — measures real card width

  // All animation state in refs — never causes re-renders, safe inside rAF
  const posRef = useRef(0); // translateX offset (normalised into one wrap window)
  const cwRef = useRef(0); // container width  (updated by ResizeObserver)
  const cardWRef = useRef(300); // card width       (updated by ResizeObserver)
  const pausedRef = useRef(false);
  const rafRef = useRef(null);
  const tweenRef = useRef(null); // { from, to, start, dur } during a dot glide

  const step = () => cardWRef.current + GAP;
  // Width of one full copy of all cards (the wrap boundary)
  const fullWidth = () => N * step();
  // Resting offset: card-0 of ANCHOR_COPY centred in the viewport
  const base = () => -ANCHOR_COPY * fullWidth();

  // translateX that places card-0 of the first copy centred in the viewport
  const centerBase = () => cwRef.current / 2 - cardWRef.current / 2;

  // Keep posRef inside the canonical window (base - fullWidth, base].
  // Left edge is always covered because ANCHOR_COPY copies sit to the left.
  const normalize = () => {
    const fw = fullWidth();
    if (fw <= 0) return;
    const b = base();
    while (posRef.current > b) posRef.current -= fw;
    while (posRef.current <= b - fw) posRef.current += fw;
  };

  // Push the computed transform to the DOM
  const applyTransform = () => {
    if (slidesRef.current)
      slidesRef.current.style.transform = `translateX(${centerBase() + posRef.current}px)`;
  };

  // Return which real card (0-N-1) has its centre closest to the viewport centre
  const getActiveDot = () => {
    const cw2 = cardWRef.current;
    const half = cwRef.current / 2;
    let best = 0,
      bestDist = Infinity;
    for (let i = 0; i < SLOTS.length; i++) {
      const cx = centerBase() + posRef.current + i * (cw2 + GAP) + cw2 / 2;
      const dist = Math.abs(cx - half);
      if (dist < bestDist) {
        bestDist = dist;
        best = i % N;
      }
    }
    return best;
  };

  // Measure container + card; re-snap on resize
  useEffect(() => {
    const wrap = wrapRef.current;
    const card = card0Ref.current;
    if (!wrap || !card) return;

    const measure = () => {
      cwRef.current = wrap.offsetWidth;
      cardWRef.current = card.offsetWidth;
      normalize(); // 0 → base on first run; re-snap after width changes
      applyTransform();
      setReady(true);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // rAF conveyor belt
  useEffect(() => {
    let lastDot = 0;

    const tick = () => {
      const tw = tweenRef.current;
      if (tw) {
        // Dot-click glide: ease posRef to target, belt paused until done.
        if (tw.start == null) tw.start = performance.now();
        const k = Math.min(1, (performance.now() - tw.start) / tw.dur);
        posRef.current = tw.from + (tw.to - tw.from) * easeInOutCubic(k);
        applyTransform();
        if (k >= 1) {
          tweenRef.current = null;
          normalize();
        }
      } else if (!pausedRef.current) {
        posRef.current -= SPEED;
        const fw = fullWidth();
        // Wrap: teleport back by one copy-width once we leave the window.
        // Visually seamless — the next copy is at the identical position.
        if (posRef.current <= base() - fw) posRef.current += fw;

        applyTransform();

        // Only call setState when the active dot actually changes (max N x/loop)
        const dot = getActiveDot();
        if (dot !== lastDot) {
          lastDot = dot;
          setActiveDot(dot);
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pointer-tracked parallax: write normalised cursor offset (-0.5..0.5) to CSS
  // vars on the hovered card. SCSS translates the flag/city layers at different
  // depths off these. Direct style writes — no state, no re-render, rAF-safe.
  const handleCardMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty(
      "--px",
      ((e.clientX - r.left) / r.width - 0.5).toFixed(3),
    );
    el.style.setProperty(
      "--py",
      ((e.clientY - r.top) / r.height - 0.5).toFixed(3),
    );
  };
  const handleCardLeave = (e) => {
    e.currentTarget.style.setProperty("--px", "0");
    e.currentTarget.style.setProperty("--py", "0");
  };

  // Dot click: glide that card to centre via the shortest path, then belt resumes
  const handleDot = (i) => {
    const fw = fullWidth();
    const cur = posRef.current;
    let to = base() - i * step();
    // Pick the nearest equivalent target (cards repeat every fullWidth) so the
    // glide travels the shortest distance instead of across the whole strip.
    while (to - cur > fw / 2) to -= fw;
    while (to - cur < -fw / 2) to += fw;
    tweenRef.current = { from: cur, to, start: null, dur: TWEEN_MS };
    setActiveDot(i);
  };

  return (
    <section
      id="presencia-internacional"
      className={s.section}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className={s.header} data-reveal="up">
        <span className={s.badge}>{t.presenciaGlobal.badge}</span>
        <h2 className={s.title}>{t.presenciaGlobal.title}</h2>
        <p className={s.subtitle}>
          {t.presenciaGlobal.subtitle1}
          <br />
          {t.presenciaGlobal.subtitle2}
        </p>
      </div>

      <div className={s["carousel-wrap"]} ref={wrapRef}>
        <div
          className={s.slides}
          ref={slidesRef}
          style={{ visibility: ready ? "visible" : "hidden" }}
        >
          {SLOTS.map((_, i) => {
            const office = offices[i % N];
            return (
              <article
                key={`${office.city}-${i}`}
                className={s.card}
                ref={i === 0 ? card0Ref : null}
                onPointerMove={handleCardMove}
                onPointerLeave={handleCardLeave}
              >
                <div className={s["card-body"]}>
                  <img
                    className={s["card-flag"]}
                    src={FLAGS[i % N]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    style={
                      i % N === 0
                        ? { objectPosition: "left center" }
                        : i % N === 8
                          ? { objectPosition: "40% center" }
                          : undefined
                    }
                  />
                  <img
                    className={s["card-city-img"]}
                    src={CITIES[i % N]}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                </div>
                <footer className={s["card-footer"]}>
                  <p className={s["card-city"]}>{office.city}</p>
                  <p className={s["card-country"]}>{office.country}</p>
                </footer>
              </article>
            );
          })}
        </div>
      </div>

      <div
        className={s.dots}
        role="tablist"
        aria-label={t.presenciaGlobal.dotsLabel}
      >
        {offices.map((o, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeDot}
            aria-label={`${o.city}, ${o.country}`}
            className={`${s.dot} ${i === activeDot ? s["dot--active"] : ""}`}
            onClick={() => handleDot(i)}
          />
        ))}
      </div>
    </section>
  );
}
