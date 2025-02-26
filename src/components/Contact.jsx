import { useState } from 'react';
import '../styles/App.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    // Simulación de envío de formulario
    setTimeout(() => {
      setFormStatus({
        submitting: false,
        submitted: true,
        error: null,
      });
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contacto" className="contact">
      <div className="contact-container">
        <div className="contact-info">
          <h2 className="section-title">Contáctame</h2>
          <p className="section-subtitle">
            ¿Tienes un proyecto en mente? ¡Hablemos sobre él!
          </p>

          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">📧</div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>david-serrano@outlook.com</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">📱</div>
              <div className="contact-text">
                <h3>Teléfono</h3>
                <p>+593 9 84096797</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">🌎</div>
              <div className="contact-text">
                <h3>Ubicación</h3>
                <p>Quito, Ecuador</p>
              </div>
            </div>
          </div>

          <div className="social-links">
            <a
              href="https://github.com/DavidSerranoReyes"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              GitHub
            </a>
            <a
              href="https://www.instagram.com/davidserranoreyes/?utm_source=qr&igsh=NjJkOTFzbGFhNHJ3#"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/593984096797"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              Whatsapp
            </a>
          </div>
        </div>

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Tu nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="tu.email@ejemplo.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Cuéntame sobre tu proyecto..."
                rows="5"
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={formStatus.submitting || formStatus.submitted}
            >
              {formStatus.submitting
                ? 'Enviando...'
                : formStatus.submitted
                  ? '¡Enviado!'
                  : 'Enviar Mensaje'}
            </button>

            {formStatus.submitted && (
              <div className="form-success">
                ¡Gracias por tu mensaje! Te responderé pronto.
              </div>
            )}

            {formStatus.error && (
              <div className="form-error">
                Hubo un error al enviar tu mensaje. Por favor, intenta
                nuevamente.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
