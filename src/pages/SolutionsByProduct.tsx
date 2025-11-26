import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMessageCircle, FiGlobe, FiCalendar, FiTarget, FiCheckCircle, FiPlay } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

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

const FeaturesSection = styled.section`
  padding: 80px 2rem;
  background: var(--background-gray);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const FeatureCard = styled(motion.div)`
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

const FeatureIcon = styled.div`
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

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const PricingSection = styled.section`
  padding: 80px 2rem;
  background: white;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const PricingCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 2px solid #e5e7eb;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;

  &.featured {
    border-color: var(--accent-color);
    transform: scale(1.05);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--accent-color);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const PlanName = styled.h3`
  font-size: 1.8rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 700;
`;

const PlanPrice = styled.div`
  font-size: 3rem;
  color: var(--primary-color);
  font-weight: 700;
  margin-bottom: 0.5rem;

  .currency {
    font-size: 1.5rem;
    vertical-align: top;
  }

  .period {
    font-size: 1rem;
    color: var(--text-secondary);
    font-weight: 400;
  }
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const PlanFeature = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);

  .icon {
    color: var(--accent-color);
  }
`;

const PlanButton = styled(motion.a)`
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
  text-align: center;

  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
    color: white;
  }
`;

const IntegrationsSection = styled.section`
  padding: 80px 2rem;
  background: var(--background-gray);
`;

const IntegrationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const IntegrationItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
`;

const IntegrationIcon = styled.div`
  color: var(--accent-color);
  font-size: 1.5rem;
`;

const IntegrationText = styled.span`
  font-weight: 500;
  color: var(--text-primary);
`;

const DemoSection = styled.section`
  padding: 80px 2rem;
  background: white;
  text-align: center;
`;

const DemoButton = styled(motion.a)`
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

interface SolutionsByProductProps {
  product: 'chatbots-whatsapp' | 'chatbots-sites' | 'automacao-agendamentos' | 'qualificacao-leads';
}

const SolutionsByProduct: React.FC<SolutionsByProductProps> = ({ product }) => {
  const { t } = useLanguage();
  
  // Obter dados do produto baseado nas traduções
  const getProductData = () => {
    const productKey = `solutionsByProduct.products.${product}`;
    return {
      title: t(`${productKey}.title`),
      subtitle: t(`${productKey}.subtitle`),
      description: t(`${productKey}.description`),
      features: [
        {
          title: t(`${productKey}.features.0.title`),
          description: t(`${productKey}.features.0.description`)
        },
        {
          title: t(`${productKey}.features.1.title`),
          description: t(`${productKey}.features.1.description`)
        },
        {
          title: t(`${productKey}.features.2.title`),
          description: t(`${productKey}.features.2.description`)
        },
        {
          title: t(`${productKey}.features.3.title`),
          description: t(`${productKey}.features.3.description`)
        }
      ],
      integrations: [
        t(`${productKey}.integrations.0`),
        t(`${productKey}.integrations.1`),
        t(`${productKey}.integrations.2`),
        t(`${productKey}.integrations.3`),
        t(`${productKey}.integrations.4`),
        t(`${productKey}.integrations.5`)
      ],
      whatsappMessage: t(`${productKey}.whatsappMessage`)
    };
  };

  // Obter dados de preços específicos para cada produto
  const getPricingFeatures = (planKey: string) => {
    const productKey = `solutionsByProduct.products.${product}`;
    const pricingKey = `${productKey}.pricing.${planKey}`;
    
    switch (product) {
      case 'chatbots-whatsapp':
        if (planKey === 'starter') {
          return [
            t(`${pricingKey}.features.0`),
            t(`${pricingKey}.features.1`),
            t(`${pricingKey}.features.2`),
            t(`${pricingKey}.features.3`),
            t(`${pricingKey}.features.4`)
          ];
        } else {
          return [
            t(`${pricingKey}.features.0`),
            t(`${pricingKey}.features.1`),
            t(`${pricingKey}.features.2`),
            t(`${pricingKey}.features.3`),
            t(`${pricingKey}.features.4`),
            t(`${pricingKey}.features.5`)
          ];
        }
      case 'chatbots-sites':
        if (planKey === 'starter') {
          return [
            t(`${pricingKey}.features.0`),
            t(`${pricingKey}.features.1`),
            t(`${pricingKey}.features.2`),
            t(`${pricingKey}.features.3`),
            t(`${pricingKey}.features.4`)
          ];
        } else {
          return [
            t(`${pricingKey}.features.0`),
            t(`${pricingKey}.features.1`),
            t(`${pricingKey}.features.2`),
            t(`${pricingKey}.features.3`),
            t(`${pricingKey}.features.4`),
            t(`${pricingKey}.features.5`)
          ];
        }
      case 'automacao-agendamentos':
        if (planKey === 'basic') {
          return [
            t(`${pricingKey}.features.0`),
            t(`${pricingKey}.features.1`),
            t(`${pricingKey}.features.2`),
            t(`${pricingKey}.features.3`),
            t(`${pricingKey}.features.4`)
          ];
        } else {
          return [
            t(`${pricingKey}.features.0`),
            t(`${pricingKey}.features.1`),
            t(`${pricingKey}.features.2`),
            t(`${pricingKey}.features.3`),
            t(`${pricingKey}.features.4`),
            t(`${pricingKey}.features.5`)
          ];
        }
      case 'qualificacao-leads':
        if (planKey === 'starter') {
          return [
            t(`${pricingKey}.features.0`),
            t(`${pricingKey}.features.1`),
            t(`${pricingKey}.features.2`),
            t(`${pricingKey}.features.3`),
            t(`${pricingKey}.features.4`)
          ];
        } else {
          return [
            t(`${pricingKey}.features.0`),
            t(`${pricingKey}.features.1`),
            t(`${pricingKey}.features.2`),
            t(`${pricingKey}.features.3`),
            t(`${pricingKey}.features.4`),
            t(`${pricingKey}.features.5`)
          ];
        }
      default:
        return [];
    }
  };

  const data = getProductData();
  
  // Mapear ícones baseado no produto
  const getIconComponent = () => {
    switch (product) {
      case 'chatbots-whatsapp':
        return FiMessageCircle;
      case 'chatbots-sites':
        return FiGlobe;
      case 'automacao-agendamentos':
        return FiCalendar;
      case 'qualificacao-leads':
        return FiTarget;
      default:
        return FiMessageCircle;
    }
  };

  const IconComponent = getIconComponent();

  // Obter preços baseado no produto
  const getPricingData = () => {
    switch (product) {
      case 'chatbots-whatsapp':
        return {
          starter: { price: 97, name: t('solutionsByProduct.products.chatbots-whatsapp.pricing.starter.name') },
          professional: { price: 197, name: t('solutionsByProduct.products.chatbots-whatsapp.pricing.professional.name'), featured: true }
        };
      case 'chatbots-sites':
        return {
          starter: { price: 147, name: t('solutionsByProduct.products.chatbots-sites.pricing.starter.name') },
          business: { price: 297, name: t('solutionsByProduct.products.chatbots-sites.pricing.business.name'), featured: true }
        };
      case 'automacao-agendamentos':
        return {
          basic: { price: 127, name: t('solutionsByProduct.products.automacao-agendamentos.pricing.basic.name') },
          premium: { price: 247, name: t('solutionsByProduct.products.automacao-agendamentos.pricing.premium.name'), featured: true }
        };
      case 'qualificacao-leads':
        return {
          starter: { price: 167, name: t('solutionsByProduct.products.qualificacao-leads.pricing.starter.name') },
          enterprise: { price: 397, name: t('solutionsByProduct.products.qualificacao-leads.pricing.enterprise.name'), featured: true }
        };
      default:
        return {};
    }
  };

  const pricingData = getPricingData();

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
              {t('solutionsByProduct.cta.talkToExpert')}
            </CTAButton>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <SectionTitle>{t('solutionsByProduct.features.title')}</SectionTitle>
          <FeaturesGrid>
            {data.features.map((feature: any, index: number) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <FeatureIcon>
                  <IconComponent />
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>

      <PricingSection>
        <Container>
          <SectionTitle>{t('solutionsByProduct.pricing.title')}</SectionTitle>
          <PricingGrid>
            {Object.entries(pricingData).map(([key, plan]: [string, any], index: number) => (
              <PricingCard
                key={key}
                className={plan.featured ? 'featured' : ''}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {plan.featured && <FeaturedBadge>{t('solutionsByProduct.pricing.mostPopular')}</FeaturedBadge>}
                <PlanName>{plan.name}</PlanName>
                <PlanPrice>
                  <span className="currency">R$</span>
                  {plan.price}
                  <span className="period">{t('solutionsByProduct.pricing.month')}</span>
                </PlanPrice>
                <PlanFeatures>
                  {getPricingFeatures(key).map((feature: string, featureIndex: number) => (
                    <PlanFeature key={featureIndex}>
                      <FiCheckCircle className="icon" />
                      {feature}
                    </PlanFeature>
                  ))}
                </PlanFeatures>
                <PlanButton
                  href={`https://wa.me/5566984443050?text=${encodeURIComponent(`Olá! Quero saber mais sobre o plano ${plan.name} de ${data.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('solutionsByProduct.pricing.startNow')}
                </PlanButton>
              </PricingCard>
            ))}
          </PricingGrid>
        </Container>
      </PricingSection>

      <IntegrationsSection>
        <Container>
          <SectionTitle>{t('solutionsByProduct.integrations.title')}</SectionTitle>
          <IntegrationsGrid>
            {data.integrations.map((integration: string, index: number) => (
              <IntegrationItem
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <IntegrationIcon>
                  <FiCheckCircle />
                </IntegrationIcon>
                <IntegrationText>{integration}</IntegrationText>
              </IntegrationItem>
            ))}
          </IntegrationsGrid>
        </Container>
      </IntegrationsSection>

      <DemoSection>
        <Container>
          <SectionTitle>{t('solutionsByProduct.demo.title')}</SectionTitle>
          <DemoButton
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlay />
            {t('solutionsByProduct.demo.requestDemo')}
          </DemoButton>
        </Container>
      </DemoSection>

      <CTASection>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <CTATitle>{t('solutionsByProduct.cta.title')}</CTATitle>
          <CTADescription>
            {t('solutionsByProduct.cta.subtitle')}
          </CTADescription>
          <WhatsAppButton
            href={`https://wa.me/5566984443050?text=${encodeURIComponent(data.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaWhatsapp />
            {t('solutionsByProduct.cta.talkOnWhatsApp')}
          </WhatsAppButton>
        </motion.div>
      </CTASection>
    </PageContainer>
  );
};

export default SolutionsByProduct;
