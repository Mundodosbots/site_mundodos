import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiLock, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';

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
  padding: 1rem 3rem 1rem 3rem;
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

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: var(--primary-color);
  }
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

const Message = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  padding: 1rem;
  border-radius: var(--border-radius);
  text-align: center;
  font-size: 0.9rem;
  background: ${props => {
    switch (props.$type) {
      case 'success': return '#d4edda';
      case 'error': return '#f8d7da';
      case 'info': return '#d1ecf1';
      default: return '#f8f9fa';
    }
  }};
  color: ${props => {
    switch (props.$type) {
      case 'success': return '#155724';
      case 'error': return '#721c24';
      case 'info': return '#0c5460';
      default: return '#212529';
    }
  }};
  border: 1px solid ${props => {
    switch (props.$type) {
      case 'success': return '#c3e6cb';
      case 'error': return '#f5c6cb';
      case 'info': return '#bee5eb';
      default: return '#dee2e6';
    }
  }};
`;

const PasswordStrength = styled.div<{ $strength: number }>`
  height: 4px;
  border-radius: 2px;
  background: ${props => {
    if (props.$strength >= 4) return '#28a745';
    if (props.$strength >= 3) return '#ffc107';
    if (props.$strength >= 2) return '#fd7e14';
    return '#dc3545';
  }};
  transition: all 0.3s ease;
  width: ${props => props.$strength * 25}%;
`;

const PasswordHint = styled.p`
  font-size: 0.85rem;
  color: var(--text-light);
  margin-top: 0.5rem;
`;

const SuccessContainer = styled.div`
  text-align: center;
  
  svg {
    font-size: 4rem;
    color: #28a745;
    margin-bottom: 1rem;
  }
  
  h2 {
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--text-light);
    margin-bottom: 2rem;
  }
  
  button {
    background: var(--primary-color);
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    
    &:hover {
      background: var(--primary-dark);
    }
  }
`;

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return Math.min(strength, 4);
  };

  useEffect(() => {
    validateToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const validateToken = async () => {
    if (!token) {
      setMessage({ type: 'error', text: 'Token não fornecido' });
      setValidating(false);
      return;
    }

    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE}/auth/validate-reset-token/${token}`);
      const data = await response.json();

      if (response.ok) {
        setIsTokenValid(true);
        setUserEmail(data.data.email);
      } else {
        setMessage({ type: 'error', text: 'Link inválido ou expirado' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao validar o link' });
    } finally {
      setValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas não coincidem' });
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'A senha deve ter pelo menos 6 caracteres' });
      return;
    }

    setLoading(true);

    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setResetSuccess(true);
      } else {
        setMessage({
          type: 'error',
          text: data.message || 'Erro ao resetar senha'
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

  if (validating) {
    return (
      <Container>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Message $type="info">Validando link...</Message>
        </Card>
      </Container>
    );
  }

  if (resetSuccess) {
    return (
      <Container>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SuccessContainer>
            <FiCheckCircle />
            <h2>Senha resetada com sucesso!</h2>
            <p>Sua senha foi alterada. Agora você pode fazer login com sua nova senha.</p>
            <button onClick={() => navigate('/admin/login')}>
              Ir para o login
            </button>
          </SuccessContainer>
        </Card>
      </Container>
    );
  }

  if (!isTokenValid) {
    return (
      <Container>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {message && <Message $type={message.type}>{message.text}</Message>}
          <button 
            onClick={() => navigate('/forgot-password')}
            style={{ marginTop: '1rem', width: '100%', padding: '1rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: 'var(--border-radius)', cursor: 'pointer' }}
          >
            Solicitar novo link
          </button>
        </Card>
      </Container>
    );
  }

  const passwordStrength = calculatePasswordStrength(newPassword);

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Definir nova senha</Title>
        <Subtitle>
          Resetando senha para: <strong>{userEmail}</strong>
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          <div>
            <InputGroup>
              <Icon>
                <FiLock />
              </Icon>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <PasswordToggle
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </PasswordToggle>
            </InputGroup>
            {newPassword && (
              <>
                <PasswordStrength $strength={passwordStrength} style={{ marginTop: '0.5rem' }} />
                <PasswordHint>
                  Força da senha: {
                    passwordStrength >= 4 ? 'Forte' :
                    passwordStrength >= 3 ? 'Média' :
                    passwordStrength >= 2 ? 'Fraca' : 'Muito fraca'
                  }
                </PasswordHint>
              </>
            )}
          </div>

          <InputGroup>
            <Icon>
              <FiLock />
            </Icon>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
          </InputGroup>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Resetando...' : 'Resetar senha'}
          </SubmitButton>
        </Form>

        {message && (
          <Message $type={message.type} style={{ marginTop: '1.5rem' }}>
            {message.text}
          </Message>
        )}
      </Card>
    </Container>
  );
};

export default ResetPassword;

