import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiHeadphones, FiTarget, FiDollarSign, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
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

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const BenefitCard = styled(motion.div)`
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

const BenefitIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  font-size: 2rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const BenefitDescription = styled.p`
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

interface SolutionsByObjectiveProps {
  objective: 'aumentar-vendas' | 'melhorar-atendimento' | 'automatizar-marketing' | 'reduzir-custos';
}

const solutionsData = {
  'aumentar-vendas': {
    title: 'Transforme Conversas em Vendas com Chatbots Inteligentes',
    subtitle: 'Aumente suas vendas em até 300% com automação inteligente',
    description: 'Descubra como nossos chatbots podem revolucionar suas vendas, qualificando leads e convertendo conversas em vendas reais.',
    icon: FiTrendingUp,
    benefits: [
      {
        title: 'Aumento de 300% nas vendas',
        description: 'Transforme conversas em vendas reais com qualificação automática de leads',
        icon: FiTrendingUp
      },
      {
        title: 'Qualificação automática de leads',
        description: 'Identifique automaticamente leads qualificados e oportunidades de venda',
        icon: FiCheckCircle
      },
      {
        title: 'Atendimento 24/7',
        description: 'Nunca perca uma oportunidade de venda, mesmo fora do horário comercial',
        icon: FiHeadphones
      },
      {
        title: 'Redução de 70% no tempo de resposta',
        description: 'Responda instantaneamente e aumente a chance de conversão',
        icon: FiArrowRight
      }
    ],
    features: [
      'Integração com WhatsApp Business',
      'Qualificação automática de leads',
      'Relatórios detalhados',
      'Personalização avançada',
      'Upselling inteligente',
      'Follow-up automático'
    ],
    whatsappMessage: 'Olá! Gostaria de saber mais sobre como aumentar minhas vendas com chatbots inteligentes.'
  },
  'melhorar-atendimento': {
    title: 'Atendimento Excepcional 24/7 com IA',
    subtitle: 'Transforme a experiência do seu cliente com atendimento inteligente',
    description: 'Ofereça um atendimento excepcional 24 horas por dia, 7 dias por semana, com respostas instantâneas e personalizadas.',
    icon: FiHeadphones,
    benefits: [
      {
        title: 'Atendimento 24/7',
        description: 'Ofereça suporte completo mesmo fora do horário comercial',
        icon: FiHeadphones
      },
      {
        title: 'Resposta instantânea',
        description: 'Clientes recebem respostas imediatas, aumentando a satisfação',
        icon: FiArrowRight
      },
      {
        title: 'Satisfação do cliente',
        description: 'Melhore significativamente a experiência e fidelização',
        icon: FiCheckCircle
      },
      {
        title: 'Redução de custos',
        description: 'Automatize atendimentos simples e reduza custos operacionais',
        icon: FiDollarSign
      }
    ],
    features: [
      'Respostas automáticas inteligentes',
      'Integração com CRM',
      'Histórico de conversas',
      'Transferência para humano',
      'FAQ automático',
      'Análise de sentimento'
    ],
    whatsappMessage: 'Olá! Quero melhorar o atendimento da minha empresa com chatbots inteligentes.'
  },
  'automatizar-marketing': {
    title: 'Automatize Seu Marketing e Multiplique Resultados',
    subtitle: 'Marketing inteligente que funciona enquanto você dorme',
    description: 'Automatize suas campanhas de marketing, qualifique leads automaticamente e multiplique seus resultados com IA.',
    icon: FiTarget,
    benefits: [
      {
        title: 'Qualificação automática de leads',
        description: 'Identifique automaticamente leads qualificados para suas campanhas',
        icon: FiCheckCircle
      },
      {
        title: 'Campanhas personalizadas',
        description: 'Crie campanhas altamente segmentadas e personalizadas',
        icon: FiTarget
      },
      {
        title: 'Aumento de conversões',
        description: 'Multiplique suas conversões com automação inteligente',
        icon: FiTrendingUp
      },
      {
        title: 'ROI mensurável',
        description: 'Acompanhe resultados em tempo real e otimize campanhas',
        icon: FiDollarSign
      }
    ],
    features: [
      'Segmentação automática',
      'Campanhas multicanal',
      'Analytics avançado',
      'A/B testing',
      'Automação de workflows',
      'Relatórios detalhados'
    ],
    whatsappMessage: 'Olá! Quero automatizar meu marketing e multiplicar meus resultados.'
  },
  'reduzir-custos': {
    title: 'Reduza Custos e Aumente Eficiência',
    subtitle: 'Economize até 60% nos custos operacionais',
    description: 'Reduza significativamente seus custos operacionais automatizando tarefas repetitivas e otimizando processos.',
    icon: FiDollarSign,
    benefits: [
      {
        title: 'Redução de 60% nos custos',
        description: 'Economize significativamente com automação de processos',
        icon: FiDollarSign
      },
      {
        title: 'Automação de processos',
        description: 'Elimine tarefas repetitivas e aumente a produtividade',
        icon: FiArrowRight
      },
      {
        title: 'Aumento de eficiência',
        description: 'Otimize fluxos de trabalho e melhore resultados',
        icon: FiTrendingUp
      },
      {
        title: 'ROI rápido',
        description: 'Veja resultados positivos em poucas semanas',
        icon: FiCheckCircle
      }
    ],
    features: [
      'Automação de tarefas',
      'Integração com sistemas',
      'Relatórios de eficiência',
      'Escalabilidade',
      'Otimização de processos',
      'Monitoramento em tempo real'
    ],
    whatsappMessage: 'Olá! Quero reduzir os custos operacionais da minha empresa com automação.'
  }
};

const SolutionsByObjective: React.FC<SolutionsByObjectiveProps> = ({ objective }) => {
  const data = solutionsData[objective];
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

      <ContentSection>
        <Container>
          <SectionTitle>Benefícios Principais</SectionTitle>
          <BenefitsGrid>
            {data.benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BenefitIcon>
                  <benefit.icon />
                </BenefitIcon>
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitDescription>{benefit.description}</BenefitDescription>
              </BenefitCard>
            ))}
          </BenefitsGrid>
        </Container>
      </ContentSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>Funcionalidades Incluídas</SectionTitle>
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
          <CTATitle>Pronto para Transformar seu Negócio?</CTATitle>
          <CTADescription>
            Entre em contato agora e descubra como nossos chatbots podem revolucionar seus resultados.
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

export default SolutionsByObjective;
