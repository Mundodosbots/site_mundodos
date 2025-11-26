import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FiTarget, FiEye, FiHeart, FiUsers, FiAward, FiShield, FiZap } from 'react-icons/fi';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;
`;

const StorySection = styled.section`
  padding: 80px 0;
`;

const StoryContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StoryImage = styled.div`
  height: 400px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  border-radius: var(--border-radius-large);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
  }
`;

const ValuesSection = styled.section`
  padding: 80px 0;
  background: var(--background-gray);
`;

const ValueCard = styled(motion.div)`
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

const ValueIcon = styled.div`
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

const TeamSection = styled.section`
  padding: 80px 0;
`;

const TeamCard = styled(motion.div)`
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

const TeamAvatar = styled.div`
  width: 120px;
  height: 120px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  font-weight: 700;
`;

const StatsSection = styled.section`
  padding: 80px 0;
  background: var(--background-dark);
  color: white;
`;

const StatCard = styled(motion.div)`
  text-align: center;
  
  .stat-number {
    font-size: 3rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    font-size: 1.1rem;
    opacity: 0.9;
  }
`;

const About: React.FC = () => {
  const values = [
    {
      icon: <FiTarget />,
      title: 'Inovação',
      description: 'Sempre buscamos as melhores tecnologias e soluções para nossos clientes.'
    },
    {
      icon: <FiHeart />,
      title: 'Paixão',
      description: 'Amamos o que fazemos e isso se reflete na qualidade dos nossos serviços.'
    },
    {
      icon: <FiUsers />,
      title: 'Colaboração',
      description: 'Acreditamos que o sucesso vem do trabalho em equipe e da parceria com nossos clientes.'
    },
    {
      icon: <FiShield />,
      title: 'Confiança',
      description: 'Construímos relacionamentos duradouros baseados na transparência e confiabilidade.'
    },
    {
      icon: <FiZap />,
      title: 'Eficiência',
      description: 'Otimizamos processos para entregar resultados rápidos e de qualidade.'
    },
    {
      icon: <FiAward />,
      title: 'Excelência',
      description: 'Buscamos a excelência em tudo que fazemos, desde o atendimento até a entrega.'
    }
  ];

  const team = [
    {
      name: 'João Silva',
      role: 'CEO & Fundador',
      description: 'Especialista em IA e automação com mais de 10 anos de experiência no mercado.'
    },
    {
      name: 'Maria Santos',
      role: 'CTO',
      description: 'Desenvolvedora experiente com foco em chatbots e inteligência artificial.'
    },
    {
      name: 'Pedro Costa',
      role: 'Head de Vendas',
      description: 'Especialista em vendas B2B com vasta experiência em soluções digitais.'
    },
    {
      name: 'Ana Oliveira',
      role: 'Head de Marketing',
      description: 'Estrategista de marketing digital com foco em crescimento e conversão.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Clientes Atendidos' },
    { number: '1000+', label: 'Chatbots Implementados' },
    { number: '98%', label: 'Satisfação dos Clientes' },
    { number: '5 anos', label: 'de Experiência' }
  ];

  return (
    <>
      <Helmet>
        <title>Quem Somos - Mundo dos Bots | Nossa História e Valores</title>
        <meta name="description" content="Conheça a história da Mundo dos Bots, nossa missão, visão e valores. Especialistas em chatbots e automação com foco em resultados." />
      </Helmet>

      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Quem Somos</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem', opacity: 0.9 }}>
              Conheça a história da Mundo dos Bots e descubra por que somos referência em chatbots e automação
            </p>
          </motion.div>
        </div>
      </HeroSection>

      <StorySection>
        <div className="container">
          <div className="section-title">
            <h2>Nossa História</h2>
            <p>Uma jornada de inovação e transformação digital</p>
          </div>

          <StoryContent>
            <div>
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
                Transformando Comunicação com Inteligência Artificial
              </h3>
              <p style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                A Mundo dos Bots nasceu da visão de democratizar o acesso à inteligência artificial para empresas de todos os portes. Fundada em 2019, nossa empresa surgiu com o objetivo de transformar a forma como as empresas se comunicam com seus clientes.
              </p>
              <p style={{ marginBottom: '1rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                Começamos com uma equipe pequena e apaixonada por tecnologia, desenvolvendo soluções inovadoras em chatbots para WhatsApp. Com o tempo, expandimos nossos serviços para incluir chatbots para sites, automação de agendamentos e qualificação de leads.
              </p>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                Hoje, somos uma empresa consolidada no mercado, atendendo mais de 500 clientes em todo o Brasil, com uma equipe especializada e uma rede de franqueados em crescimento constante.
              </p>
            </div>
            <StoryImage />
          </StoryContent>
        </div>
      </StorySection>

      <section className="section" style={{ background: 'var(--background-gray)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--border-radius-large)',
                boxShadow: 'var(--shadow-light)',
                textAlign: 'center'
              }}
            >
              <FiTarget style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>Nossa Missão</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Democratizar o acesso à inteligência artificial, fornecendo soluções inovadoras em chatbots e automação que transformem a comunicação empresarial e gerem resultados reais para nossos clientes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--border-radius-large)',
                boxShadow: 'var(--shadow-light)',
                textAlign: 'center'
              }}
            >
              <FiEye style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>Nossa Visão</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Ser a empresa líder em soluções de chatbots e automação na América Latina, reconhecida pela inovação, qualidade e resultados excepcionais entregues aos nossos clientes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: 'var(--border-radius-large)',
                boxShadow: 'var(--shadow-light)',
                textAlign: 'center'
              }}
            >
              <FiHeart style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '1rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>Nossos Valores</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Inovação, paixão, colaboração, confiança, eficiência e excelência são os pilares que guiam nossas ações e relacionamentos com clientes, parceiros e colaboradores.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <ValuesSection>
        <div className="container">
          <div className="section-title">
            <h2>Nossos Valores</h2>
            <p>Os princípios que guiam nossas ações e relacionamentos</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ValueIcon>
                  {value.icon}
                </ValueIcon>
                <h3 style={{ marginBottom: '1rem' }}>{value.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{value.description}</p>
              </ValueCard>
            ))}
          </div>
        </div>
      </ValuesSection>

      <TeamSection>
        <div className="container">
          <div className="section-title">
            <h2>Nossa Equipe</h2>
            <p>Profissionais especializados e apaixonados por tecnologia</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {team.map((member, index) => (
              <TeamCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TeamAvatar>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </TeamAvatar>
                <h3 style={{ marginBottom: '0.5rem' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary-color)', fontWeight: '600', marginBottom: '1rem' }}>
                  {member.role}
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>{member.description}</p>
              </TeamCard>
            ))}
          </div>
        </div>
      </TeamSection>

      <StatsSection>
        <div className="container">
          <div className="section-title" style={{ color: 'white' }}>
            <h2>Números que Contam Nossa História</h2>
            <p>Resultados que demonstram nosso compromisso com a excelência</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </StatCard>
            ))}
          </div>
        </div>
      </StatsSection>
    </>
  );
};

export default About;
