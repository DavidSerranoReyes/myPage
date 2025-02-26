import { useRef, useEffect } from 'react';
import '../styles/App.css';

const Hero = ({ scrollY }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (titleRef.current) {
        const x = (window.innerWidth / 2 - e.pageX) / 25;
        const y = (window.innerHeight / 2 - e.pageY) / 25;
        titleRef.current.style.transform = `translateY(${-scrollY * 0.5}px) rotateY(${x}deg) rotateX(${y}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [scrollY]);

  return (
    <section id="inicio" className="hero">
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          <span className="highlight">Desarrollador</span> Web &
          <span className="highlight"> Diseñador</span> Creativo
        </h1>

        <p className="hero-subtitle">
          Transformando ideas en experiencias digitales excepcionales
        </p>

        <div className="hero-buttons">
          <a href="#proyectos" className="btn btn-primary">
            Ver Proyectos
          </a>
          <a href="#contacto" className="btn btn-outline">
            Contáctame
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
