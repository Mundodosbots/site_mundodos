import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { 
  FiArrowRight, 
  FiStar, 
  FiUsers, 
  FiTrendingUp, 
  FiZap,
  FiShield,
  FiClock,
  FiBarChart,
  FiPlay
} from 'react-icons/fi';
import styled from 'styled-components';

const LandingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fffe 0%, #e8f5f3 100%);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 100px 0 80px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.4rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CTAButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b35, #f7931e);
  color: white;
  padding: 1.2rem 3rem;
  border: none;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 107, 53, 0.4);
  }
`;

const VideoButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1rem 2rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const StatsSection = styled.section`
  padding: 60px 0;
  background: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatCard = styled(motion.div)`
  .stat-number {
    font-size: 3rem;
    font-weight: 800;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  .stat-label {
    font-size: 1.1rem;
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

const BenefitsSection = styled.section`
  padding: 80px 0;
  background: #f8fffe;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const BenefitCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    
    svg {
      font-size: 2rem;
      color: white;
    }
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

const ChannelsSection = styled.section`
  padding: 80px 0;
  background: white;
`;

const ChannelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
`;

const ChannelCard = styled(motion.div)`
  background: #f8fffe;
  padding: 2rem 1.5rem;
  border-radius: 15px;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);
    box-shadow: 0 10px 25px rgba(3, 95, 54, 0.1);
  }
  
  .logo {
    width: 60px;
    height: 60px;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: grayscale(0.2);
      transition: all 0.3s ease;
    }
    
    .fallback {
      font-size: 2.5rem;
    }
  }
  
  &:hover .logo img {
    filter: grayscale(0);
    transform: scale(1.1);
  }
  
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-primary);
  }
  
  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const ArgumentsSection = styled.section`
  padding: 80px 0;
  background: #f8fffe;
`;

const ArgumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ArgumentCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  .icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    
    svg {
      font-size: 2rem;
      color: white;
    }
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--text-primary);
  }
  
  p {
    color: var(--text-secondary);
    line-height: 1.6;
  }
`;

const TestimonialsSection = styled.section`
  padding: 80px 0;
  background: #f8fffe;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  .stars {
    color: #ffc107;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  .text {
    font-style: italic;
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
    line-height: 1.6;
  }
  
  .author {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .avatar {
      width: 50px;
      height: 50px;
      background: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
    }
    
    .info {
      .name {
        font-weight: 600;
        color: var(--text-primary);
      }
      
      .company {
        color: var(--text-secondary);
        font-size: 0.9rem;
      }
    }
  }
`;

const FinalCTASection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  text-align: center;
`;

const FormSection = styled.div`
  max-width: 600px;
  margin: 2rem auto 0;
  background: rgba(255, 255, 255, 0.15);
  padding: 3rem;
  border-radius: 25px;
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const HeroFormSection = styled.div`
  max-width: 500px;
  margin: 3rem auto 0;
  background: rgba(255, 255, 255, 0.95);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  
  h3 {
    color: var(--primary-color);
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  input, select {
    background: white !important;
    border: 2px solid #e0e0e0 !important;
    color: var(--text-primary) !important;
    
    &:focus {
      border-color: var(--primary-color) !important;
      box-shadow: 0 0 0 3px rgba(3, 95, 54, 0.1) !important;
    }
    
    &::placeholder {
      color: #999 !important;
    }
  }
  
  button {
    background: var(--primary-color) !important;
    border: none !important;
    
    &:hover {
      background: var(--primary-dark) !important;
    }
  }
`;

const MiddleFormSection = styled.div`
  max-width: 500px;
  margin: 3rem auto;
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  
  h3 {
    color: var(--primary-color);
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  input, select {
    background: #f8f9fa !important;
    border: 2px solid #e0e0e0 !important;
    color: var(--text-primary) !important;
    
    &:focus {
      border-color: var(--primary-color) !important;
      box-shadow: 0 0 0 3px rgba(3, 95, 54, 0.1) !important;
      background: white !important;
    }
    
    &::placeholder {
      color: #999 !important;
    }
  }
  
  button {
    background: var(--primary-color) !important;
    border: none !important;
    
    &:hover {
      background: var(--primary-dark) !important;
    }
  }
`;


const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  input {
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

// Componente de formulário reutilizável
const FormularioComponent: React.FC<{ 
  formData: any, 
  handleInputChange: any, 
  handleSubmit: any, 
  titulo: string,
  botaoTexto: string 
}> = ({ formData, handleInputChange, handleSubmit, titulo, botaoTexto }) => (
  <form onSubmit={handleSubmit}>
    <h3 style={{ color: 'var(--primary-color)', textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: '600' }}>
      {titulo}
    </h3>
    
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
        style={{
          width: '100%',
          padding: '1rem',
          border: 'none',
          borderRadius: '10px',
          fontSize: '1rem',
          background: 'rgba(255, 255, 255, 0.9)',
          color: 'var(--text-primary)'
        }}
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {botaoTexto}
      <FiArrowRight />
    </CTAButton>
  </form>
);

const LandingPage: React.FC = () => {
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
      empresa: formData.empresa,
      investimento: formData.investimento || 'Não informado',
      subject: 'Nova Solicitação de Chatbot - Landing Page',
      mensagem: `Nova solicitação de chatbot através da landing page:

Nome: ${formData.nome}
Email: ${formData.email}
Telefone: ${formData.telefone}
Empresa: ${formData.empresa}
Investimento disponível: ${formData.investimento || 'Não informado'}

O interessado quer saber mais sobre os planos e como começar.`
    };
    
    // Enviar email
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response: any) => {
        console.log('Email enviado com sucesso!', response.status, response.text);
        alert('Obrigado pelo interesse! Seus dados foram enviados com sucesso. Entraremos em contato em breve.');
        // Limpar formulário
        setFormData({
          nome: '',
          email: '',
          telefone: '',
          empresa: '',
          investimento: ''
        });
      })
      .catch((error: any) => {
        console.error('Erro ao enviar email:', error);
        alert('Desculpe, ocorreu um erro ao enviar seus dados. Por favor, tente novamente ou entre em contato pelo WhatsApp.');
      });
  };

  const benefits = [
    {
      icon: <FiZap />,
      title: 'Automação Inteligente',
      description: 'Chatbots com IA que entendem e respondem como humanos, 24/7.'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Aumente suas Vendas',
      description: 'Converta 3x mais leads em clientes com atendimento instantâneo.'
    },
    {
      icon: <FiUsers />,
      title: 'Atendimento Personalizado',
      description: 'Cada cliente recebe uma experiência única e relevante.'
    },
    {
      icon: <FiShield />,
      title: '100% Seguro',
      description: 'Dados protegidos com criptografia e conformidade LGPD.'
    },
    {
      icon: <FiClock />,
      title: 'Implementação Rápida',
      description: 'Seu chatbot funcionando em menos de 48 horas.'
    },
    {
      icon: <FiBarChart />,
      title: 'Relatórios Detalhados',
      description: 'Acompanhe métricas e otimize seus resultados em tempo real.'
    }
  ];


  const testimonials = [
    {
      text: "O chatbot da Mundo dos Bots aumentou nossas vendas em 250%! Atendimento 24/7 que realmente funciona.",
      author: "Maria Silva",
      company: "Loja Virtual Plus",
      rating: 5
    },
    {
      text: "Implementação super rápida e suporte excepcional. Nossos clientes adoram a experiência!",
      author: "João Santos",
      company: "Tech Solutions",
      rating: 5
    },
    {
      text: "ROI incrível! Em 3 meses já recuperamos o investimento e triplicamos os leads qualificados.",
      author: "Ana Costa",
      company: "Marketing Digital Pro",
      rating: 5
    }
  ];

  return (
    <>
      <Helmet>
        <title>Chatbots Inteligentes que Vendem Mais | Mundo dos Bots</title>
        <meta name="description" content="Transforme visitantes em clientes com chatbots inteligentes. Aumente vendas em 300%, atendimento 24/7 e implementação em 48h. Teste grátis!" />
      </Helmet>

      <LandingContainer>
        <HeroSection>
          <div className="container">
            <HeroContent>
              <HeroTitle
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Transforme Visitantes em <br />
                <span style={{ color: '#ff6b35' }}>Clientes Pagantes</span>
              </HeroTitle>
              
              <HeroSubtitle
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Chatbots inteligentes que vendem 24/7, qualificam leads automaticamente 
                e aumentam suas vendas em até <strong>300%</strong>
              </HeroSubtitle>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
              >
                <CTAButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://wa.me/556684443050', '_blank')}
                >
                  Falar no WhatsApp
                  <FiArrowRight />
                </CTAButton>
                
                <VideoButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('https://youtu.be/fHtznnn5Ml4', '_blank')}
                >
                  <FiPlay />
                  Ver Demonstração
                </VideoButton>
              </motion.div>
              
              {/* Formulário no Hero */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <HeroFormSection>
                  <FormularioComponent
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    titulo="🚀 Comece Agora - É Grátis!"
                    botaoTexto="Quero Meu Chatbot Agora!"
                  />
                </HeroFormSection>
              </motion.div>
            </HeroContent>
          </div>
        </HeroSection>

        <StatsSection>
          <div className="container">
            <StatsGrid>
              <StatCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="stat-number">300%</div>
                <div className="stat-label">Aumento nas Vendas</div>
              </StatCard>
              
              <StatCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stat-number">24/7</div>
                <div className="stat-label">Atendimento Contínuo</div>
              </StatCard>
              
              <StatCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="stat-number">48h</div>
                <div className="stat-label">Implementação</div>
              </StatCard>
              
              <StatCard
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="stat-number">500+</div>
                <div className="stat-label">Empresas Atendidas</div>
              </StatCard>
            </StatsGrid>
          </div>
        </StatsSection>

        <BenefitsSection>
          <div className="container">
            <div className="section-title">
              <h2>Por que Escolher a Mundo dos Bots?</h2>
              <p>Revolucione seu atendimento e vendas com tecnologia de ponta</p>
            </div>
            
            <BenefitsGrid>
              {benefits.map((benefit, index) => (
                <BenefitCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="icon">
                    {benefit.icon}
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </BenefitCard>
              ))}
            </BenefitsGrid>
          </div>
        </BenefitsSection>

        <ChannelsSection>
          <div className="container">
            <div className="section-title">
              <h2>Conectamos com Seus Clientes em Todos os Canais</h2>
              <p>Seus clientes estão em todos os lugares. Nossos chatbots também!</p>
            </div>
            
            <ChannelsGrid>
              {[
                { 
                  name: 'WhatsApp', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
                  description: 'O canal mais usado no Brasil' 
                },
                { 
                  name: 'Instagram', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
                  description: 'Engaje com stories e posts' 
                },
                { 
                  name: 'Facebook Messenger', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Messenger_logo_2020.svg',
                  description: 'Conecte com sua audiência' 
                },
                { 
                  name: 'Telegram', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
                  description: 'Comunicação rápida e segura' 
                },
                { 
                  name: 'SMS', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/SMS_logo.svg',
                  description: 'Alcance direto no celular' 
                },
                { 
                  name: 'Email', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.svg',
                  description: 'Comunicação profissional' 
                },
                { 
                  name: 'Web Chatbot', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Web_chat_icon.svg',
                  description: 'Atendimento no seu site' 
                },
                { 
                  name: 'Viber', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Viber_logo.svg',
                  description: 'Popular na Europa e Ásia' 
                },
                { 
                  name: 'TikTok', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/TikTok_logo.svg',
                  description: 'Engaje a geração Z' 
                },
                { 
                  name: 'Voice', 
                  logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Voice_icon.svg',
                  description: 'Atendimento por voz' 
                }
              ].map((channel, index) => (
                <ChannelCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="logo">
                    <img 
                      src={channel.logo} 
                      alt={`Logo ${channel.name}`}
                      onError={(e) => {
                        // Fallback para emoji se a logo não carregar
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) {
                          fallback.style.display = 'block';
                        }
                      }}
                    />
                    <div className="fallback" style={{ display: 'none' }}>
                      {channel.name === 'WhatsApp' && '💬'}
                      {channel.name === 'Instagram' && '📸'}
                      {channel.name === 'Facebook Messenger' && '💙'}
                      {channel.name === 'Telegram' && '✈️'}
                      {channel.name === 'SMS' && '📱'}
                      {channel.name === 'Email' && '📧'}
                      {channel.name === 'Web Chatbot' && '🌐'}
                      {channel.name === 'Viber' && '💜'}
                      {channel.name === 'TikTok' && '🎵'}
                      {channel.name === 'Voice' && '🎤'}
                    </div>
                  </div>
                  <h3>{channel.name}</h3>
                  <p>{channel.description}</p>
                </ChannelCard>
              ))}
            </ChannelsGrid>
          </div>
        </ChannelsSection>

        <ArgumentsSection>
          <div className="container">
            <div className="section-title">
              <h2>Por que Escolher a Mundo dos Bots?</h2>
              <p>Mais de 500 empresas já transformaram seu atendimento conosco</p>
            </div>
            
            <ArgumentsGrid>
              {[
                {
                  icon: <FiZap />,
                  title: 'Implementação em 48h',
                  description: 'Seu chatbot funcionando em menos de 2 dias. Sem complicações, sem demora.'
                },
                {
                  icon: <FiShield />,
                  title: '100% Seguro e Confiável',
                  description: 'Dados protegidos com criptografia de ponta e conformidade total com a LGPD.'
                },
                {
                  icon: <FiTrendingUp />,
                  title: 'ROI Comprovado',
                  description: 'Nossos clientes aumentam vendas em até 300% e reduzem custos em 60%.'
                },
                {
                  icon: <FiUsers />,
                  title: 'Suporte Especializado',
                  description: 'Equipe técnica dedicada para garantir que tudo funcione perfeitamente.'
                },
                {
                  icon: <FiClock />,
                  title: 'Atendimento 24/7',
                  description: 'Seus clientes nunca mais ficam sem resposta, mesmo nos fins de semana.'
                },
                {
                  icon: <FiBarChart />,
                  title: 'Relatórios Detalhados',
                  description: 'Acompanhe métricas em tempo real e otimize seus resultados constantemente.'
                }
              ].map((argument, index) => (
                <ArgumentCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="icon">
                    {argument.icon}
                  </div>
                  <h3>{argument.title}</h3>
                  <p>{argument.description}</p>
                </ArgumentCard>
              ))}
            </ArgumentsGrid>
          </div>
        </ArgumentsSection>

        {/* Formulário no Meio da Página */}
        <section style={{ padding: '80px 0', background: 'var(--background-gray)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                Pronto para Começar?
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas
              </p>
            </div>
            
            <MiddleFormSection>
              <FormularioComponent
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                titulo="💼 Solicite Sua Proposta Personalizada"
                botaoTexto="Solicitar Proposta Agora!"
              />
            </MiddleFormSection>
          </div>
        </section>

        <TestimonialsSection>
          <div className="container">
            <div className="section-title">
              <h2>O que Nossos Clientes Dizem</h2>
              <p>Resultados reais de empresas que confiam na Mundo dos Bots</p>
            </div>
            
            <TestimonialsGrid>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FiStar key={i} style={{ fill: 'currentColor' }} />
                    ))}
                  </div>
                  
                  <p className="text">"{testimonial.text}"</p>
                  
                  <div className="author">
                    <div className="avatar">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="info">
                      <div className="name">{testimonial.author}</div>
                      <div className="company">{testimonial.company}</div>
                    </div>
                  </div>
                </TestimonialCard>
              ))}
            </TestimonialsGrid>
          </div>
        </TestimonialsSection>

        <FinalCTASection>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                Pronto para Revolucionar suas Vendas?
              </h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
                Junte-se a mais de 500 empresas que já aumentaram suas vendas com nossos chatbots
              </p>
              
              <FormSection>
                <FormularioComponent
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  titulo="🎯 Última Chance - Não Perca!"
                  botaoTexto="Quero Meu Chatbot Agora!"
                />
              </FormSection>
            </motion.div>
          </div>
        </FinalCTASection>
      </LandingContainer>
    </>
  );
};

export default LandingPage;
