import { useRef, useEffect } from 'react';
import '../styles/App.css';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Hero = ({ scrollY }) => {
  const titleRef = useRef(null);
  const { language } = useLanguage();

  const t = translations[language];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (titleRef.current) {
        const x = (window.innerWidth / 2 - e.pageX) / 28;
        const y = (window.innerHeight / 2 - e.pageY) / 28;
        titleRef.current.style.transform = `translateY(${-scrollY * 0.7}px) rotateY(${x}deg) rotateX(${y}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [scrollY]);

  const renderTitle = () => {
    if (language === 'es') {
      return (
        <>
          <span className="highlight">{t.hero.developer}</span> {t.hero.web} &{' '}
          <span className="highlight">{t.hero.designer}</span> {t.hero.creative}
        </>
      );
    } else {
      return (
        <>
          <span className="highlight">{t.hero.web}</span> {t.hero.developer} &{' '}
          <span className="highlight">{t.hero.creative}</span> {t.hero.designer}
        </>
      );
    }
  };

  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          {renderTitle()}
        </h1>

        <p className="hero-subtitle">{t.hero.subtitle}</p>

        <div className="hero-buttons">
          <a href="#proyectos" className="btn btn-primary">
            {t.hero.viewProjects}
          </a>
          <a href="#contacto" className="btn btn-outline">
            {t.hero.contactMe}
          </a>
        </div>
      </div>

      <div className="hero-background">
        <div className="gradient-circle c1"></div>
        <div className="gradient-circle c2"></div>
        <div className="code-particles">
          {Array(15)
            .fill()
            .map((_, i) => (
              <div
                key={i}
                className="code-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: Math.random() * 0.7 + 0.3,
                }}
              >
                {
                  ['{', '}', '<>', '/>', '()', '[]', ';;', '==', '=>', '&&'][
                    Math.floor(Math.random() * 10)
                  ]
                }
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
