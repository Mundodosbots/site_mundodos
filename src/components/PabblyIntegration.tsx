import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSettings, FiSend, FiCalendar, FiBarChart2, FiCheckCircle, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: var(--border-radius-large);
  padding: 2rem;
  box-shadow: var(--shadow-light);
  border: 1px solid var(--border-color);
`;

const CardTitle = styled.h3`
  color: var(--primary-color);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatusIndicator = styled.div<{ status: 'connected' | 'disconnected' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  background: ${props => {
    switch (props.status) {
      case 'connected': return 'rgba(0, 212, 170, 0.1)';
      case 'disconnected': return 'rgba(255, 107, 53, 0.1)';
      case 'error': return 'rgba(255, 0, 0, 0.1)';
      default: return 'rgba(153, 153, 153, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'connected': return '#00d4aa';
      case 'disconnected': return '#ff6b35';
      case 'error': return '#ff0000';
      default: return '#999';
    }
  }};
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--text-primary);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(48, 46, 97, 0.1);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(48, 46, 97, 0.1);
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(48, 46, 97, 0.1);
  }
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'success' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  background: ${props => {
    switch (props.variant) {
      case 'secondary': return 'var(--secondary-color)';
      case 'success': return 'var(--accent-color)';
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

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Checkbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }
`;

const Alert = styled.div<{ type: 'success' | 'error' | 'info' }>`
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  background: ${props => {
    switch (props.type) {
      case 'success': return 'rgba(0, 212, 170, 0.1)';
      case 'error': return 'rgba(255, 0, 0, 0.1)';
      case 'info': return 'rgba(48, 46, 97, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success': return '#00d4aa';
      case 'error': return '#ff0000';
      case 'info': return 'var(--primary-color)';
    }
  }};
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

interface PabblyStatus {
  initialized: boolean;
  api_key_configured: boolean;
  webhook_url: string;
  base_url: string;
}

interface PublicationData {
  content: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  image_url?: string;
  platforms: string[];
  scheduled_time?: string;
  tags: string[];
  campaign: string;
  language: string;
}

const PabblyIntegration: React.FC = () => {
  // const { t } = useLanguage(); // Removido temporariamente até implementar traduções
  const [status, setStatus] = useState<PabblyStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [publicationData, setPublicationData] = useState<PublicationData>({
    content: {
      facebook: '',
      instagram: '',
      linkedin: ''
    },
    platforms: ['facebook', 'instagram', 'linkedin'],
    tags: ['MundoDosBots', 'Chatbots', 'Automação'],
    campaign: 'mundodosbots',
    language: 'pt'
  });

  // Verificar status da integração
  const checkStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/pabbly/status');
      const data = await response.json();
      
      if (data.success) {
        setStatus(data.data);
      } else {
        setMessage({ type: 'error', text: 'Erro ao verificar status' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    } finally {
      setLoading(false);
    }
  };

  // Testar conexão
  const testConnection = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/pabbly/test-connection');
      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Conexão estabelecida com sucesso!' });
        await checkStatus();
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao conectar' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    } finally {
      setLoading(false);
    }
  };

  // Publicar conteúdo
  const publishContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/pabbly/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(publicationData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Conteúdo enviado para publicação!' });
        // Limpar formulário
        setPublicationData({
          content: { facebook: '', instagram: '', linkedin: '' },
          platforms: ['facebook', 'instagram', 'linkedin'],
          tags: ['MundoDosBots', 'Chatbots', 'Automação'],
          campaign: 'mundodosbots',
          language: 'pt'
        });
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao publicar' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    } finally {
      setLoading(false);
    }
  };

  // Agendar publicação
  const schedulePost = async () => {
    if (!publicationData.scheduled_time) {
      setMessage({ type: 'error', text: 'Data e hora são obrigatórias para agendamento' });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/pabbly/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(publicationData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: `Publicação agendada para ${publicationData.scheduled_time}!` });
      } else {
        setMessage({ type: 'error', text: data.message || 'Erro ao agendar' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const getConnectionStatus = () => {
    if (!status) return 'disconnected';
    if (status.initialized && status.api_key_configured) return 'connected';
    return 'error';
  };

  return (
    <Container>
      <Header>
        <Title>Integração Pabbly - Automação de Redes Sociais</Title>
        <Subtitle>Gerencie suas publicações automáticas nas redes sociais</Subtitle>
      </Header>

      {message && (
        <Alert type={message.type}>
          {message.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          {message.text}
        </Alert>
      )}

      <Grid>
        {/* Status da Conexão */}
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle>
            <FiSettings />
            Status da Conexão
          </CardTitle>
          
          <StatusIndicator status={getConnectionStatus()}>
            {getConnectionStatus() === 'connected' ? <FiCheckCircle /> : <FiAlertCircle />}
            {getConnectionStatus() === 'connected' ? 'Conectado' : 'Desconectado'}
          </StatusIndicator>
          
          <div style={{ marginTop: '1rem' }}>
            <Button onClick={testConnection} disabled={loading}>
              {loading ? <LoadingSpinner /> : <FiRefreshCw />}
              Testar Conexão
            </Button>
          </div>
        </Card>

        {/* Publicação Imediata */}
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CardTitle>
            <FiSend />
            Publicação Imediata
          </CardTitle>
          
          <Form onSubmit={(e) => { e.preventDefault(); publishContent(); }}>
            <FormGroup>
              <Label>Conteúdo para Facebook:</Label>
              <Textarea
                value={publicationData.content.facebook}
                onChange={(e) => setPublicationData({
                  ...publicationData,
                  content: { ...publicationData.content, facebook: e.target.value }
                })}
                placeholder="Digite o conteúdo para Facebook..."
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Conteúdo para Instagram:</Label>
              <Textarea
                value={publicationData.content.instagram}
                onChange={(e) => setPublicationData({
                  ...publicationData,
                  content: { ...publicationData.content, instagram: e.target.value }
                })}
                placeholder="Digite o conteúdo para Instagram..."
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Conteúdo para LinkedIn:</Label>
              <Textarea
                value={publicationData.content.linkedin}
                onChange={(e) => setPublicationData({
                  ...publicationData,
                  content: { ...publicationData.content, linkedin: e.target.value }
                })}
                placeholder="Digite o conteúdo para LinkedIn..."
              />
            </FormGroup>
            
            <FormGroup>
              <Label>URL da Imagem (opcional):</Label>
              <Input
                type="url"
                value={publicationData.image_url || ''}
                onChange={(e) => setPublicationData({
                  ...publicationData,
                  image_url: e.target.value
                })}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Campanha:</Label>
              <Input
                value={publicationData.campaign}
                onChange={(e) => setPublicationData({
                  ...publicationData,
                  campaign: e.target.value
                })}
                placeholder="Nome da campanha"
              />
            </FormGroup>
            
            <Button type="submit" disabled={loading}>
              {loading ? <LoadingSpinner /> : <FiSend />}
              Publicar Agora
            </Button>
          </Form>
        </Card>

        {/* Agendamento */}
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CardTitle>
            <FiCalendar />
            Agendar Publicação
          </CardTitle>
          
          <Form onSubmit={(e) => { e.preventDefault(); schedulePost(); }}>
            <FormGroup>
              <Label>Data e Hora:</Label>
              <Input
                type="datetime-local"
                value={publicationData.scheduled_time || ''}
                onChange={(e) => setPublicationData({
                  ...publicationData,
                  scheduled_time: e.target.value
                })}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Plataformas:</Label>
              <CheckboxGroup>
                {['facebook', 'instagram', 'linkedin'].map(platform => (
                  <Checkbox key={platform}>
                    <input
                      type="checkbox"
                      checked={publicationData.platforms.includes(platform)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setPublicationData({
                            ...publicationData,
                            platforms: [...publicationData.platforms, platform]
                          });
                        } else {
                          setPublicationData({
                            ...publicationData,
                            platforms: publicationData.platforms.filter(p => p !== platform)
                          });
                        }
                      }}
                    />
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </FormGroup>
            
            <FormGroup>
              <Label>Tags (separadas por vírgula):</Label>
              <Input
                value={publicationData.tags.join(', ')}
                onChange={(e) => setPublicationData({
                  ...publicationData,
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                })}
                placeholder="MundoDosBots, Chatbots, Automação"
              />
            </FormGroup>
            
            <Button type="submit" variant="secondary" disabled={loading}>
              {loading ? <LoadingSpinner /> : <FiCalendar />}
              Agendar Publicação
            </Button>
          </Form>
        </Card>

        {/* Relatórios */}
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <CardTitle>
            <FiBarChart2 />
            Relatórios
          </CardTitle>
          
          <p style={{ color: '#666666', marginBottom: '1rem' }}>
            Acompanhe o desempenho das suas publicações automáticas.
          </p>
          
          <Button variant="success" onClick={() => window.open('/api/pabbly/reports/publications', '_blank')}>
            <FiBarChart2 />
            Ver Relatórios
          </Button>
        </Card>
      </Grid>
    </Container>
  );
};

export default PabblyIntegration;
