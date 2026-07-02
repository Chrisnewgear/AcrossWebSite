import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../i18n/LanguageContext';
import s from './styles.module.scss';

const STATS = [
  { number: '500', suffix: '+' },
  { number: '4',   suffix: ''  },
  { number: '10K', suffix: '+' },
  { number: '15',  suffix: '+' },
];

export default function Stats() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="stats" className={s.stats} ref={ref}>
      <div className={s.stats__inner}>
        <div className={s.stats__grid}>
          {STATS.map(({ number, suffix }, i) => (
            <div
              key={i}
              className={s.stats__item}
              style={{
                animation: visible ? `fadeInUp 0.6s ${i * 0.1}s ease both` : 'none',
                opacity: visible ? undefined : 0,
              }}
            >
              <div className={s.stats__number}>
                {number}<span>{suffix}</span>
              </div>
              <div className={s.stats__label}>{t.stats.labels[i]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
