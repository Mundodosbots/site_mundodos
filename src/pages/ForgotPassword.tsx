import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { API_BASE_URL } from '../utils/config';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  padding: 2rem;
`;

const Card = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-heavy);
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const Subtitle = styled.p`
  text-align: center;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
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

const Icon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
`;

const SubmitButton = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover:not(:disabled) {
    background: var(--primary-dark);
  }
  
  &:disabled {
    background: var(--text-light);
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--primary-color);
  border: none;
  padding: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  margin-bottom: 1rem;
  
  &:hover {
    color: var(--primary-dark);
  }
`;

const Message = styled.div<{ $type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: var(--border-radius);
  text-align: center;
  font-size: 0.9rem;
  background: ${props => props.$type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$type === 'success' ? '#155724' : '#721c24'};
  border: 1px solid ${props => props.$type === 'success' ? '#c3e6cb' : '#f5c6cb'};
`;

const TokenDisplay = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: var(--border-radius);
  border: 1px dashed var(--border-color);
  margin-top: 1rem;
  
  p {
    margin: 0 0 0.5rem 0;
    font-size: 0.9rem;
    color: var(--text-light);
  }
  
  code {
    display: block;
    background: white;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.85rem;
    word-break: break-all;
    color: var(--primary-color);
  }
`;

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setResetToken(null);
    setLoading(true);

    try {
      const API_BASE = API_BASE_URL;
      const response = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Instruções para resetar sua senha foram enviadas. Verifique seu email.'
        });
        
        // Em desenvolvimento, mostra o token
        if (data.data?.resetToken) {
          setResetToken(data.data.resetToken);
        }
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Erro ao solicitar reset de senha'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Erro de conexão. Tente novamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoToReset = () => {
    if (resetToken) {
      navigate(`/reset-password/${resetToken}`);
    }
  };

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackButton onClick={() => navigate('/admin/login')}>
          <FiArrowLeft /> Voltar ao login
        </BackButton>

        <Title>Esqueceu sua senha?</Title>
        <Subtitle>
          Digite seu email cadastrado e enviaremos as instruções para resetar sua senha.
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Icon>
              <FiMail />
            </Icon>
            <Input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar instruções'}
          </SubmitButton>
        </Form>

        {message && (
          <Message $type={message.type} style={{ marginTop: '1.5rem' }}>
            {message.text}
          </Message>
        )}

        {resetToken && (
          <TokenDisplay>
            <p><strong>⚠️ MODO DE DESENVOLVIMENTO</strong></p>
            <p>Use este link para resetar sua senha:</p>
            <code 
              onClick={handleGoToReset} 
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Clique aqui para resetar sua senha
            </code>
          </TokenDisplay>
        )}
      </Card>
    </Container>
  );
};

export default ForgotPassword;

