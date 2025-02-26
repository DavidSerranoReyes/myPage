import { useState } from 'react';
import '../styles/App.css';

const Navbar = ({ darkMode, toggleDarkMode, scrollY }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = ['Inicio', 'Proyectos', 'Habilidades', 'Contacto'];

  return (
    <nav className={`navbar ${scrollY > 50 ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-logo">
        <span className="logo-text">{'David Serrano R.'}</span>
      </div>

      <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-controls">
        <button
          className="theme-toggle"
          onClick={toggleDarkMode}
          aria-label={
            darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
          }
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
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
