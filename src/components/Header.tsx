import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import styled from 'styled-components';
import logoImage from '../assets/logo-horizontal.png';
import { useLanguage } from '../contexts/LanguageContext';

import LanguageSelector from './LanguageSelector';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  transition: var(--transition);
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  
  img {
    height: 60px;
    width: auto;
    max-width: 200px;
    object-fit: contain;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.div`
  position: relative;
  
  &:hover .mega-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const NavLink = styled(Link)`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  
  &:hover {
    color: var(--primary-color);
  }
`;

const MegaMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  background: white;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-heavy);
  padding: 2rem;
  min-width: 800px;
  opacity: 0;
  visibility: hidden;
  transition: var(--transition);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MegaMenuContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
`;

const MegaMenuColumn = styled.div`
  h3 {
    color: var(--primary-color);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--primary-color);
  }
  
  ul {
    list-style: none;
  }
  
  li {
    margin-bottom: 0.75rem;
  }
  
  a {
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 0.95rem;
    transition: var(--transition);
    
    &:hover {
      color: var(--primary-color);
      padding-left: 0.5rem;
    }
  }
`;



const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-primary);
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid var(--border-color);
  padding: 2rem;
  box-shadow: var(--shadow-medium);
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavItem = styled.div`
  margin-bottom: 1.5rem;
  
  a {
    display: block;
    color: var(--text-primary);
    text-decoration: none;
    font-weight: 500;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
    
    &:hover {
      color: var(--primary-color);
    }
  }
`;

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const solutionsData = {
    porObjetivo: [
      { name: t('header.increaseSales'), href: '/solucoes/aumentar-vendas' },
      { name: t('header.improveService'), href: '/solucoes/melhorar-atendimento' },
      { name: t('header.automateMarketing'), href: '/solucoes/automatizar-marketing' },
      { name: t('header.reduceCosts'), href: '/solucoes/reduzir-custos' }
    ],
    porSetor: [
      { name: t('header.ecommerce'), href: '/solucoes/ecommerce' },
      { name: t('header.realEstate'), href: '/solucoes/imobiliarias' },
      { name: t('header.clinics'), href: '/solucoes/clinicas-consultorios' },
      { name: t('header.education'), href: '/solucoes/educacao' },
      { name: t('header.industry'), href: '/solucoes/industria' }
    ],
    porProduto: [
      { name: t('header.whatsappChatbots'), href: '/solucoes/chatbots-whatsapp' },
      { name: t('header.websiteChatbots'), href: '/solucoes/chatbots-sites' },
      { name: t('header.appointmentAutomation'), href: '/solucoes/automacao-agendamentos' },
      { name: t('header.leadQualification'), href: '/solucoes/qualificacao-leads' }
    ]
  };

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          <img src={logoImage} alt="Mundo dos Bots" />
        </Logo>

        <NavMenu>
          <NavItem>
            <NavLink to="/">
              {t('header.home')}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/servicos">
              {t('header.solutions')} <FiChevronDown />
            </NavLink>
            <MegaMenu className="mega-menu">
              <MegaMenuContent>
                <MegaMenuColumn>
                  <h3>{t('header.solutionsByObjective')}</h3>
                  <ul>
                    {solutionsData.porObjetivo.map((item, index) => (
                      <li key={index}>
                        <Link to={item.href}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </MegaMenuColumn>
                
                <MegaMenuColumn>
                  <h3>{t('header.solutionsBySector')}</h3>
                  <ul>
                    {solutionsData.porSetor.map((item, index) => (
                      <li key={index}>
                        <Link to={item.href}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </MegaMenuColumn>
                
                <MegaMenuColumn>
                  <h3>{t('header.solutionsByProduct')}</h3>
                  <ul>
                    {solutionsData.porProduto.map((item, index) => (
                      <li key={index}>
                        <Link to={item.href}>{item.name}</Link>
                      </li>
                    ))}
                  </ul>
                </MegaMenuColumn>
              </MegaMenuContent>
            </MegaMenu>
          </NavItem>

          <NavItem>
            <NavLink to="/blog">
              {t('header.blog')}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/franquia">
              {t('header.franchise')}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/quem-somos">
              {t('header.about')}
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink to="/contato">
              {t('header.contact')}
            </NavLink>
          </NavItem>

          <LanguageSelector />
        </NavMenu>

        <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </Nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNavItem>
              <Link to="/">{t('header.home')}</Link>
            </MobileNavItem>
            <MobileNavItem>
              <Link to="/servicos">{t('header.solutions')}</Link>
            </MobileNavItem>
            <MobileNavItem>
              <Link to="/blog">{t('header.blog')}</Link>
            </MobileNavItem>
            <MobileNavItem>
              <Link to="/franquia">{t('header.franchise')}</Link>
            </MobileNavItem>
            <MobileNavItem>
              <Link to="/quem-somos">{t('header.about')}</Link>
            </MobileNavItem>
            <MobileNavItem>
              <Link to="/contato">{t('header.contact')}</Link>
            </MobileNavItem>
            <MobileNavItem>
              <Link to="/trabalhe-conosco">{t('header.workWithUs')}</Link>
            </MobileNavItem>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
