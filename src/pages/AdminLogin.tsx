import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-heavy);
  width: 100%;
  max-width: 400px;
`;

const LoginTitle = styled.h1`
  text-align: center;
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-size: 2rem;
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

const LoginButton = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: var(--primary-dark);
  }
  
  &:disabled {
    background: var(--text-light);
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1rem;
`;

const AdminLogin: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.data.user));
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Email ou senha incorretos');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoginTitle>{t('admin.login.title')}</LoginTitle>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Icon>
              <FiUser />
            </Icon>
            <Input
              type="email"
              placeholder={t('admin.login.username')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Icon>
              <FiLock />
            </Icon>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('admin.login.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
          </InputGroup>
          
          <LoginButton type="submit" disabled={loading}>
            {loading ? t('common.loading') : t('admin.login.login')}
          </LoginButton>
        </Form>
        
        {error && <ErrorMessage>{t('admin.login.error')}</ErrorMessage>}
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <a 
            href="/forgot-password" 
            style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '500' }}
          >
            Esqueceu sua senha?
          </a>
        </div>
        
        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-light)' }}>
          Não tem uma conta? <a href="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Criar conta</a>
        </div>
      </LoginCard>
    </LoginContainer>
  );
};

export default AdminLogin;
