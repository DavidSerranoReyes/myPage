import { useState, useEffect } from 'react';
import '../styles/App.css';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { language } = useLanguage();

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

  // Inicialización de EmailJS
  useEffect(() => {
    // Reemplaza con tu User ID de EmailJS
    emailjs.init('wlPEwZl4t2rCDch6m');
  }, []);

  // Obtenemos las traducciones correspondientes a la sección de contacto
  const t = translations[language]?.contact || translations.es.contact;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitting: true, submitted: false, error: null });

    try {
      // Enviar el correo electrónico usando EmailJS
      const result = await emailjs.send(
        'service_cchy9wt', // Reemplaza con tu Service ID de EmailJS
        'template_o613h2v', // Reemplaza con tu Template ID de EmailJS
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email,
          to_name: 'David Serrano', // Tu nombre
          to_email: 'david-serrano@outlook.com', // Tu correo electrónico
          subject: `Nuevo mensaje de contacto de ${formData.name}`,
        }
      );

      if (result.status === 200) {
        setFormStatus({
          submitting: false,
          submitted: true,
          error: null,
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setFormStatus({
        submitting: false,
        submitted: false,
        error: error.message || 'Error al enviar el mensaje',
      });
    }
  };

  return (
    <section id="contacto" className="contact">
      <div className="contact-container">
        <div className="contact-info">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">{t.subtitle}</p>

          <div className="contact-methods">
            <div className="contact-method">
              <div className="contact-icon">📧</div>
              <div className="contact-text">
                <h3>{t.email}</h3>
                <p>david-serrano@outlook.com</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">📱</div>
              <div className="contact-text">
                <h3>{t.phone}</h3>
                <p>+593 9 84096797</p>
              </div>
            </div>

            <div className="contact-method">
              <div className="contact-icon">🌎</div>
              <div className="contact-text">
                <h3>{t.location}</h3>
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
              <label htmlFor="name">{t.nameLabel}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder={t.namePlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t.emailLabel}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder={t.emailPlaceholder}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">{t.messageLabel}</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder={t.messagePlaceholder}
                rows="5"
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={formStatus.submitting || formStatus.submitted}
            >
              {formStatus.submitting
                ? t.sending
                : formStatus.submitted
                  ? t.sent
                  : t.sendButton}
            </button>

            {formStatus.submitted && (
              <div className="form-success">{t.successMessage}</div>
            )}

            {formStatus.error && (
              <div className="form-error">{t.errorMessage}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
