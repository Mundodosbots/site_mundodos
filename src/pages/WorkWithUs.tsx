import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FiUsers, FiTrendingUp, FiHeart, FiZap, FiSend, FiMapPin, FiClock, FiDollarSign } from 'react-icons/fi';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;
`;

const WorkSection = styled.section`
  padding: 80px 0;
`;

const JobCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  margin-bottom: 2rem;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const JobInfo = styled.div`
  h3 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  .job-meta {
    display: flex;
    gap: 1rem;
    color: var(--text-light);
    font-size: 0.9rem;
    
    span {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
  }
`;

const ApplyButton = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-2px);
  }
`;

const BenefitsSection = styled.section`
  padding: 80px 0;
  background: var(--background-gray);
`;

const BenefitCard = styled(motion.div)`
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

const BenefitIcon = styled.div`
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

const FormSection = styled.section`
  padding: 80px 0;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
`;

const WorkWithUs: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    vaga: '',
    experiencia: '',
    portfolio: '',
    mensagem: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Candidatura enviada:', formData);
    alert('Candidatura enviada com sucesso! Entraremos em contato em breve.');
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      vaga: '',
      experiencia: '',
      portfolio: '',
      mensagem: ''
    });
  };

  const jobs = [
    {
      title: 'Desenvolvedor Full Stack',
      type: 'CLT',
      location: 'Remoto',
      experience: '3+ anos',
      description: 'Buscamos um desenvolvedor experiente para trabalhar com React, Node.js e tecnologias de IA para chatbots.'
    },
    {
      title: 'Especialista em Marketing Digital',
      type: 'CLT',
      location: 'São Paulo',
      experience: '2+ anos',
      description: 'Profissional para gerenciar campanhas de marketing digital e automação de vendas.'
    },
    {
      title: 'Analista de Vendas',
      type: 'CLT',
      location: 'Remoto',
      experience: '1+ ano',
      description: 'Responsável por prospecção de clientes e fechamento de vendas de soluções em chatbots.'
    },
    {
      title: 'Designer UX/UI',
      type: 'PJ',
      location: 'Remoto',
      experience: '2+ anos',
      description: 'Criar interfaces intuitivas e experiências de usuário para nossos produtos de chatbot.'
    }
  ];

  const benefits = [
    {
      icon: <FiUsers />,
      title: 'Cultura Colaborativa',
      description: 'Trabalhe em um ambiente que valoriza a colaboração e o trabalho em equipe.'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Crescimento Profissional',
      description: 'Oportunidades de desenvolvimento e crescimento na carreira.'
    },
    {
      icon: <FiHeart />,
      title: 'Benefícios Atraentes',
      description: 'Plano de saúde, vale refeição, flexibilidade de horários e muito mais.'
    },
    {
      icon: <FiZap />,
      title: 'Tecnologia de Ponta',
      description: 'Trabalhe com as tecnologias mais modernas em IA e automação.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Trabalhe Conosco - Mundo dos Bots | Oportunidades de Carreira</title>
        <meta name="description" content="Junte-se à equipe da Mundo dos Bots. Oportunidades de carreira em uma empresa inovadora de chatbots e automação." />
      </Helmet>

      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Trabalhe Conosco</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem', opacity: 0.9 }}>
              Junte-se a uma equipe apaixonada por tecnologia e inovação
            </p>
          </motion.div>
        </div>
      </HeroSection>

      <WorkSection>
        <div className="container">
          <div className="section-title">
            <h2>Vagas Abertas</h2>
            <p>Encontre a oportunidade perfeita para sua carreira</p>
          </div>

          {jobs.map((job, index) => (
            <JobCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <JobHeader>
                <JobInfo>
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span>
                      <FiDollarSign />
                      {job.type}
                    </span>
                    <span>
                      <FiMapPin />
                      {job.location}
                    </span>
                    <span>
                      <FiClock />
                      {job.experience}
                    </span>
                  </div>
                </JobInfo>
                <ApplyButton onClick={() => setFormData({...formData, vaga: job.title})}>
                  Candidatar-se
                </ApplyButton>
              </JobHeader>
              <p style={{ color: 'var(--text-secondary)' }}>{job.description}</p>
            </JobCard>
          ))}
        </div>
      </WorkSection>

      <BenefitsSection>
        <div className="container">
          <div className="section-title">
            <h2>Por que Trabalhar na Mundo dos Bots?</h2>
            <p>Descubra os benefícios de fazer parte da nossa equipe</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <BenefitIcon>
                  {benefit.icon}
                </BenefitIcon>
                <h3 style={{ marginBottom: '1rem' }}>{benefit.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{benefit.description}</p>
              </BenefitCard>
            ))}
          </div>
        </div>
      </BenefitsSection>

      <FormSection>
        <div className="container">
          <div className="section-title">
            <h2>Envie sua Candidatura</h2>
            <p>Preencha o formulário abaixo e nossa equipe entrará em contato</p>
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
                <label htmlFor="telefone">Telefone</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="vaga">Vaga de Interesse *</label>
                <select
                  id="vaga"
                  name="vaga"
                  value={formData.vaga}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione uma vaga...</option>
                  <option value="Desenvolvedor Full Stack">Desenvolvedor Full Stack</option>
                  <option value="Especialista em Marketing Digital">Especialista em Marketing Digital</option>
                  <option value="Analista de Vendas">Analista de Vendas</option>
                  <option value="Designer UX/UI">Designer UX/UI</option>
                  <option value="Outras">Outras</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label htmlFor="experiencia">Anos de Experiência</label>
                <select
                  id="experiencia"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione...</option>
                  <option value="Estagiário">Estagiário</option>
                  <option value="Júnior (1-2 anos)">Júnior (1-2 anos)</option>
                  <option value="Pleno (3-5 anos)">Pleno (3-5 anos)</option>
                  <option value="Sênior (5+ anos)">Sênior (5+ anos)</option>
                </select>
              </FormGroup>

              <FormGroup>
                <label htmlFor="portfolio">Portfolio/LinkedIn</label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />
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
                Enviar Candidatura
                <FiSend />
              </SubmitButton>
            </form>
          </FormContainer>
        </div>
      </FormSection>
    </>
  );
};

export default WorkWithUs;
