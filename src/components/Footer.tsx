import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiMessageCircle, FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi';
import styled from 'styled-components';
import { useLanguage } from '../contexts/LanguageContext';

const FooterContainer = styled.footer`
  background: var(--background-dark);
  color: white;
  padding: 60px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
  
  ul {
    list-style: none;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #ccc;
    text-decoration: none;
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: #ccc;
  
  svg {
    color: var(--primary-color);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    transition: var(--transition);
    
    &:hover {
      background: var(--primary-light);
      transform: translateY(-2px);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #333;
  padding-top: 20px;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
`;

const Newsletter = styled.div`
  margin-top: 1rem;
  
  p {
    margin-bottom: 1rem;
    color: #ccc;
  }
  
  form {
    display: flex;
    gap: 0.5rem;
    
    @media (max-width: 480px) {
      flex-direction: column;
    }
  }
  
  input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #333;
    border-radius: var(--border-radius);
    background: #222;
    color: white;
    outline: none;
    
    &:focus {
      border-color: var(--primary-color);
    }
  }
  
  button {
    padding: 0.75rem 1.5rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    transition: var(--transition);
    
    &:hover {
      background: var(--primary-light);
    }
  }
`;

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>Mundo dos Bots</h3>
          <p style={{ color: '#ccc', marginBottom: '0.5rem' }}>
            Especialistas em chatbots e automação. Transforme sua comunicação com inteligência artificial.
          </p>
          <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            IA Soluções de Tecnologia em Atendimento LTDA
          </p>
          <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '1rem' }}>
            CNPJ: 43.327.090/0001-32
          </p>
          <SocialLinks>
            <a href="https://facebook.com/mundodosbots" target="_blank" rel="noopener noreferrer">
              <FiFacebook />
            </a>
            <a href="https://instagram.com/mundodosbots" target="_blank" rel="noopener noreferrer">
              <FiInstagram />
            </a>
            <a href="https://linkedin.com/company/mundodosbots" target="_blank" rel="noopener noreferrer">
              <FiLinkedin />
            </a>
            <a href="https://twitter.com/mundodosbots" target="_blank" rel="noopener noreferrer">
              <FiTwitter />
            </a>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>{t('footer.services')}</h3>
          <ul>
            <li><Link to="/servicos#whatsapp">{t('header.whatsappChatbots')}</Link></li>
            <li><Link to="/servicos#sites">{t('header.websiteChatbots')}</Link></li>
            <li><Link to="/servicos#agendamentos">{t('header.appointmentAutomation')}</Link></li>
            <li><Link to="/servicos#leads">{t('header.leadQualification')}</Link></li>
            <li><Link to="/servicos#marketing">{t('header.automateMarketing')}</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>{t('footer.company')}</h3>
          <ul>
            <li><Link to="/quem-somos">{t('header.about')}</Link></li>
            <li><Link to="/franquia">{t('header.franchise')}</Link></li>
            <li><Link to="/blog">{t('header.blog')}</Link></li>
            <li><Link to="/trabalhe-conosco">{t('header.workWithUs')}</Link></li>
            <li><Link to="/contato">{t('header.contact')}</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>{t('footer.contact')}</h3>
          <ContactInfo>
            <FiMail />
            <span>contato@mundodosbots.com.br</span>
          </ContactInfo>
          <ContactInfo>
            <FiPhone />
            <span>(66) 98444-3050</span>
          </ContactInfo>
          <ContactInfo>
            <FiMapPin />
            <span>R. das Aroeiras, 766 - Sala A - St. Comercial, Sinop - MT, 78550-224</span>
          </ContactInfo>
          <ContactInfo>
            <FiMessageCircle />
            <span>(66) 98444-3050</span>
          </ContactInfo>
          
          <Newsletter>
            <p>{t('footer.newsletter')}</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder={t('footer.newsletterPlaceholder')} />
              <button type="submit">{t('footer.newsletterButton')}</button>
            </form>
          </Newsletter>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <div className="container">
          <p>© 2024 Mundo dos Bots. Todos os direitos reservados.</p>
          <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem' }}>
            IA Soluções de Tecnologia em Atendimento LTDA | CNPJ: 43.327.090/0001-32
          </p>
          <p>
            <Link to="/politica-privacidade" style={{ color: '#999', marginRight: '1rem' }}>
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/termos-uso" style={{ color: '#999' }}>
              {t('footer.termsOfService')}
            </Link>
          </p>
        </div>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
