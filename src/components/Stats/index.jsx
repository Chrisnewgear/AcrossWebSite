import { useEffect, useRef, useState } from 'react';
import s from './styles.module.scss';

const STATS = [
  { number: '500', suffix: '+', label: 'Clientes Activos' },
  { number: '4',   suffix: '',  label: 'Países con Oficinas' },
  { number: '10K', suffix: '+', label: 'Envíos Completados' },
  { number: '15',  suffix: '+', label: 'Años de Experiencia' },
];

export default function Stats() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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
          {STATS.map(({ number, suffix, label }, i) => (
            <div
              key={label}
              className={s.stats__item}
              style={{
                animation: visible ? `fadeInUp 0.6s ${i * 0.1}s ease both` : 'none',
                opacity: visible ? undefined : 0,
              }}
            >
              <div className={s.stats__number}>
                {number}<span>{suffix}</span>
              </div>
              <div className={s.stats__label}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
