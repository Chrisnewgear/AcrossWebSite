import { useEffect } from 'react';

/**
 * useScrollAnimations — one place that drives every scroll-based motion on the
 * site (Single Responsibility). Components stay declarative: they only mark
 * intent with data attributes, never touch observers or rAF themselves.
 *
 *   data-reveal="up|left|right|scale|blur"   → fades/slides in once on enter
 *   data-reveal-delay="120"                  → stagger, in ms
 *   data-parallax="0.18"                     → translateY at a fraction of scroll
 *
 * Re-runs on every route change so freshly mounted pages get wired up.
 */
export default function useScrollAnimations(pathname) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Reveal-on-scroll (one-shot) ───────────────────────────────────
    const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));

    if (reduce) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    if (!reduce) {
      revealEls.forEach((el) => {
        const delay = el.getAttribute('data-reveal-delay');
        if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
        // Elements already in view on load still animate (nice first paint).
        io.observe(el);
      });
    }

    // ── Parallax (continuous, rAF-driven) ─────────────────────────────
    let raf = 0;
    const parallaxEls = reduce ? [] : Array.from(document.querySelectorAll('[data-parallax]'));

    const update = () => {
      const vh = window.innerHeight;
      for (const el of parallaxEls) {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
        const rect = el.getBoundingClientRect();
        // Skip work for off-screen layers.
        if (rect.bottom < -300 || rect.top > vh + 300) continue;
        const center = rect.top + rect.height / 2;
        const offset = center - vh / 2;
        el.style.setProperty('--py', `${(-offset * speed).toFixed(1)}px`);
      }
      raf = requestAnimationFrame(update);
    };

    if (parallaxEls.length) raf = requestAnimationFrame(update);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);
}
