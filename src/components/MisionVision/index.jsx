import Icon from '../Icon';
import s from './styles.module.scss';

const PILLARS = [
  {
    key: 'mision',
    icon: 'target',
    title: 'Nuestra Misión',
    text: 'Transformamos la distancia en oportunidades globales. Simplificamos tus operaciones internacionales conectándote con soluciones eficientes en cualquier parte del mundo.',
  },
  {
    key: 'vision',
    icon: 'compass',
    title: 'Nuestra Visión',
    text: 'Ser el puente global que transforma fronteras en oportunidades, consolidándonos como el aliado estratégico más confiable, transparente y seguro para conectar mercados.',
  },
];

export default function MisionVision() {
  return (
    <section className={s.section}>
      {/* Full-bleed banner — the section's defining header */}
      <div className={s.banner}>
        <span className={s.banner__text}>Lo que nos define</span>
      </div>

      <div className={s.inner}>
        <div className={s.grid}>
          {PILLARS.map(({ key, icon, title, text }, i) => (
            <article
              key={key}
              className={`${s.pillar} ${s[`pillar--${key}`]}`}
              data-reveal={i === 0 ? 'left' : 'right'}
            >
              <div className={s.pillar__icon}><Icon name={icon} size={24} /></div>
              <h3 className={s.pillar__title}>{title}</h3>
              <span className={s.pillar__rule} />
              <p className={s.pillar__text}>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
