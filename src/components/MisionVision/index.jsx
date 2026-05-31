import Icon from '../Icon';
import s from './styles.module.scss';

const VALUES = [
  {
    icon: 'award',
    name: 'Experiencia',
    desc: 'Conocimiento profundo en todo el proceso de importación y exportación desde Asia y Europa.',
  },
  {
    icon: 'handshake',
    name: 'Lealtad',
    desc: 'Compromiso absoluto con nuestra red de proveedores y clientes, construyendo relaciones de largo plazo.',
  },
  {
    icon: 'rocket',
    name: 'Mejora Continua',
    desc: 'Enfoque constante en la eficiencia operacional y la satisfacción total del cliente.',
  },
];

export default function MisionVision() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.header} data-reveal="up">
          <div className={s.label}>Nuestra Identidad</div>
          <h2 className={s.title}>Lo que nos define</h2>
        </div>

        <div className={s.grid}>
          {/* Misión */}
          <div className={`${s.card} ${s['card--mision']}`} data-reveal="left">
            <div className={s['card-inner']}>
              <div className={s['card-icon']}><Icon name="target" size={26} /></div>
              <div className={s['card-label']}>Misión</div>
              <h3 className={s['card-title']}>Nuestra Misión</h3>
              <div className={s['card-divider']} />
              <p className={s['card-text']}>
                Satisfacer los requerimientos de nuestros clientes en todos los
                negocios internacionales de cualquier parte del mundo, conectando
                mercados con soluciones integrales y eficientes.
              </p>
              <div className={s['card-divider']} />
              <span className={s['card-tag']}><Icon name="globe" size={15} /> Comercio Global</span>
            </div>
          </div>

          {/* Visión */}
          <div className={`${s.card} ${s['card--vision']}`} data-reveal="right">
            <div className={s['card-inner']}>
              <div className={s['card-icon']}><Icon name="compass" size={26} /></div>
              <div className={s['card-label']}>Visión</div>
              <h3 className={s['card-title']}>Nuestra Visión</h3>
              <div className={s['card-divider']} />
              <p className={s['card-text']}>
                Ser la empresa número uno en concretar negocios a nivel
                internacional, abriendo mercados y apoyando a empresas extranjeras
                a insertar sus productos globalmente con confianza y transparencia.
              </p>
              <div className={s['card-divider']} />
              <span className={s['card-tag']}><Icon name="award" size={15} /> Liderazgo Mundial</span>
            </div>
          </div>
        </div>

        <div className={s.values}>
          <h3 className={s['values-title']} data-reveal="up">Nuestros Valores</h3>
          <div className={s['values-grid']}>
            {VALUES.map(({ icon, name, desc }, i) => (
              <div key={name} className={s['value-card']} data-reveal="up" data-reveal-delay={i * 120}>
                <div className={s['value-icon']}><Icon name={icon} size={26} /></div>
                <h4 className={s['value-name']}>{name}</h4>
                <p className={s['value-desc']}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
