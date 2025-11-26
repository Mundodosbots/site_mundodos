import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSave, FiGlobe, FiPhone, FiSettings, FiImage } from 'react-icons/fi';
import ImageUpload from '../components/ImageUpload';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

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
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  min-height: 100px;
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

const ToggleSwitch = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const Switch = styled.input`
  position: relative;
  width: 50px;
  height: 24px;
  appearance: none;
  background: var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: var(--transition);
  
  &:checked {
    background: var(--primary-color);
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: 2px;
    transition: var(--transition);
  }
  
  &:checked::before {
    left: 28px;
  }
`;

const AdminSiteSettings: React.FC = () => {
  const { settings, updateSettings } = useSiteSettings();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (field: string, value: any) => {
    updateSettings({ [field]: value });
  };

  return (
    <>
      {showSuccess && (
        <SuccessMessage
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          ✅ Configurações salvas com sucesso!
        </SuccessMessage>
      )}

      <ContentSection>
        <SectionHeader>
          <SectionTitle>
            <FiGlobe />
            Informações Gerais
          </SectionTitle>
          <SaveButton onClick={handleSave}>
            <FiSave />
            Salvar
          </SaveButton>
        </SectionHeader>
        
        <Form onSubmit={handleSave}>
          <Grid>
            <FormGroup>
              <Label>Nome do Site</Label>
              <Input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleInputChange('siteName', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Descrição do Site</Label>
              <Input
                type="text"
                value={settings.siteDescription}
                onChange={(e) => handleInputChange('siteDescription', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Palavras-chave</Label>
              <Input
                type="text"
                value={settings.siteKeywords}
                onChange={(e) => handleInputChange('siteKeywords', e.target.value)}
                placeholder="palavra1, palavra2, palavra3"
              />
            </FormGroup>
          </Grid>
        </Form>
      </ContentSection>

      <ContentSection>
        <SectionHeader>
          <SectionTitle>
            <FiImage />
            Logo do Site
          </SectionTitle>
        </SectionHeader>
        
        <Form>
          <FormGroup>
            <Label>Logo Principal</Label>
            <ImageUpload
              value={settings.siteLogo}
              onChange={(url) => handleInputChange('siteLogo', url)}
              placeholder="Clique para fazer upload da nova logo ou cole uma URL"
            />
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <strong>Dicas:</strong>
              <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                <li>Use imagens em formato PNG ou SVG para melhor qualidade</li>
                <li>Recomendado: largura mínima de 200px e altura de 60px</li>
                <li>Fundo transparente para melhor integração</li>
                <li>Tamanho máximo: 2MB</li>
              </ul>
            </div>
          </FormGroup>
        </Form>
      </ContentSection>

      <ContentSection>
        <SectionHeader>
          <SectionTitle>
            <FiPhone />
            Informações de Contato
          </SectionTitle>
        </SectionHeader>
        
        <Form>
          <Grid>
            <FormGroup>
              <Label>Nome da Empresa</Label>
              <Input
                type="text"
                value={settings.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>CNPJ</Label>
              <Input
                type="text"
                value={settings.cnpj}
                onChange={(e) => handleInputChange('cnpj', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Telefone</Label>
              <Input
                type="text"
                value={settings.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>WhatsApp</Label>
              <Input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </FormGroup>
          </Grid>
          
          <FormGroup>
            <Label>Endereço Completo</Label>
            <TextArea
              value={settings.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
          </FormGroup>
        </Form>
      </ContentSection>

      <ContentSection>
        <SectionHeader>
          <SectionTitle>
            <FiGlobe />
            Redes Sociais
          </SectionTitle>
        </SectionHeader>
        
        <Form>
          <Grid>
            <FormGroup>
              <Label>Facebook</Label>
              <Input
                type="url"
                value={settings.facebook}
                onChange={(e) => handleInputChange('facebook', e.target.value)}
                placeholder="https://facebook.com/..."
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Instagram</Label>
              <Input
                type="url"
                value={settings.instagram}
                onChange={(e) => handleInputChange('instagram', e.target.value)}
                placeholder="https://instagram.com/..."
              />
            </FormGroup>
            
            <FormGroup>
              <Label>LinkedIn</Label>
              <Input
                type="url"
                value={settings.linkedin}
                onChange={(e) => handleInputChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/..."
              />
            </FormGroup>
          </Grid>
        </Form>
      </ContentSection>

      <ContentSection>
        <SectionHeader>
          <SectionTitle>
            <FiSettings />
            Configurações do Site
          </SectionTitle>
        </SectionHeader>
        
        <Form>
          <Grid>
            <FormGroup>
              <ToggleSwitch>
                <Switch
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => handleInputChange('maintenanceMode', e.target.checked)}
                />
                Modo Manutenção
              </ToggleSwitch>
            </FormGroup>
            
            <FormGroup>
              <ToggleSwitch>
                <Switch
                  type="checkbox"
                  checked={settings.allowComments}
                  onChange={(e) => handleInputChange('allowComments', e.target.checked)}
                />
                Permitir Comentários
              </ToggleSwitch>
            </FormGroup>
            
            <FormGroup>
              <ToggleSwitch>
                <Switch
                  type="checkbox"
                  checked={settings.enableAnalytics}
                  onChange={(e) => handleInputChange('enableAnalytics', e.target.checked)}
                />
                Habilitar Analytics
              </ToggleSwitch>
            </FormGroup>
            
            <FormGroup>
              <Label>ID do Google Analytics</Label>
              <Input
                type="text"
                value={settings.googleAnalyticsId}
                onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
                placeholder="GA-XXXXXXXXX"
              />
            </FormGroup>
          </Grid>
        </Form>
      </ContentSection>

      <ContentSection>
        <SectionHeader>
          <SectionTitle>
            <FiGlobe />
            Configurações SEO
          </SectionTitle>
        </SectionHeader>
        
        <Form>
          <Grid>
            <FormGroup>
              <Label>Título Meta (Meta Title)</Label>
              <Input
                type="text"
                value={settings.metaTitle}
                onChange={(e) => handleInputChange('metaTitle', e.target.value)}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>URL Canônica</Label>
              <Input
                type="url"
                value={settings.canonicalUrl}
                onChange={(e) => handleInputChange('canonicalUrl', e.target.value)}
              />
            </FormGroup>
          </Grid>
          
          <FormGroup>
            <Label>Descrição Meta (Meta Description)</Label>
            <TextArea
              value={settings.metaDescription}
              onChange={(e) => handleInputChange('metaDescription', e.target.value)}
              placeholder="Descrição que aparecerá nos resultados de busca"
            />
          </FormGroup>
        </Form>
      </ContentSection>
    </>
  );
};

export default AdminSiteSettings;
