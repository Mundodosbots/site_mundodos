import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteKeywords: string;
  siteLogo: string;
  companyName: string;
  cnpj: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  maintenanceMode: boolean;
  allowComments: boolean;
  enableAnalytics: boolean;
  googleAnalyticsId: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
}

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateLogo: (logoUrl: string) => void;
}

const defaultSettings: SiteSettings = {
  siteName: 'Mundo dos Bots',
  siteDescription: 'Especialistas em chatbots e automação',
  siteKeywords: 'chatbot, automação, WhatsApp, inteligência artificial, marketing digital',
  siteLogo: '/src/assets/logo-horizontal.png',
  companyName: 'IA Soluções de Tecnologia em Atendimento LTDA',
  cnpj: '43.327.090/0001-32',
  phone: '(66) 98444-3050',
  whatsapp: '(66) 98444-3050',
  email: 'contato@mundodosbots.com.br',
  address: 'R. das Aroeiras, 766 - Sala A - St. Comercial, Sinop - MT, 78550-224',
  facebook: 'https://facebook.com/mundodosbots',
  instagram: 'https://instagram.com/mundodosbots',
  linkedin: 'https://linkedin.com/company/mundodosbots',
  maintenanceMode: false,
  allowComments: true,
  enableAnalytics: true,
  googleAnalyticsId: 'GA-XXXXXXXXX',
  metaTitle: 'Mundo dos Bots - Especialistas em Chatbots e Automação',
  metaDescription: 'Transforme sua comunicação com inteligência artificial. Soluções completas em chatbots para WhatsApp, sites e automação de marketing.',
  canonicalUrl: 'https://mundodosbots.com.br'
};

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};

interface SiteSettingsProviderProps {
  children: ReactNode;
}

export const SiteSettingsProvider: React.FC<SiteSettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    // Carregar configurações salvas no localStorage
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      } catch (error) {
        console.error('Erro ao carregar configurações do site:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('siteSettings', JSON.stringify(updatedSettings));
  };

  const updateLogo = (logoUrl: string) => {
    updateSettings({ siteLogo: logoUrl });
  };

  const value: SiteSettingsContextType = {
    settings,
    updateSettings,
    updateLogo
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};
