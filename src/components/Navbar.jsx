import { useState } from 'react';
import '../styles/App.css';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Navbar = ({ darkMode, toggleDarkMode, scrollY }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  // Accede a las traducciones según el idioma actual
  const t = translations[language];

  const navItems = [
    { id: 'inicio', text: t.inicio },
    { id: 'proyectos', text: t.proyectos },
    { id: 'habilidades', text: t.habilidades },
    { id: 'contacto', text: t.contacto },
  ];

  return (
    <nav className={`navbar ${scrollY > 50 ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-logo">
        <span className="logo-text">{'David Serrano R.'}</span>
      </div>

      <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={`#${item.id}`} onClick={() => setMenuOpen(false)}>
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-controls">
        {/* Botón simple para alternar idioma */}
        <button
          className="language-toggle"
          onClick={toggleLanguage}
          aria-label={t.cambiarIdioma}
        >
          {language === 'es' ? 'EN' : 'ES'}
        </button>

        <button
          className="theme-toggle"
          onClick={toggleDarkMode}
          aria-label={darkMode ? t.cambiarModoClaro : t.cambiarModoOscuro}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? t.cerrarMenu : t.abrirMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
