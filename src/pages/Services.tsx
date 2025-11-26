import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMessageCircle, FiSmartphone, FiCalendar, FiTrendingUp, FiShoppingCart, FiHome, FiHeart, FiBook, FiSettings, FiCheck } from 'react-icons/fi';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  margin-bottom: 2rem;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
  }
`;

const ServiceIcon = styled.div`
  width: 80px;
  height: 80px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
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

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-light);
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h2 {
    color: var(--text-primary);
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--text-secondary);
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const Services: React.FC = () => {
  const services = [
    {
      id: 'whatsapp',
      icon: <FiMessageCircle />,
      title: 'Chatbots para WhatsApp',
      description: 'Automatize completamente o atendimento no WhatsApp com inteligência artificial avançada.',
      benefits: [
        'Atendimento 24/7 automático',
        'Respostas instantâneas e personalizadas',
        'Integração com sistemas existentes',
        'Relatórios detalhados de conversas',
        'Suporte a múltiplos idiomas',
        'Qualificação automática de leads'
      ],
      cta: 'Quero um Chatbot para WhatsApp'
    },
    {
      id: 'sites',
      icon: <FiSmartphone />,
      title: 'Chatbots para Sites',
      description: 'Transforme a experiência do usuário em seu site com chatbots inteligentes e conversacionais.',
      benefits: [
        'Aumento na conversão de visitantes',
        'Redução do tempo de resposta',
        'Navegação guiada inteligente',
        'Coleta de dados qualificados',
        'Integração com CRM e analytics',
        'Design personalizado para sua marca'
      ],
      cta: 'Quero um Chatbot para meu Site'
    },
    {
      id: 'agendamentos',
      icon: <FiCalendar />,
      title: 'Automação de Agendamentos',
      description: 'Simplifique o processo de agendamento com automação inteligente que funciona 24 horas por dia.',
      benefits: [
        'Agendamento automático 24/7',
        'Sincronização com calendários',
        'Lembretes automáticos',
        'Reagendamento fácil',
        'Redução de faltas',
        'Integração com sistemas de pagamento'
      ],
      cta: 'Quero Automatizar Agendamentos'
    },
    {
      id: 'leads',
      icon: <FiTrendingUp />,
      title: 'Qualificação de Leads',
      description: 'Qualifique e nutra leads automaticamente com nosso sistema inteligente de scoring.',
      benefits: [
        'Qualificação automática de leads',
        'Scoring baseado em comportamento',
        'Nutrição personalizada',
        'Segmentação inteligente',
        'Integração com CRM',
        'Relatórios de performance'
      ],
      cta: 'Quero Qualificar Leads Automaticamente'
    }
  ];

  const sectors = [
    {
      icon: <FiShoppingCart />,
      title: 'E-commerce',
      description: 'Aumente vendas e melhore o atendimento em sua loja virtual.',
      benefits: ['Atendimento pré-venda', 'Pós-venda automatizado', 'Upselling inteligente', 'Abandono de carrinho']
    },
    {
      icon: <FiHome />,
      title: 'Imobiliárias',
      description: 'Qualifique leads e automatize o processo de vendas imobiliárias.',
      benefits: ['Qualificação de leads', 'Agendamento de visitas', 'Apresentação de imóveis', 'Follow-up automático']
    },
    {
      icon: <FiHeart />,
      title: 'Clínicas e Consultórios',
      description: 'Otimize o atendimento e agendamento em clínicas médicas.',
      benefits: ['Agendamento online', 'Lembretes automáticos', 'Triagem inicial', 'Histórico do paciente']
    },
    {
      icon: <FiBook />,
      title: 'Educação',
      description: 'Automatize matrículas e atendimento em instituições educacionais.',
      benefits: ['Matrículas online', 'Tira-dúvidas 24/7', 'Agendamento de aulas', 'Comunicação com pais']
    },
    {
      icon: <FiSettings />,
      title: 'Indústria',
      description: 'Otimize processos industriais com automação inteligente.',
      benefits: ['Suporte técnico', 'Manutenção preventiva', 'Controle de qualidade', 'Gestão de fornecedores']
    }
  ];

  const objectives = [
    {
      id: 'vendas',
      title: 'Aumentar Vendas',
      description: 'Transforme visitantes em clientes com chatbots inteligentes que convertem.',
      features: ['Qualificação automática', 'Upselling inteligente', 'Abandono de carrinho', 'Cross-selling']
    },
    {
      id: 'atendimento',
      title: 'Melhorar Atendimento',
      description: 'Ofereça um atendimento excepcional 24 horas por dia, 7 dias por semana.',
      features: ['Respostas instantâneas', 'Atendimento personalizado', 'Escalação inteligente', 'Satisfação do cliente']
    },
    {
      id: 'marketing',
      title: 'Automatizar Marketing',
      description: 'Automatize campanhas de marketing e nutra leads de forma inteligente.',
      features: ['Campanhas automáticas', 'Segmentação inteligente', 'A/B testing', 'ROI otimizado']
    },
    {
      id: 'custos',
      title: 'Reduzir Custos Operacionais',
      description: 'Reduza custos com automação inteligente que substitui tarefas repetitivas.',
      features: ['Redução de equipe', 'Processos otimizados', 'Eficiência operacional', 'ROI positivo']
    }
  ];

  return (
    <>
      <Helmet>
        <title>Nossos Serviços - Chatbots e Automação | Mundo dos Bots</title>
        <meta name="description" content="Conheça nossas soluções completas em chatbots para WhatsApp, sites, automação de agendamentos e qualificação de leads. Transforme seu negócio com IA." />
      </Helmet>

      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Soluções Completas em Chatbots e Automação</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem', opacity: 0.9 }}>
              Transforme seu negócio com inteligência artificial. Oferecemos soluções personalizadas para cada objetivo e setor.
            </p>
          </motion.div>
        </div>
      </HeroSection>

      <section className="section">
        <div className="container">
          <SectionTitle>
            <h2>Nossos Produtos</h2>
            <p>Soluções específicas para cada necessidade do seu negócio</p>
          </SectionTitle>

          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                <ServiceIcon>
                  {service.icon}
                </ServiceIcon>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>{service.title}</h3>
                  <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                    {service.description}
                  </p>
                  
                  <BenefitsList>
                    {service.benefits.map((benefit, idx) => (
                      <li key={idx}>
                        <FiCheck />
                        {benefit}
                      </li>
                    ))}
                  </BenefitsList>
                  
                  <CTAButton>
                    {service.cta}
                    <FiArrowRight />
                  </CTAButton>
                </div>
              </div>
            </ServiceCard>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--background-gray)' }}>
        <div className="container">
          <SectionTitle>
            <h2>Soluções por Setor</h2>
            <p>Adaptamos nossas soluções para as necessidades específicas de cada setor</p>
          </SectionTitle>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {sectors.map((sector, index) => (
              <ServiceCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ServiceIcon>
                  {sector.icon}
                </ServiceIcon>
                <h3 style={{ marginBottom: '1rem' }}>{sector.title}</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                  {sector.description}
                </p>
                <BenefitsList>
                  {sector.benefits.map((benefit, idx) => (
                    <li key={idx}>
                      <FiCheck />
                      {benefit}
                    </li>
                  ))}
                </BenefitsList>
              </ServiceCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle>
            <h2>Soluções por Objetivo</h2>
            <p>Alcance seus objetivos de negócio com automação inteligente</p>
          </SectionTitle>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {objectives.map((objective, index) => (
              <ServiceCard
                key={objective.id}
                id={objective.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>{objective.title}</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
                  {objective.description}
                </p>
                <BenefitsList>
                  {objective.features.map((feature, idx) => (
                    <li key={idx}>
                      <FiCheck />
                      {feature}
                    </li>
                  ))}
                </BenefitsList>
                <CTAButton>
                  Saiba Mais
                  <FiArrowRight />
                </CTAButton>
              </ServiceCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--background-gray)' }}>
        <div className="container">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem' }}>Pronto para Transformar seu Negócio?</h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              Fale com nossos especialistas e descubra como podemos ajudar sua empresa
            </p>
            <CTAButton style={{ fontSize: '1.1rem', padding: '1.2rem 2.5rem' }}>
              Fale com um Especialista
              <FiArrowRight />
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
