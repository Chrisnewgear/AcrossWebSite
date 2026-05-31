import Icon from '../Icon';
import s from './styles.module.scss';

const ADVANTAGES = [
  {
    icon: 'factory',
    title: 'Red de Proveedores',
    desc: 'Fabricantes seleccionados con precios competitivos directamente en China, India y Europa. Sin intermediarios innecesarios.',
    detail: 'Hasta 5 SKUs de sourcing SIN COSTO',
  },
  {
    icon: 'scan',
    title: 'Calidad Garantizada',
    desc: 'Inspecciones exhaustivas realizadas por expertos durante producción, post-producción y carga de contenedor en las instalaciones del proveedor.',
    detail: 'Desde $475 + IVA / día de inspección',
  },
  {
    icon: 'bank',
    title: 'Seguridad Financiera',
    desc: 'Gestión de pagos desde nuestras oficinas en China o Hong Kong. Protegemos su inversión con contratos de confidencialidad y garantías documentales.',
    detail: 'Seguridad de inversión 100%',
  },
  {
    icon: 'eye',
    title: 'Privacidad Estratégica',
    desc: 'Acrosscon figura como el embarcador real en todos los documentos. Su competencia nunca conocerá la identidad de su fabricante. Contrato de confidencialidad incluido.',
    detail: 'Contrato de confidencialidad garantizado',
  },
];

const COMMISSIONS = [
  { rate: '5%', type: 'Comisión Estándar', label: 'Pedidos entre $20K y $50K FOB' },
  { rate: '3.5%', type: 'Comisión Premium', label: 'Pedidos superiores a $50K FOB' },
  { rate: '$150', type: 'Verificación', label: 'Auditoría de proveedor + IVA' },
];

export default function Ventajas() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.header} data-reveal="up">
          <div className={s.label}>Ventajas Estratégicas</div>
          <h2 className={s.title}>Por qué elegirnos</h2>
          <p className={s.subtitle}>
            Más que un servicio de transporte — somos su socio estratégico en cada operación internacional.
          </p>
        </div>

        <div className={s.grid}>
          {ADVANTAGES.map(({ icon, title, desc, detail }, i) => (
            <div key={title} className={s.card} data-reveal="up" data-reveal-delay={(i % 2) * 120}>
              <div className={s['card-number']} data-parallax="0.08">{String(i + 1).padStart(2, '0')}</div>
              <div className={s['card-icon']}><Icon name={icon} size={26} /></div>
              <h3 className={s['card-title']}>{title}</h3>
              <p className={s['card-desc']}>{desc}</p>
              <div className={s['card-detail']}>{detail}</div>
            </div>
          ))}
        </div>

        <div className={s.commissions}>
          {COMMISSIONS.map(({ rate, type, label }, i) => (
            <div key={type} className={s['commission-item']} data-reveal="scale" data-reveal-delay={i * 110}>
              <div className={s['commission-rate']}>{rate}</div>
              <div className={s['commission-type']}>{type}</div>
              <div className={s['commission-label']}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
