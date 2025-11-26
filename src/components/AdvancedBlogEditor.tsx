import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { 
  FiBold, 
  FiItalic, 
  FiList, 
  FiLink, 
  FiImage, 
  FiYoutube, 
  FiTable, 
  FiType,
  FiMessageSquare,
  FiCode,
  FiRotateCcw,
  FiRotateCw,
  FiSave,
  FiEye,
  FiZap,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle
} from 'react-icons/fi';

const EditorContainer = styled.div`
  background: white;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const EditorHeader = styled.div`
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--background-gray);
`;

const EditorTitle = styled.h3`
  color: var(--primary-color);
  margin: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionButton = styled.button`
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
  font-size: 0.9rem;
  
  &:hover {
    background: var(--primary-dark);
  }
  
  &.secondary {
    background: var(--accent-color);
    
    &:hover {
      background: var(--accent-dark);
    }
  }
  
  &.success {
    background: #28a745;
    
    &:hover {
      background: #218838;
    }
  }
`;

const Toolbar = styled.div`
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  background: white;
`;

const ToolbarButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-color);
  background: ${props => props.active ? 'var(--primary-color)' : 'white'};
  color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-dark)' : 'var(--background-gray)'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EditorContentWrapper = styled.div`
  padding: 2rem;
  min-height: 400px;
  
  .ProseMirror {
    outline: none;
    min-height: 300px;
    
    p {
      margin-bottom: 1rem;
      line-height: 1.6;
    }
    
    h1, h2, h3, h4, h5, h6 {
      margin: 1.5rem 0 1rem;
      color: var(--primary-color);
    }
    
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1.1rem; }
    h6 { font-size: 1rem; }
    
    ul, ol {
      margin: 1rem 0;
      padding-left: 2rem;
    }
    
    li {
      margin-bottom: 0.5rem;
    }
    
    blockquote {
      border-left: 4px solid var(--primary-color);
      padding-left: 1rem;
      margin: 1rem 0;
      font-style: italic;
      color: var(--text-secondary);
    }
    
    code {
      background: var(--background-gray);
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }
    
    pre {
      background: var(--background-gray);
      padding: 1rem;
      border-radius: var(--border-radius);
      overflow-x: auto;
      margin: 1rem 0;
    }
    
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1rem 0;
    }
    
    th, td {
      border: 1px solid var(--border-color);
      padding: 0.5rem;
      text-align: left;
    }
    
    th {
      background: var(--background-gray);
      font-weight: 600;
    }
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: var(--border-radius);
    }
    
    a {
      color: var(--primary-color);
      text-decoration: underline;
      
      &:hover {
        color: var(--primary-dark);
      }
    }
  }
`;

const SEOPanel = styled(motion.div)`
  background: white;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const SEOPanelHeader = styled.div`
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SEOPanelContent = styled.div`
  padding: 2rem;
`;

const SEOGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
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

const SEOAnalysis = styled.div`
  background: var(--background-gray);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-top: 1rem;
`;

const SEOItem = styled.div<{ status: 'good' | 'warning' | 'error' }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  background: white;
  
  .icon {
    color: ${props => {
      switch (props.status) {
        case 'good': return '#28a745';
        case 'warning': return '#ffc107';
        case 'error': return '#dc3545';
        default: return '#6c757d';
      }
    }};
  }
`;

const KeywordSuggestions = styled.div`
  background: var(--background-gray);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-top: 1rem;
`;

const KeywordTag = styled.span`
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin: 0.25rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: var(--primary-dark);
  }
`;

const AdvancedBlogEditor: React.FC<{
  content: string;
  onContentChange: (content: string) => void;
  seoData: any;
  onSEOChange: (seoData: any) => void;
}> = ({ content, onContentChange, seoData, onSEOChange }) => {
  const [showSEO, setShowSEO] = useState(false);
  const [seoAnalysis, setSeoAnalysis] = useState<any>(null);
  const [keywordSuggestions, setKeywordSuggestions] = useState<string[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'link',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'image',
        },
      }),
      Youtube.configure({
        HTMLAttributes: {
          class: 'youtube-video',
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML());
    },
  });

  // Simulação de análise SEO por IA
  const analyzeSEO = () => {
    const analysis = {
      title: {
        status: seoData.title.length > 30 && seoData.title.length < 60 ? 'good' : 'warning',
        message: seoData.title.length < 30 ? 'Título muito curto' : 
                 seoData.title.length > 60 ? 'Título muito longo' : 'Título otimizado'
      },
      description: {
        status: seoData.description.length > 120 && seoData.description.length < 160 ? 'good' : 'warning',
        message: seoData.description.length < 120 ? 'Descrição muito curta' : 
                 seoData.description.length > 160 ? 'Descrição muito longa' : 'Descrição otimizada'
      },
      keywords: {
        status: seoData.keywords.split(',').length >= 3 ? 'good' : 'warning',
        message: seoData.keywords.split(',').length < 3 ? 'Adicione mais palavras-chave' : 'Palavras-chave adequadas'
      },
      content: {
        status: content.length > 300 ? 'good' : 'warning',
        message: content.length < 300 ? 'Conteúdo muito curto' : 'Conteúdo adequado'
      }
    };
    
    setSeoAnalysis(analysis);
  };

  // Simulação de sugestões de palavras-chave por IA
  const generateKeywordSuggestions = () => {
    const suggestions = [
      'chatbot whatsapp',
      'automação marketing',
      'inteligência artificial',
      'atendimento automatizado',
      'vendas online',
      'marketing digital',
      'bot conversacional',
      'customer service',
      'lead generation',
      'conversão de vendas'
    ];
    setKeywordSuggestions(suggestions);
  };

  useEffect(() => {
    if (showSEO) {
      analyzeSEO();
      generateKeywordSuggestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showSEO, seoData, content]);

  const addKeyword = (keyword: string) => {
    const currentKeywords = seoData.keywords ? seoData.keywords.split(',').map((k: string) => k.trim()) : [];
    if (!currentKeywords.includes(keyword)) {
      const newKeywords = [...currentKeywords, keyword].join(', ');
      onSEOChange({ ...seoData, keywords: newKeywords });
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <>
      <EditorContainer>
        <EditorHeader>
          <EditorTitle>Editor Avançado</EditorTitle>
          <ActionButtons>
            <ActionButton 
              className="secondary"
              onClick={() => setShowSEO(!showSEO)}
            >
              <FiTarget />
              {showSEO ? 'Ocultar SEO' : 'Análise SEO'}
            </ActionButton>
            <ActionButton className="success">
              <FiSave />
              Salvar Rascunho
            </ActionButton>
            <ActionButton>
              <FiEye />
              Visualizar
            </ActionButton>
          </ActionButtons>
        </EditorHeader>

        <Toolbar>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive('bold')}
          >
            <FiBold />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive('italic')}
          >
            <FiItalic />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive('heading', { level: 1 })}
          >
            <FiType />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive('bulletList')}
          >
            <FiList />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive('blockquote')}
          >
            <FiMessageSquare />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive('codeBlock')}
          >
            <FiCode />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => {
              const url = window.prompt('URL:');
              if (url) {
                editor.chain().focus().setLink({ href: url }).run();
              }
            }}
            active={editor.isActive('link')}
          >
            <FiLink />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => {
              const url = window.prompt('URL da imagem:');
              if (url) {
                editor.chain().focus().setImage({ src: url }).run();
              }
            }}
          >
            <FiImage />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => {
              const url = window.prompt('URL do YouTube:');
              if (url) {
                editor.chain().focus().setYoutubeVideo({ src: url }).run();
              }
            }}
          >
            <FiYoutube />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().insertTable().run()}
          >
            <FiTable />
          </ToolbarButton>
          

          
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <FiRotateCcw />
          </ToolbarButton>
          
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <FiRotateCw />
          </ToolbarButton>
        </Toolbar>

        <EditorContentWrapper>
          <EditorContent editor={editor} />
        </EditorContentWrapper>
      </EditorContainer>

      {showSEO && (
        <SEOPanel
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SEOPanelHeader>
            <FiZap />
            <strong>Análise SEO por IA</strong>
          </SEOPanelHeader>
          
          <SEOPanelContent>
            <SEOGrid>
              <FormGroup>
                <Label>Título SEO (Meta Title)</Label>
                <Input
                  type="text"
                  value={seoData.title || ''}
                  onChange={(e) => onSEOChange({ ...seoData, title: e.target.value })}
                  placeholder="Título otimizado para SEO"
                />
                <small>Recomendado: 30-60 caracteres</small>
              </FormGroup>
              
              <FormGroup>
                <Label>Descrição SEO (Meta Description)</Label>
                <TextArea
                  value={seoData.description || ''}
                  onChange={(e) => onSEOChange({ ...seoData, description: e.target.value })}
                  placeholder="Descrição que aparecerá nos resultados de busca"
                />
                <small>Recomendado: 120-160 caracteres</small>
              </FormGroup>
              
              <FormGroup>
                <Label>Palavras-chave</Label>
                <Input
                  type="text"
                  value={seoData.keywords || ''}
                  onChange={(e) => onSEOChange({ ...seoData, keywords: e.target.value })}
                  placeholder="palavra1, palavra2, palavra3"
                />
                <small>Separe por vírgulas</small>
              </FormGroup>
              
              <FormGroup>
                <Label>Slug (URL)</Label>
                <Input
                  type="text"
                  value={seoData.slug || ''}
                  onChange={(e) => onSEOChange({ ...seoData, slug: e.target.value })}
                  placeholder="url-do-post"
                />
                <small>URL amigável para SEO</small>
              </FormGroup>
            </SEOGrid>

            {seoAnalysis && (
              <SEOAnalysis>
                <h4 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
                  <FiTrendingUp style={{ marginRight: '0.5rem' }} />
                  Análise SEO
                </h4>
                
                <SEOItem status={seoAnalysis.title.status}>
                  <FiCheckCircle className="icon" />
                  <span><strong>Título:</strong> {seoAnalysis.title.message}</span>
                </SEOItem>
                
                <SEOItem status={seoAnalysis.description.status}>
                  <FiCheckCircle className="icon" />
                  <span><strong>Descrição:</strong> {seoAnalysis.description.message}</span>
                </SEOItem>
                
                <SEOItem status={seoAnalysis.keywords.status}>
                  <FiCheckCircle className="icon" />
                  <span><strong>Palavras-chave:</strong> {seoAnalysis.keywords.message}</span>
                </SEOItem>
                
                <SEOItem status={seoAnalysis.content.status}>
                  <FiCheckCircle className="icon" />
                  <span><strong>Conteúdo:</strong> {seoAnalysis.content.message}</span>
                </SEOItem>
              </SEOAnalysis>
            )}

            <KeywordSuggestions>
              <h4 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>
                <FiTarget style={{ marginRight: '0.5rem' }} />
                Sugestões de Palavras-chave por IA
              </h4>
              <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Clique nas palavras-chave sugeridas para adicioná-las automaticamente:
              </p>
              {keywordSuggestions.map((keyword, index) => (
                <KeywordTag 
                  key={index}
                  onClick={() => addKeyword(keyword)}
                >
                  {keyword}
                </KeywordTag>
              ))}
            </KeywordSuggestions>
          </SEOPanelContent>
        </SEOPanel>
      )}
    </>
  );
};

export default AdvancedBlogEditor;
