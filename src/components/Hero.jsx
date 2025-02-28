import { useRef, useEffect, useState } from 'react';
import '../styles/App.css';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Hero = ({ scrollY }) => {
  const titleRef = useRef(null);
  const { language } = useLanguage();
  const [hasInteracted, setHasInteracted] = useState(false);

  const t = translations[language];

  useEffect(() => {
    // Función para establecer una posición inicial
    const setInitialPosition = () => {
      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${-scrollY * 0.7}px) rotateY(0deg) rotateX(0deg)`;
      }
    };

    // Establecer posición inicial al montar el componente
    setInitialPosition();

    const handleMouseMove = (e) => {
      if (titleRef.current) {
        setHasInteracted(true);
        const x = (window.innerWidth / 2 - e.pageX) / 28;
        const y = (window.innerHeight / 2 - e.pageY) / 28;
        titleRef.current.style.transform = `translateY(${-scrollY * 0.7}px) rotateY(${x}deg) rotateX(${y}deg)`;
      }
    };

    const handleTouchMove = (e) => {
      if (titleRef.current && e.touches[0]) {
        setHasInteracted(true);
        const touch = e.touches[0];
        const x = (window.innerWidth / 2 - touch.pageX) / 28;
        const y = (window.innerHeight / 2 - touch.pageY) / 28;
        titleRef.current.style.transform = `translateY(${-scrollY * 0.7}px) rotateY(${x}deg) rotateX(${y}deg)`;
      }
    };

    // Para cuando se cambia de página y se vuelve
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setInitialPosition();
      }
    };

    // Para cuando se navega de regreso al inicio usando botones de navegación
    const handleNavigation = () => {
      if (window.location.hash === '#inicio' || window.location.hash === '') {
        setInitialPosition();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchstart', handleTouchMove); // Detectar el primer toque
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);

    // Verificar periódicamente si el título está visible y tiene una transformación
    const intervalId = setInterval(() => {
      if (titleRef.current && !hasInteracted) {
        const computedStyle = window.getComputedStyle(titleRef.current);
        if (
          computedStyle.transform === 'none' ||
          computedStyle.transform === ''
        ) {
          setInitialPosition();
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
      clearInterval(intervalId);
    };
  }, [scrollY, hasInteracted]);

  // Efecto para actualizar la posición cuando scrollY cambia
  useEffect(() => {
    if (titleRef.current) {
      const currentTransform = titleRef.current.style.transform;
      if (currentTransform) {
        // Extraer los valores de rotación actuales
        const rotateYMatch = currentTransform.match(/rotateY\(([^)]+)\)/);
        const rotateXMatch = currentTransform.match(/rotateX\(([^)]+)\)/);

        const rotateY = rotateYMatch ? rotateYMatch[1] : '0deg';
        const rotateX = rotateXMatch ? rotateXMatch[1] : '0deg';

        // Actualizar solo la parte de translateY
        titleRef.current.style.transform = `translateY(${-scrollY * 0.7}px) rotateY(${rotateY}) rotateX(${rotateX})`;
      } else {
        // Si no hay transformación, establecer una por defecto
        titleRef.current.style.transform = `translateY(${-scrollY * 0.7}px) rotateY(0deg) rotateX(0deg)`;
      }
    }
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

  // Función para manejar clicks en dispositivos móviles
  const handleTitleClick = () => {
    if (titleRef.current && !hasInteracted) {
      setHasInteracted(true);
      titleRef.current.style.transform = `translateY(${-scrollY * 0.7}px) rotateY(5deg) rotateX(-5deg)`;

      // Añadir una pequeña animación para que se note el efecto
      setTimeout(() => {
        if (titleRef.current) {
          titleRef.current.style.transform = `translateY(${-scrollY * 0.7}px) rotateY(-5deg) rotateX(5deg)`;

          setTimeout(() => {
            if (titleRef.current) {
              titleRef.current.style.transform = `translateY(${-scrollY * 0.7}px) rotateY(0deg) rotateX(0deg)`;
            }
          }, 300);
        }
      }, 300);
    }
  };

  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <h1
          ref={titleRef}
          className="hero-title"
          onClick={handleTitleClick}
          style={{ transition: 'transform 0.3s ease-out' }}
        >
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
