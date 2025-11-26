import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGlobe, FiChevronDown } from 'react-icons/fi';
import { useLanguage, Language } from '../contexts/LanguageContext';

const LanguageSelectorContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

const CurrentLanguage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  box-shadow: 0 2px 8px rgba(3, 95, 54, 0.3);
  cursor: pointer;

  &:hover {
    background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(3, 95, 54, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.3rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(3, 95, 54, 0.1);
  overflow: hidden;
  z-index: 1000;
  min-width: 160px;
`;

const LanguageOption = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.isActive ? 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))' : 'transparent'};
  color: ${props => props.isActive ? 'white' : 'var(--text-color)'};
  font-weight: ${props => props.isActive ? '600' : '500'};
  font-size: 0.9rem;

  &:hover {
    background: ${props => props.isActive ? 'linear-gradient(135deg, var(--primary-dark), var(--primary-color))' : 'rgba(3, 95, 54, 0.08)'};
    transform: ${props => props.isActive ? 'none' : 'translateX(3px)'};
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
`;

const Flag = styled.span`
  font-size: 1rem;
`;

const LanguageName = styled.span`
  font-weight: 500;
  font-size: 0.85rem;
`;

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: Language) => {
    if (newLanguage === language) return;
    
    setIsChanging(true);
    setLanguage(newLanguage);
    setIsOpen(false);
    
    // Adicionar feedback visual
    const button = document.querySelector('.language-selector-button') as HTMLElement;
    if (button) {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
        setIsChanging(false);
      }, 300);
    } else {
      setIsChanging(false);
    }
  };

  return (
    <LanguageSelectorContainer onMouseLeave={() => setIsOpen(false)}>
      <CurrentLanguage 
        className="language-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        style={{ opacity: isChanging ? 0.7 : 1 }}
      >
        <motion.div
          animate={{ rotate: isChanging ? 360 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FiGlobe size={18} />
        </motion.div>
        <span>{currentLanguage?.flag}</span>
        <span>{currentLanguage?.name}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown size={16} />
        </motion.div>
      </CurrentLanguage>

      <AnimatePresence>
        {isOpen && (
          <Dropdown
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {languages.map((lang) => (
              <LanguageOption
                key={lang.code}
                isActive={language === lang.code}
                onClick={() => handleLanguageChange(lang.code)}
              >
                <Flag>{lang.flag}</Flag>
                <LanguageName>{lang.name}</LanguageName>
              </LanguageOption>
            ))}
          </Dropdown>
        )}
      </AnimatePresence>
    </LanguageSelectorContainer>
  );
};

export default LanguageSelector;
