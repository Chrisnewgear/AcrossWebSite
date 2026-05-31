import s from './styles.module.scss';

const OFFICES = [
  { flag: '🇨🇳', city: 'Shanghai', country: 'China', role: 'Sede Principal', isHQ: true },
  { flag: '🇺🇸', city: 'Plantation', country: 'Florida, USA', role: 'Oficina Regional', isHQ: false },
  { flag: '🇪🇨', city: 'Guayaquil', country: 'Ecuador', role: 'Operaciones', isHQ: false },
  { flag: '🇮🇳', city: 'Mumbai', country: 'India', role: 'Oficina Aliada', isHQ: false },
];

export default function PresenciaGlobal() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={s.header} data-reveal="up">
          <div className={s.label}>Presencia Internacional</div>
          <h2 className={s.title}>Conectados con el Mundo</h2>
          <p className={s.subtitle}>
            Oficinas estratégicas en los principales centros de manufactura y comercio global.
          </p>
        </div>

        <div className={s.grid}>
          {OFFICES.map(({ flag, city, country, role, isHQ }, i) => (
            <div
              key={city}
              className={`${s.office} ${isHQ ? s['office--hq'] : ''}`}
              data-reveal="up"
              data-reveal-delay={i * 100}
            >
              <span className={s['office-flag']}>{flag}</span>
              {isHQ && <div className={s['office-hq']}>HQ</div>}
              <div className={s['office-city']}>{city}</div>
              <div className={s['office-country']}>{country}</div>
              <span className={s['office-role']}>{role}</span>
            </div>
          ))}
        </div>

        <div className={s.network} data-reveal="scale">
          <div className={s['network-text']}>
            <h3>Red de Manufactura Global</h3>
            <p>Acceso directo a los mejores fabricantes de Asia y Europa</p>
          </div>
          <div className={s['network-stats']}>
            {[
              { n: '200+', l: 'Fabricantes' },
              { n: '30+', l: 'Países' },
              { n: '50+', l: 'Industrias' },
            ].map(({ n, l }) => (
              <div key={l} className={s['network-stat']}>
                <span className={s['network-stat-number']}>{n}</span>
                <span className={s['network-stat-label']}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
