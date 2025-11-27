import { useEffect, useRef } from 'react';
import '../styles/App.css';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Skills = () => {
  const canvasRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language];

  // Niveles de habilidad
  const levels = {
    expert: { es: 'Experto', en: 'Expert' },
    advanced: { es: 'Avanzado', en: 'Advanced' },
    intermediate: { es: 'Intermedio', en: 'Intermediate' },
  };

  // Lista de habilidades agrupadas por categoría
  const skillsData = {
    fullstack: {
      title: { es: 'Full Stack', en: 'Full Stack' },
      skills: [
        { name: 'HTML/CSS', level: 'expert' },
        { name: 'JavaScript', level: 'advanced' },
        { name: 'React', level: 'advanced' },
        { name: 'React Native', level: 'intermediate' },
        { name: 'TypeScript', level: 'intermediate' },
        { name: 'Next.js', level: 'intermediate' },
        { name: 'Astro', level: 'intermediate' },
      ],
    },
    design: {
      title: { es: 'Diseño', en: 'Design' },
      skills: [
        {
          name: { es: 'Diseño Responsivo', en: 'Responsive Design' },
          level: 'advanced',
        },
        { name: 'UI/UX', level: 'intermediate' },
        { name: 'Tailwind CSS', level: 'advanced' },
      ],
    },
    tools: {
      title: { es: 'Herramientas', en: 'Tools' },
      skills: [
        { name: 'Git', level: 'advanced' },
        { name: 'VS Code', level: 'expert' },
        { name: 'Docker', level: 'intermediate' },
        { name: 'Python', level: 'intermediate' },
        { name: 'Figma', level: 'intermediate' },
      ],
    },
  };

  const getSkillName = (skill) => {
    if (typeof skill.name === 'object') {
      return skill.name[language];
    }
    return skill.name;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 10000);

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: '#0080ff',
          vx: Math.random() * 1 - 0.5,
          vy: Math.random() * 1 - 0.5,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > canvas.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > canvas.height) p.vy = -p.vy;

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distance = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (100 - distance) / 500;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="habilidades" className="skills">
      <canvas ref={canvasRef} className="skills-canvas"></canvas>

      <div className="skills-content">
        <h2 className="section-title">{t.skills.title}</h2>
        <p className="section-subtitle">{t.skills.subtitle}</p>

        <div className="skills-categories">
          {Object.entries(skillsData).map(([key, category]) => (
            <div key={key} className="skill-category">
              <h3 className="category-title">{category.title[language]}</h3>
              <div className="skills-tags">
                {category.skills.map((skill, index) => (
                  <div key={index} className={`skill-tag ${skill.level}`}>
                    <span className="skill-name">{getSkillName(skill)}</span>
                    <span className="skill-level">
                      {levels[skill.level][language]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
