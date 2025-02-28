import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './styles/App.css';
import { LanguageProvider } from './contexts/LanguageContext';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LanguageProvider>
      <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={() => setDarkMode(!darkMode)}
          scrollY={scrollY}
        />
        <Hero scrollY={scrollY} />
        <Projects />
        <Skills />
        <Contact />
        <footer className="footer">
          <p>
            © {new Date().getFullYear()} davidSerranoReyes - Developer
            Portfolio
          </p>
        </footer>
      </div>
    </LanguageProvider>
  );
};

export default App;
