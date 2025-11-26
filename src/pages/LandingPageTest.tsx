import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';

const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fffe 0%, #e8f5f3 100%);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 100px 0 80px;
  text-align: center;
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--secondary-color);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-medium);
  
  &:hover {
    background: #e55a2b;
    transform: translateY(-3px);
    box-shadow: var(--shadow-heavy);
  }
`;

const FormSection = styled.div`
  max-width: 500px;
  margin: 2rem auto 0;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  input, select {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.9);
    
    &:focus {
      outline: none;
      background: white;
    }
  }
`;

const LandingPageTest: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    investimento: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulário enviado:', formData);
    alert('Obrigado pelo interesse! Seus dados foram enviados com sucesso.');
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      investimento: ''
    });
  };

  return (
    <>
      <Helmet>
        <title>Teste Landing Page - Mundo dos Bots</title>
        <meta name="description" content="Página de teste da landing page" />
      </Helmet>

      <LandingContainer>
        <HeroSection>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>
                Teste Landing Page
              </h1>
              <p style={{ fontSize: '1.3rem', marginBottom: '2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem' }}>
                Esta é uma versão de teste da landing page para verificar se está funcionando.
              </p>
              
              <FormSection>
                <h3 style={{ color: 'white', marginBottom: '2rem' }}>Formulário de Teste</h3>
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <input
                      type="text"
                      name="nome"
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <input
                      type="email"
                      name="email"
                      placeholder="Seu melhor email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <input
                      type="tel"
                      name="telefone"
                      placeholder="Seu WhatsApp"
                      value={formData.telefone}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <input
                      type="text"
                      name="empresa"
                      placeholder="Nome da sua empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <select
                      name="investimento"
                      value={formData.investimento}
                      onChange={handleInputChange}
                    >
                      <option value="">Seu investimento mensal disponível</option>
                      <option value="780-1500">R$ 780 - R$ 1.500 mensais</option>
                      <option value="1500-3000">R$ 1.500 - R$ 3.000 mensais</option>
                      <option value="3000-5000">R$ 3.000 - R$ 5.000 mensais</option>
                      <option value="5000-10000">R$ 5.000 - R$ 10.000 mensais</option>
                      <option value="10000+">Acima de R$ 10.000 mensais</option>
                    </select>
                  </FormGroup>
                  
                  <CTAButton
                    type="submit"
                    style={{ width: '100%', marginTop: '1rem' }}
                  >
                    Testar Formulário
                    <FiArrowRight />
                  </CTAButton>
                </form>
              </FormSection>
            </motion.div>
          </div>
        </HeroSection>
      </LandingContainer>
    </>
  );
};

export default LandingPageTest;
