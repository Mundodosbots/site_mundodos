import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDollarSign, FiHome, FiTrendingUp, FiUsers, FiCheck } from 'react-icons/fi';
import styled from 'styled-components';
import emailjs from 'emailjs-com';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  text-align: center;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  
  svg {
    font-size: 2rem;
    color: white;
  }
`;

const BenefitsList = styled.ul`
  list-style: none;
  margin: 1.5rem 0;
  
  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    color: var(--text-secondary);
    
    svg {
      color: var(--primary-color);
      flex-shrink: 0;
    }
  }
`;

const FormSection = styled.section`
  padding: 80px 0;
  background: var(--background-gray);
`;

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 3rem;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-medium);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
  }
  
  input, select, textarea {
    width: 100%;
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    transition: var(--transition);
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(3, 95, 54, 0.1);
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 120px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
`;

const Franchise: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    estado: '',
    investimento: '',
    experiencia: '',
    mensagem: ''
  });

  // Inicializar EmailJS
  useEffect(() => {
    emailjs.init('IRewF75Z0EAvt6_3_sXIh');
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Configurações do EmailJS
    const serviceID = 'S4sjIZCgEdiqToWdL';
    const templateID = 'template_ibjk6in';
    const userID = 'IRewF75Z0EAvt6_3_sXIh';
    
    // Preparar dados do template
    const templateParams = {
      to_email: 'gelson@mundodosbots.com.br',
      from_name: formData.nome,
      from_email: formData.email,
      telefone: formData.telefone,
      cidade: formData.cidade,
      estado: formData.estado,
      investimento: formData.investimento,
      experiencia: formData.experiencia || 'Não informado',
      mensagem: formData.mensagem || 'Sem mensagem adicional',
      subject: 'Nova Solicitação de Franquia - Mundo dos Bots'
    };
    
    // Enviar email
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('Email enviado com sucesso!', response.status, response.text);
        alert('Obrigado pelo interesse! Seus dados foram enviados com sucesso. Entraremos em contato em breve.');
        // Limpar formulário
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          cidade: '',
          estado: '',
          investimento: '',
          experiencia: '',
          mensagem: ''
        });
      })
      .catch((error) => {
        console.error('Erro ao enviar email:', error);
        console.error('Detalhes do erro:', {
          status: error.status,
          text: error.text,
          message: error.message
        });
        alert(`Erro ao enviar email: ${error.text || error.message || 'Erro desconhecido'}. Verifique o console para mais detalhes.`);
      });
  };

  const features = [
    {
      icon: <FiDollarSign />,
      title: 'Baixo Investimento',
      description: 'Invista a partir de R$ 5.000 e comece seu negócio digital imediatamente.',
      benefits: ['Investimento inicial baixo', 'Sem custos de aluguel', 'Sem estoque físico', 'ROI rápido']
    },
    {
      icon: <FiHome />,
      title: 'Modelo Home-Office',
      description: 'Trabalhe de casa com total flexibilidade de horários e localização.',
      benefits: ['Trabalhe de qualquer lugar', 'Horários flexíveis', 'Sem deslocamento', 'Equilíbrio vida-trabalho']
    },
    {
      icon: <FiTrendingUp />,
      title: 'Alta Lucratividade',
      description: 'Margens de lucro superiores a 80% com produtos digitais de alta demanda.',
      benefits: ['Margens de 80%+', 'Produtos digitais', 'Escalabilidade', 'Receita recorrente']
    },
    {
      icon: <FiUsers />,
      title: 'Suporte Completo',
      description: 'Receba treinamento, suporte técnico e marketing para garantir seu sucesso.',
      benefits: ['Treinamento completo', 'Suporte técnico 24/7', 'Material de marketing', 'Mentoria']
    }
  ];


  return (
    <>
      <Helmet>
        <title>Franquia Digital - Mundo dos Bots | Baixo Investimento, Alta Lucratividade</title>
        <meta name="description" content="Invista em uma franquia digital com baixo investimento e alta lucratividade. Modelo home-office com suporte completo. Seja um franqueado de sucesso!" />
      </Helmet>

      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Franquia Digital Mundo dos Bots</h1>
            <p style={{ fontSize: '1.3rem', marginTop: '1rem', opacity: 0.9 }}>
              Baixo investimento, alta lucratividade e modelo home-office. 
              Faça parte da revolução dos chatbots!
            </p>
          </motion.div>
        </div>
      </HeroSection>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Por que Investir na Mundo dos Bots?</h2>
            <p>Um modelo de negócio digital inovador com todas as vantagens para seu sucesso</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <FeatureIcon>
                  {feature.icon}
                </FeatureIcon>
                <h3 style={{ marginBottom: '1rem' }}>{feature.title}</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
                <BenefitsList>
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx}>
                      <FiCheck />
                      {benefit}
                    </li>
                  ))}
                </BenefitsList>
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Como Funciona</h2>
            <p>Processo simples e rápido para se tornar um franqueado de sucesso</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              {
                step: '01',
                title: 'Contato Inicial',
                description: 'Entre em contato conosco e conheça melhor o modelo de negócio.'
              },
              {
                step: '02',
                title: 'Análise de Perfil',
                description: 'Avaliamos seu perfil e verificamos se há compatibilidade com o modelo.'
              },
              {
                step: '03',
                title: 'Treinamento',
                description: 'Receba treinamento completo sobre produtos, vendas e operação.'
              },
              {
                step: '04',
                title: 'Início das Operações',
                description: 'Comece a vender e gerar receita com nosso suporte completo.'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                style={{
                  textAlign: 'center',
                  padding: '2rem',
                  background: 'white',
                  borderRadius: 'var(--border-radius-large)',
                  boxShadow: 'var(--shadow-light)'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'var(--primary-color)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  color: 'white',
                  fontSize: '1.5rem',
                  fontWeight: '700'
                }}>
                  {step.step}
                </div>
                <h3 style={{ marginBottom: '1rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FormSection>
        <div className="container">
          <div className="section-title">
            <h2>Quero ser um Franqueado</h2>
            <p>Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas</p>
          </div>

          <FormContainer>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="nome">Nome Completo *</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="email">E-mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="telefone">Telefone *</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FormGroup>
                  <label htmlFor="cidade">Cidade *</label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="estado">Estado *</label>
                  <select
                    id="estado"
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </FormGroup>
              </div>

              <FormGroup>
                <label htmlFor="investimento">Disponibilidade de Investimento *</label>
                <select
                  id="investimento"
                  name="investimento"
                  value={formData.investimento}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="780-1500">R$ 780 - R$ 1.500 mensais</option>
                  <option value="1500-3000">R$ 1.500 - R$ 3.000 mensais</option>
                  <option value="3000-5000">R$ 3.000 - R$ 5.000 mensais</option>
                  <option value="5000-10000">R$ 5.000 - R$ 10.000 mensais</option>
                  <option value="10000+">Acima de R$ 10.000 mensais</option>
                  <option value="ate-5k">Até R$ 5.000 (investimento único)</option>
                  <option value="20k">R$ 20.000 (investimento único)</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label htmlFor="experiencia">Experiência Profissional</label>
                <select
                  id="experiencia"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione...</option>
                  <option value="vendas">Vendas</option>
                  <option value="marketing">Marketing</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="administracao">Administração</option>
                  <option value="outros">Outros</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label htmlFor="mensagem">Mensagem (Opcional)</label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  placeholder="Conte-nos um pouco sobre você e suas expectativas..."
                />
              </FormGroup>

              <SubmitButton type="submit">
                Quero ser um Franqueado
                <FiArrowRight style={{ marginLeft: '0.5rem' }} />
              </SubmitButton>
            </form>
          </FormContainer>
        </div>
      </FormSection>
    </>
  );
};

export default Franchise;
