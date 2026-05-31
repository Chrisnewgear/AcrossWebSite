import { useState } from 'react';
import Icon from '../Icon';
import s from './styles.module.scss';

const CONDITIONS = [
  { icon: 'document', name: 'Anticipo + BL', desc: 'Pago inicial y saldo contra copia de Bill of Lading' },
  { icon: 'bank', name: 'Carta de Crédito', desc: 'Instrumento bancario internacional (L/C). Máxima garantía' },
  { icon: 'creditCard', name: 'Crédito Parcial', desc: 'Crédito directo con garantía específica. Fluidez de caja' },
];

const INITIAL = {
  tipo: '',
  origen: '',
  destino: '',
  email: '',
  nombre: '',
  empresa: '',
  descripcion: '',
};

export default function CotizacionForm() {
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="cotizacion" className={s.section}>
      <div className={s.inner}>
        <div className={s.layout}>
          <div className={s.info}>
            <div className={s.label}>Cotización</div>
            <h2 className={s['info-title']}>Cotice su Envío con Nosotros</h2>
            <p className={s['info-sub']}>
              Ofrecemos propuestas de pago personalizadas adaptadas a su situación financiera
              y al volumen de su operación.
            </p>
            <div className={s.conditions}>
              {CONDITIONS.map(({ icon, name, desc }) => (
                <div key={name} className={s.condition}>
                  <span className={s['condition-icon']}><Icon name={icon} size={22} /></span>
                  <div>
                    <div className={s['condition-name']}>{name}</div>
                    <div className={s['condition-desc']}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={s['form-card']}>
            {submitted ? (
              <div className={s.success}>
                <div className={s['success-icon']}><Icon name="checkCircle" size={48} /></div>
                <h3>¡Cotización Enviada!</h3>
                <p>Nuestro equipo se comunicará con usted en menos de 24 horas hábiles.</p>
              </div>
            ) : (
              <>
                <h3 className={s['form-title']}>Solicitar Cotización</h3>
                <p className={s['form-sub']}>¿Desea una cotización de embarque?</p>

                <form className={s.form} onSubmit={handleSubmit} noValidate>
                  <div className={s['form-row']}>
                    <div className={s['form-group']}>
                      <label className={s['form-label']}>Tipo de Operación</label>
                      <select
                        className={s['form-select']}
                        value={form.tipo}
                        onChange={update('tipo')}
                        required
                      >
                        <option value="" disabled>Seleccionar...</option>
                        <option>Importación</option>
                        <option>Exportación</option>
                        <option>Trading Internacional</option>
                      </select>
                    </div>
                    <div className={s['form-group']}>
                      <label className={s['form-label']}>Ciudad de Origen</label>
                      <input
                        type="text"
                        className={s['form-input']}
                        placeholder="Ej: Shanghai"
                        value={form.origen}
                        onChange={update('origen')}
                        required
                      />
                    </div>
                  </div>

                  <div className={s['form-row']}>
                    <div className={s['form-group']}>
                      <label className={s['form-label']}>País de Destino</label>
                      <input
                        type="text"
                        className={s['form-input']}
                        placeholder="Ej: Ecuador"
                        value={form.destino}
                        onChange={update('destino')}
                        required
                      />
                    </div>
                    <div className={s['form-group']}>
                      <label className={s['form-label']}>Correo Electrónico</label>
                      <input
                        type="email"
                        className={s['form-input']}
                        placeholder="su@empresa.com"
                        value={form.email}
                        onChange={update('email')}
                        required
                      />
                    </div>
                  </div>

                  <div className={s['form-row']}>
                    <div className={s['form-group']}>
                      <label className={s['form-label']}>Nombres y Apellidos</label>
                      <input
                        type="text"
                        className={s['form-input']}
                        placeholder="Juan García"
                        value={form.nombre}
                        onChange={update('nombre')}
                        required
                      />
                    </div>
                    <div className={s['form-group']}>
                      <label className={s['form-label']}>Empresa</label>
                      <input
                        type="text"
                        className={s['form-input']}
                        placeholder="Mi Empresa S.A."
                        value={form.empresa}
                        onChange={update('empresa')}
                      />
                    </div>
                  </div>

                  <div className={s['form-group']}>
                    <label className={s['form-label']}>Descripción del Producto</label>
                    <input
                      type="text"
                      className={s['form-input']}
                      placeholder="Descripción breve de la mercancía"
                      value={form.descripcion}
                      onChange={update('descripcion')}
                    />
                  </div>

                  <div className={s['form-footer']}>
                    <p className={s['form-privacy']}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      Sus datos están protegidos
                    </p>
                    <button
                      type="submit"
                      className={s['form-submit']}
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Cotizar'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
