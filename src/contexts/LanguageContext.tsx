import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import pt from '../locales/pt.json';
import es from '../locales/es.json';
import en from '../locales/en.json';

export type Language = 'pt' | 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translations: typeof pt;
}

const translations = {
  pt,
  es,
  en
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    // Carregar idioma salvo no localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['pt', 'es', 'en'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Detectar idioma do navegador
      const browserLanguage = navigator.language.split('-')[0];
      if (browserLanguage === 'es') {
        setLanguageState('es');
      } else if (browserLanguage === 'en') {
        setLanguageState('en');
      } else {
        setLanguageState('pt');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback para português se a chave não existir
        value = keys.reduce((obj: any, k) => obj?.[k], translations.pt) || key;
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    translations: translations[language]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
