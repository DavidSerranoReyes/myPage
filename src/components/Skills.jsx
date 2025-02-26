import { useEffect, useRef } from 'react';
import '../styles/App.css';

const Skills = () => {
  const canvasRef = useRef(null);

  const skills = [
    { name: 'HTML/CSS', level: 90, category: 'frontend' },
    { name: 'JavaScript', level: 85, category: 'frontend' },
    { name: 'React', level: 80, category: 'frontend' },
    { name: 'Typescript', level: 70, category: 'frontend' },
    { name: 'Next.js', level: 65, category: 'backend' },
    { name: 'Git', level: 80, category: 'tools' },
    { name: 'UI/UX', level: 75, category: 'design' },
    { name: 'Responsive Design', level: 85, category: 'design' },
  ];

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
        <h2 className="section-title">Mis Habilidades</h2>
        <p className="section-subtitle">
          Tecnologías y herramientas con las que trabajo
        </p>

        <div className="skills-bars">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className={`skill-progress ${skill.category}`}
                  style={{ width: `${skill.level}%` }}
                  data-aos="width"
                  data-aos-delay={index * 100}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
