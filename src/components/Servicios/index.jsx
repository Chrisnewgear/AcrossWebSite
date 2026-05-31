import Icon from '../Icon';
import s from './styles.module.scss';

const TRANSPORT = [
  {
    icon: 'ship',
    name: 'Transporte Marítimo',
    img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80',
    badge: 'FCL / LCL',
    desc: 'Servicios completos de carga marítima desde los principales puertos de Asia y Europa. Manejamos contenedores completos y grupaje con tiempos de tránsito competitivos.',
  },
  {
    icon: 'plane',
    name: 'Transporte Aéreo',
    img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
    badge: 'Express / Estándar',
    desc: 'Soluciones de carga aérea para envíos urgentes y de alto valor. Conectamos con las principales aerolíneas de carga del mundo para garantizar velocidad y seguridad.',
  },
  {
    icon: 'truck',
    name: 'Transporte Terrestre',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=600&q=80',
    badge: 'FTL / LTL',
    desc: 'Distribución terrestre desde puertos y aeropuertos hasta su destino final. Flota propia y red de aliados para cobertura total en Ecuador y la región.',
  },
];

const FEATURES = [
  { icon: 'search', name: 'Verificación de Proveedores', desc: 'Auditoría completa de fábricas antes de cualquier compra' },
  { icon: 'checkCircle', name: 'Calidad Garantizada', desc: 'Inspecciones exhaustivas por expertos certificados' },
  { icon: 'lock', name: 'Seguridad Financiera', desc: 'Gestión de pagos desde oficinas en China o HK' },
  { icon: 'shieldCheck', name: 'Privacidad Estratégica', desc: 'Acrosscon como embarcador: su proveedor es confidencial' },
];

export default function Servicios() {
  return (
    <section id="servicios" className={s.section}>
      <div className={s.inner}>
        <div className={s.header} data-reveal="up">
          <div className={s.label}>Nuestras Capacidades</div>
          <h2 className={s.title}>Soluciones de Transporte Global</h2>
          <p className={s.subtitle}>
            Operamos por mar, aire y tierra para llevar su carga desde cualquier
            origen hasta su destino con máxima eficiencia.
          </p>
        </div>

        <div className={s['transport-grid']}>
          {TRANSPORT.map(({ icon, name, img, badge, desc }, i) => (
            <div key={name} className={s['transport-card']} data-reveal="up" data-reveal-delay={i * 130}>
              <div className={s['transport-card__img-wrap']}>
                <div className={s['transport-card__img-parallax']} data-parallax="0.04">
                  <img src={img} alt={name} loading="lazy" />
                </div>
                <span className={s['transport-card__badge']}>{badge}</span>
              </div>
              <div className={s['transport-card__body']}>
                <div className={s['transport-card__icon-row']}>
                  <div className={s['transport-card__icon']}><Icon name={icon} size={24} /></div>
                  <h3 className={s['transport-card__name']}>{name}</h3>
                </div>
                <p className={s['transport-card__desc']}>{desc}</p>
                <button className={s['transport-card__btn']}>
                  Explorar Rutas <Icon name="arrowRight" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={s.features}>
          <h3 className={s['features-title']} data-reveal="up">Servicios Adicionales</h3>
          <div className={s['features-grid']}>
            {FEATURES.map(({ icon, name, desc }, i) => (
              <div key={name} className={s['feature-item']} data-reveal="up" data-reveal-delay={i * 90}>
                <div className={s['feature-icon']}><Icon name={icon} size={28} /></div>
                <div className={s['feature-name']}>{name}</div>
                <div className={s['feature-desc']}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
