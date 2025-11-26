import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import styled from 'styled-components';

const WhatsAppButton = styled.a`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: #25d366;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  text-decoration: none;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    transform: scale(1.1);
    background: #128c7e;
    color: white;
    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
  }
  
  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }
`;

const WhatsAppButtonComponent: React.FC = () => {
  return (
    <WhatsAppButton 
      href="https://wa.me/5566984443050?text=Olá! Gostaria de saber mais sobre os chatbots da Mundo dos Bots."
      target="_blank"
      rel="noopener noreferrer"
      title="Fale conosco no WhatsApp"
      aria-label="Abrir WhatsApp"
    >
      <FaWhatsapp />
    </WhatsAppButton>
  );
};

export default WhatsAppButtonComponent;
