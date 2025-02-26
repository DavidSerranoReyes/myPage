import { useState } from 'react';
import '../styles/App.css';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: 'Find Remote Jobs',
      description:
        'Find Remote Jobs is a web application built with React and TypeScript that allows users to search and explore remote job opportunities. The app offers an intuitive and highly interactive interface, featuring functionalities such as job search, job listings, detailed descriptions, pagination, bookmarks, and the ability to view recent and important jobs.',
      techs: ['React', 'Typescript', 'Javascript', 'HTML', 'CSS'],
      image: '/src/assets/img-1.png',
      github: 'https://github.com/DavidSerranoReyes/RMTDEV-TS',
      demo: 'https://rmtdev-ts.vercel.app/',
    },
    {
      id: 2,
      title: 'CorpComment',
      description:
        'CorpComment is a web application that allows customers to leave reviews about companies and suggestions for their products. This platform aims to provide an easy and quick way for users to express their opinions on businesses and products, helping others make informed decisions',
      techs: ['React', 'Typescript', 'Vite', 'Zustand', 'Tailwind CSS'],
      image: '/src/assets/img-2.png',
      github: 'https://github.com/DavidSerranoReyes/Corp-Comment-app',
      demo: 'https://corp-comment-app.vercel.app/',
    },
    {
      id: 3,
      title: 'Word Analytics App',
      description:
        "Word Analytics is an application designed to help you analyze and optimize your content. It is a useful tool for anyone who wants to fine-tune their content before posting on platforms like X (formerly Twitter), Instagram, and TikTok, ensuring it meets each platform's character limits. ",
      techs: ['JavaScript', 'CSS', 'HTML'],
      image: '/src/assets/img-3.png',
      github: 'https://github.com/DavidSerranoReyes/WordAnalytics',
      demo: 'https://word-analytics-smoky.vercel.app/',
    },
    {
      id: 4,
      title: 'Dynamic Counter',
      description:
        'Dynamic Counter is a simple web application that allows users to interact with a counter. The counter can be incremented or decremented by pressing the + and - keys on the keyboard. Additionally, the user can press the Refresh button to reset the counter to zero. There is a predefined limit that the counter cannot exceed, providing a controlled range for interaction.',
      techs: ['React', 'JavaScript', 'CSS', 'HTML'],
      image: '/src/assets/img-4.png',
      github: 'https://github.com/DavidSerranoReyes/FancyCounter',
      demo: 'https://fancy-counter-topaz.vercel.app/',
    },
    {
      id: 5,
      title: 'Foundation Landing Page',
      description:
        'A modern, interactive landing page designed and developed for a foundation. This project showcases a responsive, user-friendly interface with engaging features and optimized performance.',
      techs: ['JavaScript', 'CSS3', 'HTML', 'Bootstrap'],
      image: '/src/assets/img-5.png',
      github: 'https://github.com/DavidSerranoReyes/fadeps',
      demo: 'https://fadeps.vercel.app/',
    },
  ];

  return (
    <section id="proyectos" className="projects">
      <h2 className="section-title">Mis Proyectos</h2>
      <p className="section-subtitle">
        Explora algunos de mis trabajos recientes
      </p>

      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`project-card ${activeProject === project.id ? 'active' : ''}`}
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Código
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  Demo
                </a>
              </div>
            </div>

            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-techs">
                {project.techs.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
