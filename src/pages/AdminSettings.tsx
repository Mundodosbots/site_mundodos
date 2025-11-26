import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSettings, FiActivity, FiSave, FiX, FiZap, FiCpu, FiGlobe, FiArrowLeft } from 'react-icons/fi';

const SettingsContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SettingsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--border-color);
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--text-light);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9rem;
  
  &:hover {
    background: var(--text-secondary);
    transform: translateX(-3px);
  }
`;

const SettingsTitle = styled.h1`
  color: var(--primary-color);
  font-size: 2rem;
  margin: 0;
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const SettingsCard = styled(motion.div)`
  background: white;
  border-radius: var(--border-radius-large);
  padding: 2rem;
  box-shadow: var(--shadow-medium);
  border: 2px solid var(--border-color);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
`;

const CardTitle = styled.h2`
  color: var(--primary-color);
  margin: 0;
  font-size: 1.5rem;
`;

const CardIcon = styled.div`
  color: var(--primary-color);
  font-size: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(48, 46, 97, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  background: white;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(48, 46, 97, 0.1);
  }
`;

const Switch = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
`;

const SwitchInput = styled.input`
  display: none;
`;

const SwitchSlider = styled.div<{ checked: boolean }>`
  width: 50px;
  height: 24px;
  background: ${props => props.checked ? 'var(--primary-color)' : '#ccc'};
  border-radius: 12px;
  position: relative;
  transition: var(--transition);
  
  &:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${props => props.checked ? '26px' : '2px'};
    transition: var(--transition);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'success' | 'danger' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  background: ${props => {
    switch (props.variant) {
      case 'secondary': return 'var(--text-light)';
      case 'success': return '#28a745';
      case 'danger': return '#dc3545';
      default: return 'var(--primary-color)';
    }
  }};
  color: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusBadge = styled.span<{ status: 'success' | 'error' | 'warning' | 'info' }>`
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  font-weight: 600;
  
  background: ${props => {
    switch (props.status) {
      case 'success': return '#d4edda';
      case 'error': return '#f8d7da';
      case 'warning': return '#fff3cd';
      default: return '#d1ecf1';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'success': return '#155724';
      case 'error': return '#721c24';
      case 'warning': return '#856404';
      default: return '#0c5460';
    }
  }};
`;

const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  background: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.type === 'success' ? '#c3e6cb' : '#f5c6cb'};
`;

interface Settings {
  pabbly: {
    api_key: string;
    base_url: string;
    webhook_url: string;
    workflow_id: string;
    auto_schedule_enabled: boolean;
    auto_schedule_time: string;
    timezone: string;
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

const AdminSettings: React.FC = () => {
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState<Settings>({
    pabbly: {
      api_key: '',
      base_url: 'https://api.pabbly.com/v1',
      webhook_url: '',
      workflow_id: '',
      auto_schedule_enabled: false,
      auto_schedule_time: '09:00',
      timezone: 'America/Sao_Paulo'
    },
    openai: {
      api_key: '',
      model: 'gpt-3.5-turbo',
      max_tokens: 1000,
      temperature: 0.7,
      enabled: false
    },
    gemini: {
      api_key: '',
      model: 'gemini-pro',
      max_tokens: 1000,
      temperature: 0.7,
      enabled: false
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [testing, setTesting] = useState<string | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
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

  const saveSettings = async (category: keyof Settings) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/settings/${category}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(settings[category])
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao salvar configurações' });
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async (service: string) => {
    try {
      setTesting(service);
      const response = await fetch(`/api/settings/test-${service}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: data.message });
      } else {
        setMessage({ type: 'error', text: data.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: `Erro ao testar conexão com ${service}` });
    } finally {
      setTesting(null);
    }
  };

  const updateSetting = (category: keyof Settings, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleBackToDashboard = () => {
    navigate('/admin/dashboard');
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <HeaderLeft>
          <FiSettings size={32} color="var(--primary-color)" />
          <SettingsTitle>Configurações do Sistema</SettingsTitle>
        </HeaderLeft>
        <BackButton onClick={handleBackToDashboard}>
          <FiArrowLeft />
          Voltar ao Dashboard
        </BackButton>
      </SettingsHeader>

      {message && (
        <Message type={message.type}>
          {message.text}
          <Button 
            variant="secondary" 
            onClick={() => setMessage(null)}
            style={{ marginLeft: '1rem', padding: '0.25rem 0.5rem' }}
          >
            <FiX />
          </Button>
        </Message>
      )}

      <SettingsGrid>
        {/* Configurações Pabbly */}
        <SettingsCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CardHeader>
            <CardIcon>
              <FiZap />
            </CardIcon>
            <CardTitle>Pabbly Connect</CardTitle>
            <StatusBadge status={settings.pabbly.api_key ? 'success' : 'warning'}>
              {settings.pabbly.api_key ? 'Configurado' : 'Não configurado'}
            </StatusBadge>
          </CardHeader>

          <FormGroup>
            <Label>API Key</Label>
            <Input
              type="password"
              value={settings.pabbly.api_key}
              onChange={(e) => updateSetting('pabbly', 'api_key', e.target.value)}
              placeholder="Sua API Key do Pabbly"
            />
          </FormGroup>

          <FormGroup>
            <Label>URL Base</Label>
            <Input
              type="url"
              value={settings.pabbly.base_url}
              onChange={(e) => updateSetting('pabbly', 'base_url', e.target.value)}
              placeholder="https://api.pabbly.com/v1"
            />
          </FormGroup>

          <FormGroup>
            <Label>Webhook URL</Label>
            <Input
              type="url"
              value={settings.pabbly.webhook_url}
              onChange={(e) => updateSetting('pabbly', 'webhook_url', e.target.value)}
              placeholder="https://seu-site.com/webhook"
            />
          </FormGroup>

          <FormGroup>
            <Label>ID do Workflow</Label>
            <Input
              value={settings.pabbly.workflow_id}
              onChange={(e) => updateSetting('pabbly', 'workflow_id', e.target.value)}
              placeholder="ID do workflow do Pabbly"
            />
          </FormGroup>

          <FormGroup>
            <Label>Agendamento Automático</Label>
            <Switch>
              <SwitchInput
                type="checkbox"
                checked={settings.pabbly.auto_schedule_enabled}
                onChange={(e) => updateSetting('pabbly', 'auto_schedule_enabled', e.target.checked)}
              />
              <SwitchSlider checked={settings.pabbly.auto_schedule_enabled} />
              {settings.pabbly.auto_schedule_enabled ? 'Ativado' : 'Desativado'}
            </Switch>
          </FormGroup>

          <ButtonGroup>
            <Button
              onClick={() => saveSettings('pabbly')}
              disabled={loading}
            >
              <FiSave />
              Salvar
            </Button>
            <Button
              variant="secondary"
              onClick={() => testConnection('pabbly')}
              disabled={testing === 'pabbly'}
            >
              <FiActivity />
              {testing === 'pabbly' ? 'Testando...' : 'Testar Conexão'}
            </Button>
          </ButtonGroup>
        </SettingsCard>

        {/* Configurações OpenAI */}
        <SettingsCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <CardHeader>
            <CardIcon>
              <FiCpu />
            </CardIcon>
            <CardTitle>OpenAI</CardTitle>
            <StatusBadge status={settings.openai.enabled ? 'success' : 'info'}>
              {settings.openai.enabled ? 'Ativo' : 'Inativo'}
            </StatusBadge>
          </CardHeader>

          <FormGroup>
            <Label>API Key</Label>
            <Input
              type="password"
              value={settings.openai.api_key}
              onChange={(e) => updateSetting('openai', 'api_key', e.target.value)}
              placeholder="Sua API Key da OpenAI"
            />
          </FormGroup>

          <FormGroup>
            <Label>Modelo</Label>
            <Select
              value={settings.openai.model}
              onChange={(e) => updateSetting('openai', 'model', e.target.value)}
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Máximo de Tokens</Label>
            <Input
              type="number"
              min="1"
              max="4000"
              value={settings.openai.max_tokens}
              onChange={(e) => updateSetting('openai', 'max_tokens', parseInt(e.target.value))}
            />
          </FormGroup>

          <FormGroup>
            <Label>Temperatura</Label>
            <Input
              type="number"
              min="0"
              max="2"
              step="0.1"
              value={settings.openai.temperature}
              onChange={(e) => updateSetting('openai', 'temperature', parseFloat(e.target.value))}
            />
          </FormGroup>

          <FormGroup>
            <Label>Ativar OpenAI</Label>
            <Switch>
              <SwitchInput
                type="checkbox"
                checked={settings.openai.enabled}
                onChange={(e) => updateSetting('openai', 'enabled', e.target.checked)}
              />
              <SwitchSlider checked={settings.openai.enabled} />
              {settings.openai.enabled ? 'Ativado' : 'Desativado'}
            </Switch>
          </FormGroup>

          <ButtonGroup>
            <Button
              onClick={() => saveSettings('openai')}
              disabled={loading}
            >
              <FiSave />
              Salvar
            </Button>
            <Button
              variant="secondary"
              onClick={() => testConnection('openai')}
              disabled={testing === 'openai'}
            >
              <FiActivity />
              {testing === 'openai' ? 'Testando...' : 'Testar Conexão'}
            </Button>
          </ButtonGroup>
        </SettingsCard>

        {/* Configurações Gemini */}
        <SettingsCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <CardHeader>
            <CardIcon>
              <FiGlobe />
            </CardIcon>
            <CardTitle>Google Gemini</CardTitle>
            <StatusBadge status={settings.gemini.enabled ? 'success' : 'info'}>
              {settings.gemini.enabled ? 'Ativo' : 'Inativo'}
            </StatusBadge>
          </CardHeader>

          <FormGroup>
            <Label>API Key</Label>
            <Input
              type="password"
              value={settings.gemini.api_key}
              onChange={(e) => updateSetting('gemini', 'api_key', e.target.value)}
              placeholder="Sua API Key do Gemini"
            />
          </FormGroup>

          <FormGroup>
            <Label>Modelo</Label>
            <Select
              value={settings.gemini.model}
              onChange={(e) => updateSetting('gemini', 'model', e.target.value)}
            >
              <option value="gemini-pro">Gemini Pro</option>
              <option value="gemini-pro-vision">Gemini Pro Vision</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>Máximo de Tokens</Label>
            <Input
              type="number"
              min="1"
              max="8000"
              value={settings.gemini.max_tokens}
              onChange={(e) => updateSetting('gemini', 'max_tokens', parseInt(e.target.value))}
            />
          </FormGroup>

          <FormGroup>
            <Label>Temperatura</Label>
            <Input
              type="number"
              min="0"
              max="2"
              step="0.1"
              value={settings.gemini.temperature}
              onChange={(e) => updateSetting('gemini', 'temperature', parseFloat(e.target.value))}
            />
          </FormGroup>

          <FormGroup>
            <Label>Ativar Gemini</Label>
            <Switch>
              <SwitchInput
                type="checkbox"
                checked={settings.gemini.enabled}
                onChange={(e) => updateSetting('gemini', 'enabled', e.target.checked)}
              />
              <SwitchSlider checked={settings.gemini.enabled} />
              {settings.gemini.enabled ? 'Ativado' : 'Desativado'}
            </Switch>
          </FormGroup>

          <ButtonGroup>
            <Button
              onClick={() => saveSettings('gemini')}
              disabled={loading}
            >
              <FiSave />
              Salvar
            </Button>
            <Button
              variant="secondary"
              onClick={() => testConnection('gemini')}
              disabled={testing === 'gemini'}
            >
              <FiActivity />
              {testing === 'gemini' ? 'Testando...' : 'Testar Conexão'}
            </Button>
          </ButtonGroup>
        </SettingsCard>
      </SettingsGrid>
    </SettingsContainer>
  );
};

export default AdminSettings;
