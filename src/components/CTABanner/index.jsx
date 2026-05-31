import s from './styles.module.scss';

export default function CTABanner() {
  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={s.banner}>
      <div className={s.inner}>
        <div className={s.card}>
          <div className={s.label}>Dar el siguiente paso</div>
          <h2 className={s.title}>
            ¿Listo para expandir sus horizontes comerciales?
          </h2>
          <p className={s.subtitle}>
            Hable con nuestros expertos y obtenga una propuesta personalizada para su operación.
          </p>
          <div className={s.actions}>
            <button
              className="btn-green"
              onClick={() => scrollTo('#cotizacion')}
            >
              Solicitar Cotización
            </button>
            <a
              href="https://wa.me/593998432427"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white"
            >
              Hablar con un Experto
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
