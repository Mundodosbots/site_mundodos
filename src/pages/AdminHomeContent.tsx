import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSave, FiEdit, FiEye, FiPlus, FiTrash2 } from 'react-icons/fi';

const ContentSection = styled.section`
  background: white;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h3`
  color: var(--primary-color);
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: var(--primary-dark);
  }
`;

const Form = styled.form`
  padding: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(48, 46, 97, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(48, 46, 97, 0.1);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ServiceCard = styled.div`
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  position: relative;
`;

const ServiceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ServiceTitle = styled.h4`
  color: var(--primary-color);
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:hover {
    background: var(--background-gray);
    color: var(--primary-color);
  }
  
  &.delete:hover {
    color: #e74c3c;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AdminHomeContent: React.FC = () => {
  const [heroData, setHeroData] = useState({
    title: 'Transforme sua Comunicação com a Inteligência Artificial dos Nossos Bots',
    subtitle: 'Soluções completas em chatbots para WhatsApp, sites e automação de marketing',
    ctaText: 'Fale com um Especialista',
    ctaLink: '/contato'
  });

  const [services, setServices] = useState([
    {
      id: 1,
      title: 'Chatbots para WhatsApp',
      description: 'Automatize seu atendimento e aumente suas vendas com chatbots inteligentes para WhatsApp.',
      icon: 'FiMessageCircle'
    },
    {
      id: 2,
      title: 'Chatbots para Sites',
      description: 'Mantenha seus visitantes engajados com chatbots interativos em seu site.',
      icon: 'FiSmartphone'
    },
    {
      id: 3,
      title: 'Automação de Marketing',
      description: 'Otimize suas campanhas de marketing com automação inteligente.',
      icon: 'FiTrendingUp'
    }
  ]);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleHeroSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleServiceSave = (serviceId: number, updatedService: any) => {
    setServices(services.map(service => 
      service.id === serviceId ? { ...service, ...updatedService } : service
    ));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const addService = () => {
    const newService = {
      id: Date.now(),
      title: 'Novo Serviço',
      description: 'Descrição do novo serviço',
      icon: 'FiPlus'
    };
    setServices([...services, newService]);
  };

  const deleteService = (serviceId: number) => {
    setServices(services.filter(service => service.id !== serviceId));
  };

  return (
    <>
      {showSuccess && (
        <SuccessMessage
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          ✅ Conteúdo salvo com sucesso!
        </SuccessMessage>
      )}

      <ContentSection>
        <SectionHeader>
          <SectionTitle>Seção Hero (Banner Principal)</SectionTitle>
          <SaveButton onClick={handleHeroSave}>
            <FiSave />
            Salvar
          </SaveButton>
        </SectionHeader>
        
        <Form onSubmit={handleHeroSave}>
          <Grid>
            <FormGroup>
              <Label>Título Principal</Label>
              <Input
                type="text"
                value={heroData.title}
                onChange={(e) => setHeroData({...heroData, title: e.target.value})}
                placeholder="Título impactante para o banner"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Subtítulo</Label>
              <Input
                type="text"
                value={heroData.subtitle}
                onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
                placeholder="Subtítulo descritivo"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Texto do Botão CTA</Label>
              <Input
                type="text"
                value={heroData.ctaText}
                onChange={(e) => setHeroData({...heroData, ctaText: e.target.value})}
                placeholder="Ex: Fale com um Especialista"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Link do Botão CTA</Label>
              <Input
                type="text"
                value={heroData.ctaLink}
                onChange={(e) => setHeroData({...heroData, ctaLink: e.target.value})}
                placeholder="Ex: /contato"
              />
            </FormGroup>
          </Grid>
        </Form>
      </ContentSection>

      <ContentSection>
        <SectionHeader>
          <SectionTitle>Serviços Principais</SectionTitle>
          <SaveButton onClick={addService}>
            <FiPlus />
            Adicionar Serviço
          </SaveButton>
        </SectionHeader>
        
        <div style={{ padding: '2rem' }}>
          <Grid>
            {services.map((service) => (
              <ServiceCard key={service.id}>
                <ServiceHeader>
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ActionButtons>
                    <ActionButton title="Visualizar">
                      <FiEye />
                    </ActionButton>
                    <ActionButton title="Editar">
                      <FiEdit />
                    </ActionButton>
                    <ActionButton 
                      title="Excluir" 
                      className="delete"
                      onClick={() => deleteService(service.id)}
                    >
                      <FiTrash2 />
                    </ActionButton>
                  </ActionButtons>
                </ServiceHeader>
                
                <FormGroup>
                  <Label>Título do Serviço</Label>
                  <Input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleServiceSave(service.id, { title: e.target.value })}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Descrição</Label>
                  <TextArea
                    value={service.description}
                    onChange={(e) => handleServiceSave(service.id, { description: e.target.value })}
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Ícone</Label>
                  <Input
                    type="text"
                    value={service.icon}
                    onChange={(e) => handleServiceSave(service.id, { icon: e.target.value })}
                    placeholder="Ex: FiMessageCircle"
                  />
                </FormGroup>
              </ServiceCard>
            ))}
          </Grid>
        </div>
      </ContentSection>
    </>
  );
};

export default AdminHomeContent;
