import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  padding: 2rem;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: var(--border-radius);
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  box-shadow: var(--shadow-large);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: var(--text-primary);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  padding-left: 3rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
  
  &:invalid {
    border-color: #e74c3c;
  }
`;

const Icon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
  font-size: 1.25rem;
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

const Button = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: var(--text-light);
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fdf2f2;
  border: 1px solid #fecaca;
  border-radius: var(--border-radius);
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 1rem;
  padding: 0.75rem;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: var(--border-radius);
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: var(--text-secondary);
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #f3f3f3;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return false;
    }

    if (formData.name.trim().length < 2) {
      setError('Nome deve ter pelo menos 2 caracteres');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Email é obrigatório');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Email inválido');
      return false;
    }

    if (!formData.password) {
      setError('Senha é obrigatória');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Senhas não coincidem');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Conta criada com sucesso! Você pode fazer login agora.');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          navigate('/admin/login');
        }, 2000);
      } else {
        setError(data.message || 'Erro ao criar conta');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <BackButton to="/">
          <FiArrowLeft />
          Voltar ao site
        </BackButton>

        <Header>
          <Title>Criar Conta</Title>
          <Subtitle>Junte-se à equipe Mundo dos Bots</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Digite seu nome completo"
              required
            />
            <Icon>
              <FiUser />
            </Icon>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Digite seu email"
              required
            />
            <Icon>
              <FiMail />
            </Icon>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Digite sua senha"
              required
            />
            <Icon>
              <FiLock />
            </Icon>
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirme sua senha"
              required
            />
            <Icon>
              <FiLock />
            </Icon>
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </PasswordToggle>
          </FormGroup>

          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner />
                Criando conta...
              </>
            ) : (
              'Criar Conta'
            )}
          </Button>
        </Form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <LoginLink>
          Já tem uma conta? <Link to="/admin/login">Faça login</Link>
        </LoginLink>
      </Card>
    </Container>
  );
};

export default Register;

