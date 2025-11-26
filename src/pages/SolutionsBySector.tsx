import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHome, FiHeart, FiBookOpen, FiSettings, FiCheckCircle, FiZap } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
`;

const HeroSection = styled.section`
  padding: 120px 2rem 80px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.05)" points="0,1000 1000,0 1000,1000"/></svg>');
    background-size: cover;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--secondary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 107, 53, 0.3);

  &:hover {
    background: #e55a2b;
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(255, 107, 53, 0.4);
    color: white;
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ContentSection = styled.section`
  padding: 80px 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
`;

const ChallengesSection = styled.section`
  padding: 80px 2rem;
  background: var(--background-gray);
`;

const ChallengesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ChallengeCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

const ChallengeIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
`;

const ChallengeTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ChallengeDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const SolutionsSection = styled.section`
  padding: 80px 2rem;
  background: white;
`;

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const SolutionCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

const SolutionIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--accent-color), #00b894);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
`;

const SolutionTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const SolutionDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const FeaturesSection = styled.section`
  padding: 80px 2rem;
  background: var(--background-gray);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
`;

const FeatureIcon = styled.div`
  color: var(--accent-color);
  font-size: 1.5rem;
`;

const FeatureText = styled.span`
  font-weight: 500;
  color: var(--text-primary);
`;

const CTASection = styled.section`
  padding: 80px 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  text-align: center;
  color: white;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

const CTADescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const WhatsAppButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #25d366;
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);

  &:hover {
    background: #128c7e;
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
    color: white;
  }
`;

interface SolutionsBySectorProps {
  sector: 'ecommerce' | 'imobiliarias' | 'clinicas-consultorios' | 'educacao' | 'industria';
}

const solutionsData = {
  'ecommerce': {
    title: 'Chatbots que Vendem para E-commerce',
    subtitle: 'Transforme visitantes em clientes com IA',
    description: 'Maximize suas vendas online com chatbots inteligentes que qualificam leads e fecham vendas automaticamente.',
    icon: FiShoppingCart,
    challenges: [
      {
        title: 'Abandono de carrinho',
        description: 'Clientes abandonam compras por falta de atendimento',
        icon: FiZap
      },
      {
        title: 'Atendimento fora do horário',
        description: 'Perda de vendas quando não há atendimento',
        icon: FiZap
      },
      {
        title: 'Qualificação de leads',
        description: 'Dificuldade em identificar clientes qualificados',
        icon: FiZap
      },
      {
        title: 'Conversão baixa',
        description: 'Taxa de conversão abaixo do esperado',
        icon: FiZap
      }
    ],
    solutions: [
      {
        title: 'Recuperação de carrinho',
        description: 'Recupere vendas perdidas automaticamente',
        icon: FiCheckCircle
      },
      {
        title: 'Atendimento 24/7',
        description: 'Nunca perca uma venda por falta de atendimento',
        icon: FiCheckCircle
      },
      {
        title: 'Qualificação automática',
        description: 'Identifique leads qualificados automaticamente',
        icon: FiCheckCircle
      },
      {
        title: 'Upselling inteligente',
        description: 'Aumente o ticket médio com sugestões inteligentes',
        icon: FiCheckCircle
      }
    ],
    features: [
      'Integração com plataformas de e-commerce',
      'Recuperação automática de carrinho',
      'Qualificação de leads em tempo real',
      'Upselling e cross-selling inteligente',
      'Relatórios de conversão',
      'Integração com gateways de pagamento'
    ],
    whatsappMessage: 'Olá! Quero aumentar as vendas do meu e-commerce com chatbots inteligentes.'
  },
  'imobiliarias': {
    title: 'Chatbots para Imobiliárias',
    subtitle: 'Qualifique leads e feche mais negócios',
    description: 'Automatize a qualificação de leads imobiliários e aumente suas vendas com atendimento inteligente.',
    icon: FiHome,
    challenges: [
      {
        title: 'Qualificação manual de leads',
        description: 'Processo demorado e ineficiente',
        icon: FiZap
      },
      {
        title: 'Perda de oportunidades',
        description: 'Leads não atendidos no momento certo',
        icon: FiZap
      },
      {
        title: 'Atendimento demorado',
        description: 'Tempo de resposta muito alto',
        icon: FiZap
      },
      {
        title: 'Falta de follow-up',
        description: 'Leads perdidos por falta de acompanhamento',
        icon: FiZap
      }
    ],
    solutions: [
      {
        title: 'Qualificação automática',
        description: 'Identifique leads qualificados automaticamente',
        icon: FiCheckCircle
      },
      {
        title: 'Agendamento de visitas',
        description: 'Agende visitas automaticamente',
        icon: FiCheckCircle
      },
      {
        title: 'Follow-up automático',
        description: 'Acompanhe leads automaticamente',
        icon: FiCheckCircle
      },
      {
        title: 'Relatórios detalhados',
        description: 'Acompanhe performance em tempo real',
        icon: FiCheckCircle
      }
    ],
    features: [
      'Qualificação automática de leads',
      'Agendamento de visitas',
      'Follow-up automático',
      'Integração com CRMs',
      'Relatórios de performance',
      'Gestão de portfólio'
    ],
    whatsappMessage: 'Olá! Quero qualificar leads e fechar mais negócios na minha imobiliária.'
  },
  'clinicas-consultorios': {
    title: 'Chatbots para Saúde',
    subtitle: 'Melhore o atendimento da sua clínica',
    description: 'Otimize o atendimento da sua clínica com agendamento automático e triagem inteligente de pacientes.',
    icon: FiHeart,
    challenges: [
      {
        title: 'Agendamento manual',
        description: 'Processo demorado e propenso a erros',
        icon: FiZap
      },
      {
        title: 'Falta de pacientes',
        description: 'Dificuldade em captar novos pacientes',
        icon: FiZap
      },
      {
        title: 'Atendimento demorado',
        description: 'Pacientes esperando muito tempo',
        icon: FiZap
      },
      {
        title: 'Perda de consultas',
        description: 'Consultas canceladas sem reagendamento',
        icon: FiZap
      }
    ],
    solutions: [
      {
        title: 'Agendamento automático',
        description: 'Agende consultas automaticamente',
        icon: FiCheckCircle
      },
      {
        title: 'Triagem inteligente',
        description: 'Identifique urgências automaticamente',
        icon: FiCheckCircle
      },
      {
        title: 'Lembretes automáticos',
        description: 'Reduza faltas com lembretes',
        icon: FiCheckCircle
      },
      {
        title: 'Histórico médico',
        description: 'Acesse histórico rapidamente',
        icon: FiCheckCircle
      }
    ],
    features: [
      'Agendamento automático',
      'Triagem inteligente',
      'Lembretes automáticos',
      'Histórico médico',
      'Integração com sistemas de saúde',
      'Relatórios de atendimento'
    ],
    whatsappMessage: 'Olá! Quero melhorar o atendimento da minha clínica com chatbots inteligentes.'
  },
  'educacao': {
    title: 'Chatbots para Educação',
    subtitle: 'Transforme a experiência educacional',
    description: 'Automatize o atendimento educacional e melhore a experiência dos alunos com chatbots inteligentes.',
    icon: FiBookOpen,
    challenges: [
      {
        title: 'Atendimento manual',
        description: 'Processo demorado e repetitivo',
        icon: FiZap
      },
      {
        title: 'Dúvidas repetitivas',
        description: 'Mesmas perguntas respondidas várias vezes',
        icon: FiZap
      },
      {
        title: 'Falta de informações',
        description: 'Alunos sem acesso rápido a informações',
        icon: FiZap
      },
      {
        title: 'Baixa retenção',
        description: 'Alunos desistem por falta de suporte',
        icon: FiZap
      }
    ],
    solutions: [
      {
        title: 'FAQ automático',
        description: 'Responda dúvidas automaticamente',
        icon: FiCheckCircle
      },
      {
        title: 'Matrículas online',
        description: 'Processe matrículas automaticamente',
        icon: FiCheckCircle
      },
      {
        title: 'Suporte 24/7',
        description: 'Ofereça suporte sempre',
        icon: FiCheckCircle
      },
      {
        title: 'Gamificação',
        description: 'Engaje alunos com gamificação',
        icon: FiCheckCircle
      }
    ],
    features: [
      'FAQ automático',
      'Matrículas online',
      'Suporte 24/7',
      'Gamificação',
      'Integração com LMS',
      'Relatórios de engajamento'
    ],
    whatsappMessage: 'Olá! Quero transformar a experiência educacional da minha instituição.'
  },
  'industria': {
    title: 'Chatbots para Indústria',
    subtitle: 'Automatize processos industriais',
    description: 'Otimize processos industriais com chatbots inteligentes que automatizam atendimento e qualificam leads.',
            icon: FiSettings,
    challenges: [
      {
        title: 'Processos manuais',
        description: 'Processos lentos e propensos a erros',
        icon: FiZap
      },
      {
        title: 'Falta de eficiência',
        description: 'Baixa produtividade operacional',
        icon: FiZap
      },
      {
        title: 'Custos altos',
        description: 'Custos operacionais elevados',
        icon: FiZap
      },
      {
        title: 'Erros humanos',
        description: 'Erros frequentes em processos manuais',
        icon: FiZap
      }
    ],
    solutions: [
      {
        title: 'Automação de processos',
        description: 'Automatize tarefas repetitivas',
        icon: FiCheckCircle
      },
      {
        title: 'Qualificação de leads',
        description: 'Identifique leads qualificados',
        icon: FiCheckCircle
      },
      {
        title: 'Suporte técnico',
        description: 'Ofereça suporte técnico 24/7',
        icon: FiCheckCircle
      },
      {
        title: 'Relatórios automáticos',
        description: 'Gere relatórios automaticamente',
        icon: FiCheckCircle
      }
    ],
    features: [
      'Automação de processos',
      'Qualificação de leads',
      'Suporte técnico',
      'Relatórios automáticos',
      'Integração com ERPs',
      'Monitoramento de KPIs'
    ],
    whatsappMessage: 'Olá! Quero automatizar processos da minha indústria com chatbots inteligentes.'
  }
};

const SolutionsBySector: React.FC<SolutionsBySectorProps> = ({ sector }) => {
  const data = solutionsData[sector];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const IconComponent = data.icon;

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>{data.title}</HeroTitle>
            <HeroSubtitle>{data.subtitle}</HeroSubtitle>
            <CTAButton
              href={`https://wa.me/5566984443050?text=${encodeURIComponent(data.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaWhatsapp />
              Fale com um Especialista
            </CTAButton>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <ChallengesSection>
        <Container>
          <SectionTitle>Desafios do Setor</SectionTitle>
          <ChallengesGrid>
            {data.challenges.map((challenge, index) => (
              <ChallengeCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ChallengeIcon>
                  <challenge.icon />
                </ChallengeIcon>
                <ChallengeTitle>{challenge.title}</ChallengeTitle>
                <ChallengeDescription>{challenge.description}</ChallengeDescription>
              </ChallengeCard>
            ))}
          </ChallengesGrid>
        </Container>
      </ChallengesSection>

      <SolutionsSection>
        <Container>
          <SectionTitle>Nossas Soluções</SectionTitle>
          <SolutionsGrid>
            {data.solutions.map((solution, index) => (
              <SolutionCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <SolutionIcon>
                  <solution.icon />
                </SolutionIcon>
                <SolutionTitle>{solution.title}</SolutionTitle>
                <SolutionDescription>{solution.description}</SolutionDescription>
              </SolutionCard>
            ))}
          </SolutionsGrid>
        </Container>
      </SolutionsSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Funcionalidades Específicas</SectionTitle>
          <FeaturesGrid>
            {data.features.map((feature, index) => (
              <FeatureItem
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureIcon>
                  <FiCheckCircle />
                </FeatureIcon>
                <FeatureText>{feature}</FeatureText>
              </FeatureItem>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      <CTASection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CTATitle>Pronto para Revolucionar seu Setor?</CTATitle>
          <CTADescription>
            Entre em contato agora e descubra como nossos chatbots podem transformar seus resultados.
          </CTADescription>
          <WhatsAppButton
            href={`https://wa.me/5566984443050?text=${encodeURIComponent(data.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp />
            Falar no WhatsApp
          </WhatsAppButton>
        </motion.div>
      </CTASection>
    </PageContainer>
  );
};

export default SolutionsBySector;
