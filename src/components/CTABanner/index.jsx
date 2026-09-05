import { Link } from 'react-router-dom';
import Icon from '../Icon';
import s from './styles.module.scss';

export default function CTABanner() {
  return (
    <section className={s.banner}>
      <div className={s.inner}>
        <div className={s.card} data-reveal="scale">
          <span className={s.glow} data-parallax="0.12" aria-hidden="true" />
          <div className={s.label} data-reveal="up" data-reveal-delay={80}>
            Dar el siguiente paso
          </div>
          <h2 className={s.title} data-reveal="up" data-reveal-delay={140}>
            ¿Listo para expandir sus horizontes comerciales?
          </h2>
          <p className={s.subtitle} data-reveal="up" data-reveal-delay={200}>
            Hable con nuestros expertos y obtenga una propuesta personalizada para su operación.
          </p>
          <div
            className={`${s.actions} on-dark`}
            data-reveal="up"
            data-reveal-delay={260}
          >
            <Link to="/cotizacion" className="btn-green">
              Solicitar Cotización
              <Icon name="arrowRight" size={16} />
            </Link>
            {/* WhatsApp button disabled for now — uncomment to re-enable
            <a
              href="https://wa.me/593998432427"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white"
            >
              Hablar con un Experto
            </a>
            */}
          </div>
        </div>
      </div>
    </section>
  );
}
