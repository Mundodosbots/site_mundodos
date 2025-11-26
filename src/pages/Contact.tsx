import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiMessageCircle } from 'react-icons/fi';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;
`;

const ContactSection = styled.section`
  padding: 80px 0;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled.div`
  h3 {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: var(--background-gray);
  border-radius: var(--border-radius);
  
  svg {
    color: var(--primary-color);
    font-size: 1.5rem;
    flex-shrink: 0;
  }
  
  div {
    h4 {
      margin-bottom: 0.25rem;
      color: var(--text-primary);
    }
    
    p {
      color: var(--text-secondary);
      margin: 0;
    }
  }
`;

const FormContainer = styled.div`
  background: white;
  padding: 2.5rem;
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

const MapSection = styled.section`
  padding: 80px 0;
  background: var(--background-gray);
`;

const MapContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: var(--border-radius-large);
  overflow: hidden;
  box-shadow: var(--shadow-medium);
`;

const MapFrame = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
`;





const FAQSection = styled.section`
  padding: 80px 0;
  background: var(--background-gray);
`;

const FAQItem = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  margin-bottom: 1rem;
  
  h4 {
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  p {
    color: var(--text-secondary);
    margin: 0;
  }
`;

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    assunto: '',
    investimento: '',
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
    // Aqui você implementaria o envio do formulário
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      empresa: '',
      assunto: '',
      investimento: '',
      mensagem: ''
    });
  };

  const faqs = [
    {
      question: 'Quanto tempo leva para implementar um chatbot?',
      answer: 'O tempo de implementação varia de acordo com a complexidade do projeto. Chatbots simples podem ficar prontos em 1-2 semanas, enquanto projetos mais complexos podem levar 4-6 semanas.'
    },
    {
      question: 'Vocês oferecem suporte técnico após a implementação?',
      answer: 'Sim! Oferecemos suporte técnico completo por 12 meses após a implementação, incluindo manutenção, atualizações e treinamento da equipe.'
    },
    {
      question: 'Os chatbots funcionam em todos os dispositivos?',
      answer: 'Sim, nossos chatbots são responsivos e funcionam perfeitamente em smartphones, tablets e computadores, mantendo a mesma qualidade de atendimento.'
    },
    {
      question: 'Posso personalizar o chatbot com a identidade da minha marca?',
      answer: 'Absolutamente! Personalizamos completamente o chatbot com as cores, logo, tom de voz e personalidade da sua marca para manter a consistência.'
    },
    {
      question: 'Como funciona o processo de qualificação de leads?',
      answer: 'Nosso sistema utiliza inteligência artificial para analisar o comportamento do usuário, fazer perguntas estratégicas e pontuar leads automaticamente, enviando apenas os mais qualificados para sua equipe.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contato - Mundo dos Bots | Fale Conosco</title>
        <meta name="description" content="Entre em contato com a Mundo dos Bots. Estamos prontos para ajudar sua empresa a transformar o atendimento com chatbots inteligentes." />
      </Helmet>

      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Entre em Contato</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem', opacity: 0.9 }}>
              Estamos prontos para ajudar sua empresa a transformar o atendimento com chatbots inteligentes
            </p>
          </motion.div>
        </div>
      </HeroSection>

      <ContactSection>
        <div className="container">
          <div className="section-title">
            <h2>Fale Conosco</h2>
            <p>Escolha a forma mais conveniente para entrar em contato conosco</p>
          </div>

          <ContactGrid>
            <ContactInfo>
              <h3>Informações de Contato</h3>
              
              <ContactItem>
                <FiMail />
                <div>
                  <h4>E-mail</h4>
                  <p>contato@mundodosbots.com.br</p>
                </div>
              </ContactItem>

              <ContactItem>
                <FiPhone />
                <div>
                  <h4>Telefone</h4>
                  <p>(66) 98444-3050</p>
                </div>
              </ContactItem>

              <ContactItem>
                <FiMapPin />
                <div>
                  <h4>Endereço</h4>
                  <p>R. das Aroeiras, 766 - Sala A - St. Comercial, Sinop - MT, 78550-224</p>
                </div>
              </ContactItem>

              <ContactItem>
                <FiClock />
                <div>
                  <h4>Horário de Atendimento</h4>
                  <p>Segunda a Sexta: 9h às 18h</p>
                </div>
              </ContactItem>

              <ContactItem>
                <FiMessageCircle />
                <div>
                  <h4>WhatsApp</h4>
                  <p>(66) 98444-3050</p>
                </div>
              </ContactItem>

              <div style={{ marginTop: '2rem' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Redes Sociais</h4>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Siga-nos nas redes sociais para ficar por dentro das novidades em chatbots e automação.
                </p>
              </div>
            </ContactInfo>

            <FormContainer>
              <h3 style={{ marginBottom: '2rem', color: 'var(--primary-color)' }}>Envie sua Mensagem</h3>
              
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
                  <label htmlFor="empresa">Empresa</label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label htmlFor="assunto">Assunto *</label>
                  <select
                    id="assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione um assunto...</option>
                    <option value="chatbot-whatsapp">Chatbot para WhatsApp</option>
                    <option value="chatbot-site">Chatbot para Site</option>
                    <option value="agendamentos">Automação de Agendamentos</option>
                    <option value="leads">Qualificação de Leads</option>
                    <option value="franquia">Franquia</option>
                    <option value="outros">Outros</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label htmlFor="investimento">Investimento Mensal Disponível</label>
                  <select
                    id="investimento"
                    name="investimento"
                    value={formData.investimento}
                    onChange={handleInputChange}
                  >
                    <option value="">Selecione...</option>
                    <option value="780-1500">R$ 780 - R$ 1.500 mensais</option>
                    <option value="1500-3000">R$ 1.500 - R$ 3.000 mensais</option>
                    <option value="3000-5000">R$ 3.000 - R$ 5.000 mensais</option>
                    <option value="5000-10000">R$ 5.000 - R$ 10.000 mensais</option>
                    <option value="10000+">Acima de R$ 10.000 mensais</option>
                    <option value="nao-informado">Prefiro não informar</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <label htmlFor="mensagem">Mensagem *</label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Conte-nos sobre sua necessidade..."
                    required
                  />
                </FormGroup>

                <SubmitButton type="submit">
                  Enviar Mensagem
                  <FiSend />
                </SubmitButton>
              </form>
            </FormContainer>
          </ContactGrid>
        </div>
      </ContactSection>

      <FAQSection>
        <div className="container">
          <div className="section-title">
            <h2>Perguntas Frequentes</h2>
            <p>Respostas para as dúvidas mais comuns sobre nossos serviços</p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </FAQItem>
            ))}
          </div>
        </div>
      </FAQSection>

      <MapSection>
        <div className="container">
          <div className="section-title">
            <h2>Nossa Localização</h2>
            <p>Venha nos visitar em Sinop - MT</p>
          </div>
          
          <MapContainer>
            <MapFrame
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.1234567890123!2d-55.6333!3d-11.8333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDUwJzAwLjAiUyA1NcKwMzgnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890123"
              title="Mundo dos Bots - Sinop MT"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </MapContainer>
        </div>
      </MapSection>


    </>
  );
};

export default Contact;
