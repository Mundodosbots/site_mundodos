import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiZap, FiCpu, FiGlobe, FiSettings, FiCheck, FiX } from 'react-icons/fi';

const SummaryContainer = styled(motion.div)`
  background: white;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const SummaryHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SummaryTitle = styled.h3`
  color: var(--primary-color);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9rem;
  
  &:hover {
    background: var(--primary-dark);
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1.5rem 2rem;
`;

const ServiceCard = styled.div<{ configured: boolean }>`
  padding: 1rem;
  border-radius: var(--border-radius);
  border: 2px solid ${props => props.configured ? '#d4edda' : '#f8d7da'};
  background: ${props => props.configured ? '#f8fff9' : '#fff8f8'};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ServiceIcon = styled.div<{ configured: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.configured ? '#28a745' : '#dc3545'};
  color: white;
  font-size: 1.2rem;
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceName = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`;

const ServiceStatus = styled.div<{ configured: boolean }>`
  font-size: 0.8rem;
  color: ${props => props.configured ? '#28a745' : '#dc3545'};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

interface ApiSettings {
  pabbly: {
    api_key: string;
    base_url: string;
    webhook_url: string;
    workflow_id: string;
    auto_schedule_enabled: boolean;
  };
  openai: {
    api_key: string;
    model: string;
    max_tokens: number;
    temperature: number;
    enabled: boolean;
  };
  gemini: {
    api_key: string;
    model: string;
    max_tokens: number;
    temperature: number;
    enabled: boolean;
  };
}

const ApiSettingsSummary: React.FC = () => {
  const [settings, setSettings] = useState<ApiSettings>({
    pabbly: {
      api_key: '',
      base_url: '',
      webhook_url: '',
      workflow_id: '',
      auto_schedule_enabled: false
    },
    openai: {
      api_key: '',
      model: '',
      max_tokens: 0,
      temperature: 0,
      enabled: false
    },
    gemini: {
      api_key: '',
      model: '',
      max_tokens: 0,
      temperature: 0,
      enabled: false
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/settings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSettings(prev => ({
            ...prev,
            ...data.data
          }));
        }
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      name: 'Pabbly Connect',
      icon: <FiZap />,
      configured: !!settings.pabbly.api_key,
      status: settings.pabbly.api_key ? 'Configurado' : 'Não configurado'
    },
    {
      name: 'OpenAI',
      icon: <FiCpu />,
      configured: !!settings.openai.api_key && settings.openai.enabled,
      status: settings.openai.api_key && settings.openai.enabled ? 'Ativo' : 'Inativo'
    },
    {
      name: 'Google Gemini',
      icon: <FiGlobe />,
      configured: !!settings.gemini.api_key && settings.gemini.enabled,
      status: settings.gemini.api_key && settings.gemini.enabled ? 'Ativo' : 'Inativo'
    }
  ];

  if (loading) {
    return (
      <SummaryContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SummaryHeader>
          <SummaryTitle>
            <FiSettings />
            Configurações de APIs
          </SummaryTitle>
        </SummaryHeader>
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Carregando configurações...
        </div>
      </SummaryContainer>
    );
  }

  return (
    <SummaryContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <SummaryHeader>
        <SummaryTitle>
          <FiSettings />
          Configurações de APIs
        </SummaryTitle>
        <ViewAllButton onClick={() => window.location.href = '/admin/settings'}>
          Ver Todas
        </ViewAllButton>
      </SummaryHeader>
      
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            configured={service.configured}
            as={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ServiceIcon configured={service.configured}>
              {service.icon}
            </ServiceIcon>
            <ServiceInfo>
              <ServiceName>{service.name}</ServiceName>
              <ServiceStatus configured={service.configured}>
                {service.configured ? <FiCheck /> : <FiX />}
                {service.status}
              </ServiceStatus>
            </ServiceInfo>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </SummaryContainer>
  );
};

export default ApiSettingsSummary;
