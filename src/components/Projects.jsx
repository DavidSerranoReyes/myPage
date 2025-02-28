import { useState } from 'react';
import '../styles/App.css';
import img1 from '../assets/img-1.png';
import img2 from '../assets/img-2.png';
import img3 from '../assets/img-3.png';
import img4 from '../assets/img-4.png';
import img5 from '../assets/img-5.png';
import img6 from '../assets/img-6.png';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];

  // Los proyectos ahora tienen contenido en ambos idiomas
  const projectsData = [
    {
      id: 1,
      image: img1,
      github: 'https://github.com/DavidSerranoReyes/RMTDEV-TS',
      demo: 'https://rmtdev-ts.vercel.app/',
      techs: ['React', 'Typescript', 'Javascript', 'HTML', 'CSS'],
      translations: {
        es: {
          title: 'Find Remote Jobs',
          description:
            'Find Remote Jobs es una aplicación web construida con React y TypeScript que permite a los usuarios buscar y explorar oportunidades de trabajo remoto. La aplicación ofrece una interfaz intuitiva y altamente interactiva, con funcionalidades como búsqueda de trabajos, listados, descripciones detalladas, paginación, marcadores y la capacidad de ver trabajos recientes e importantes.',
        },
        en: {
          title: 'Find Remote Jobs',
          description:
            'Find Remote Jobs is a web application built with React and TypeScript that allows users to search and explore remote job opportunities. The app offers an intuitive and highly interactive interface, featuring functionalities such as job search, job listings, detailed descriptions, pagination, bookmarks, and the ability to view recent and important jobs.',
        },
      },
    },
    {
      id: 2,
      image: img2,
      github: 'https://github.com/DavidSerranoReyes/Corp-Comment-app',
      demo: 'https://corp-comment-app.vercel.app/',
      techs: ['React', 'Typescript', 'Vite', 'Zustand', 'Tailwind CSS'],
      translations: {
        es: {
          title: 'CorpComment',
          description:
            'CorpComment es una aplicación web que permite a los clientes dejar reseñas sobre empresas y sugerencias para sus productos. Esta plataforma tiene como objetivo proporcionar una forma fácil y rápida para que los usuarios expresen sus opiniones sobre negocios y productos, ayudando a otros a tomar decisiones informadas.',
        },
        en: {
          title: 'CorpComment',
          description:
            'CorpComment is a web application that allows customers to leave reviews about companies and suggestions for their products. This platform aims to provide an easy and quick way for users to express their opinions on businesses and products, helping others make informed decisions.',
        },
      },
    },
    {
      id: 3,
      image: img3,
      github: 'https://github.com/DavidSerranoReyes/WordAnalytics',
      demo: 'https://word-analytics-smoky.vercel.app/',
      techs: ['JavaScript', 'CSS', 'HTML'],
      translations: {
        es: {
          title: 'Word Analytics App',
          description:
            'Word Analytics es una aplicación diseñada para ayudarte a analizar y optimizar tu contenido. Es una herramienta útil para cualquiera que quiera ajustar su contenido antes de publicarlo en plataformas como X (antes Twitter), Instagram y TikTok, asegurándose de que cumpla con los límites de caracteres de cada plataforma.',
        },
        en: {
          title: 'Word Analytics App',
          description:
            "Word Analytics is an application designed to help you analyze and optimize your content. It is a useful tool for anyone who wants to fine-tune their content before posting on platforms like X (formerly Twitter), Instagram, and TikTok, ensuring it meets each platform's character limits.",
        },
      },
    },
    {
      id: 4,
      image: img4,
      github: 'https://github.com/DavidSerranoReyes/FancyCounter',
      demo: 'https://fancy-counter-topaz.vercel.app/',
      techs: ['React', 'JavaScript', 'CSS', 'HTML'],
      translations: {
        es: {
          title: 'Dynamic Counter',
          description:
            'Dynamic Counter es una aplicación web simple que permite a los usuarios interactuar con un contador. El contador se puede incrementar o disminuir presionando las teclas + y - en el teclado. Además, el usuario puede presionar el botón Refresh para reiniciar el contador a cero. Hay un límite predefinido que el contador no puede exceder, proporcionando un rango controlado para la interacción.',
        },
        en: {
          title: 'Dynamic Counter',
          description:
            'Dynamic Counter is a simple web application that allows users to interact with a counter. The counter can be incremented or decremented by pressing the + and - keys on the keyboard. Additionally, the user can press the Refresh button to reset the counter to zero. There is a predefined limit that the counter cannot exceed, providing a controlled range for interaction.',
        },
      },
    },
    {
      id: 5,
      image: img5,
      github: 'https://github.com/DavidSerranoReyes/fadeps',
      demo: 'https://fadeps.vercel.app/',
      techs: ['JavaScript', 'CSS3', 'HTML', 'Bootstrap'],
      translations: {
        es: {
          title: 'Página de Fundación',
          description:
            'Una página de destino moderna e interactiva diseñada y desarrollada para una fundación. Este proyecto muestra una interfaz responsiva y fácil de usar con características atractivas y rendimiento optimizado.',
        },
        en: {
          title: 'Foundation Landing Page',
          description:
            'A modern, interactive landing page designed and developed for a foundation. This project showcases a responsive, user-friendly interface with engaging features and optimized performance.',
        },
      },
    },
    {
      id: 6,
      image: img6,
      github: 'https://github.com/DavidSerranoReyes/TrekBag',
      demo: 'https://trek-bag-inky.vercel.app/',
      techs: ['React', 'CSS', 'HTML', 'UX/UI'],
      translations: {
        es: {
          title: 'TrekBag',
          description:
            'Una aplicación web que ayuda a los viajeros a organizar, almacenar y marcar todos los artículos esenciales para sus próximos viajes.',
        },
        en: {
          title: 'TrekBag',
          description:
            'A web application that helps travelers organize, store, and check off all essential items for their upcoming trips.',
        },
      },
    },
  ];

  // Mapea los proyectos y selecciona la traducción correcta según el idioma actual
  const projects = projectsData.map((project) => ({
    ...project,
    title: project.translations[language].title,
    description: project.translations[language].description,
  }));

  return (
    <section id="proyectos" className="projects">
      <h2 className="section-title">{t.projects.title}</h2>
      <p className="section-subtitle">{t.projects.subtitle}</p>

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
                  {t.projects.codeBtn}
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  {t.projects.demoBtn}
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
