import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUpload, FiImage, FiX, FiCopy } from 'react-icons/fi';

const UploadContainer = styled.div`
  border: 2px dashed var(--border-color);
  border-radius: var(--border-radius);
  padding: 2rem;
  text-align: center;
  transition: var(--transition);
  cursor: pointer;
  background: var(--background-gray);
  
  &:hover {
    border-color: var(--primary-color);
    background: rgba(48, 46, 97, 0.05);
  }
  
  &.has-image {
    border-style: solid;
    border-color: var(--primary-color);
  }
`;

const UploadIcon = styled.div`
  font-size: 3rem;
  color: var(--text-light);
  margin-bottom: 1rem;
`;

const UploadText = styled.div`
  color: var(--text-secondary);
  margin-bottom: 1rem;
`;

const UploadButton = styled.button`
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.9rem;
  
  &:hover {
    background: var(--primary-dark);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-light);
`;

const ImageActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: center;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.8rem;
  
  &:hover {
    background: var(--primary-dark);
  }
  
  &.danger {
    background: #e74c3c;
    
    &:hover {
      background: #c0392b;
    }
  }
`;

const URLInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  margin-top: 1rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(48, 46, 97, 0.1);
  }
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
`;

const Tab = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-bottom: 2px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-secondary)'};
  font-weight: ${props => props.active ? '600' : '400'};
  transition: var(--transition);
  
  &:hover {
    color: var(--primary-color);
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #d4edda;
  color: #155724;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
`;

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, placeholder = "Clique para fazer upload ou arraste uma imagem" }) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simular upload - em produção, isso seria enviado para um servidor
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        onChange(result);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        onChange(result);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    onChange('');
  };

  const copyToClipboard = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const currentImage = uploadedImage || value;

  return (
    <div>
      <TabContainer>
        <Tab 
          active={activeTab === 'upload'} 
          onClick={() => setActiveTab('upload')}
        >
          <FiUpload style={{ marginRight: '0.5rem' }} />
          Upload
        </Tab>
        <Tab 
          active={activeTab === 'url'} 
          onClick={() => setActiveTab('url')}
        >
          <FiImage style={{ marginRight: '0.5rem' }} />
          URL
        </Tab>
      </TabContainer>

      {activeTab === 'upload' && (
        <UploadContainer
          className={currentImage ? 'has-image' : ''}
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!currentImage ? (
            <>
              <UploadIcon>
                <FiUpload />
              </UploadIcon>
              <UploadText>{placeholder}</UploadText>
              <UploadButton>Selecionar Imagem</UploadButton>
            </>
          ) : (
            <ImagePreview>
              <PreviewImage src={currentImage} alt="Preview" />
              <ImageActions>
                <ActionButton onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}>
                  <FiUpload />
                  Trocar Imagem
                </ActionButton>
                <ActionButton onClick={(e) => {
                  e.stopPropagation();
                  copyToClipboard();
                }}>
                  <FiCopy />
                  Copiar URL
                </ActionButton>
                <ActionButton 
                  className="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveImage();
                  }}
                >
                  <FiX />
                  Remover
                </ActionButton>
              </ImageActions>
            </ImagePreview>
          )}
          
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
          />
        </UploadContainer>
      )}

      {activeTab === 'url' && (
        <div>
          <URLInput
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://exemplo.com/imagem.jpg"
          />
          {value && (
            <ImagePreview>
              <PreviewImage src={value} alt="Preview" />
              <ImageActions>
                <ActionButton onClick={copyToClipboard}>
                  <FiCopy />
                  Copiar URL
                </ActionButton>
                <ActionButton 
                  className="danger"
                  onClick={handleRemoveImage}
                >
                  <FiX />
                  Remover
                </ActionButton>
              </ImageActions>
            </ImagePreview>
          )}
        </div>
      )}

      {showSuccess && (
        <SuccessMessage
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          ✅ {activeTab === 'upload' ? 'Imagem carregada com sucesso!' : 'URL copiada para a área de transferência!'}
        </SuccessMessage>
      )}
    </div>
  );
};

export default ImageUpload;
