import Icon from '../Icon';
import s from './styles.module.scss';

const VALUES = [
  {
    icon: 'heartHandshake',
    name: 'Responsabilidad',
    desc: 'Asumimos cada proceso comercial con profesionalismo, garantizando una gestión eficiente y el cumplimiento de los estándares acordados.',
  },
  {
    icon: 'users',
    name: 'Crecimiento Compartido',
    desc: 'Creemos en generar valor sostenible para clientes, proveedores, colaboradores y aliados estratégicos.',
  },
  {
    icon: 'messageSquare',
    name: 'Adaptabilidad',
    desc: 'Respondemos con agilidad a los cambios del mercado global para ofrecer soluciones oportunas y competitivas.',
  },
];

export default function Valores() {
  return (
    <section className={s.section}>
      {/* Full-bleed banner — green counterpart to "Lo que nos define" */}
      <div className={s.banner}>
        <span className={s.banner__text}>Nuestros Valores</span>
      </div>

      <div className={s.inner}>
        <div className={s.grid}>
          {VALUES.map(({ icon, name, desc }, i) => (
            <article
              key={name}
              className={s.card}
              data-reveal="up"
              data-reveal-delay={i * 120}
            >
              <div className={s.card__icon}><Icon name={icon} size={30} /></div>
              <h3 className={s.card__title}>{name}</h3>
              <p className={s.card__desc}>{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
