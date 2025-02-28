import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Verifica si hay un idioma guardado, si no, usa español como predeterminado
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'es';
  });

  // Guarda el idioma seleccionado en localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Función para cambiar el idioma
  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el idioma
export const useLanguage = () => useContext(LanguageContext);
