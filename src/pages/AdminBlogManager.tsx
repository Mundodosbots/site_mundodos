import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiSave, FiEdit, FiEye, FiPlus, FiTrash2 } from 'react-icons/fi';
import AdvancedBlogEditor from '../components/AdvancedBlogEditor';
import ImageUpload from '../components/ImageUpload';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

interface AdminBlogManagerProps {
  categories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
}

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
  min-height: 200px;
  resize: vertical;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(48, 46, 97, 0.1);
  }
`;

const Select = styled.select`
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 1rem 2rem;
  text-align: left;
  background: var(--background-gray);
  font-weight: 600;
  color: var(--text-primary);
`;

const Td = styled.td`
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-secondary);
`;

const TableActionButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  margin-right: 0.5rem;
  
  &:hover {
    background: var(--background-gray);
    color: var(--primary-color);
  }
  
  &.delete:hover {
    color: #e74c3c;
  }
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius);
  font-size: 0.8rem;
  background: ${props => {
    switch (props.status) {
      case 'Publicado': return '#d4edda';
      case 'Agendado': return '#cce5ff';
      case 'Rascunho': return '#fff3cd';
      default: return '#f8d7da';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case 'Publicado': return '#155724';
      case 'Agendado': return '#004085';
      case 'Rascunho': return '#856404';
      default: return '#721c24';
    }
  }};
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

const AdminBlogManager: React.FC<AdminBlogManagerProps> = ({ categories, onCategoriesChange }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Como chatbots podem aumentar suas vendas',
      slug: 'como-chatbots-podem-aumentar-vendas',
      content: 'Conteúdo completo do post sobre como chatbots podem aumentar vendas...',
      excerpt: 'Descubra como implementar chatbots para aumentar significativamente suas vendas...',
      category: 'Vendas',
      status: 'Publicado',
      date: '2024-01-15',
      image: '/images/blog/chatbot-vendas.jpg',
      scheduledDate: ''
    },
    {
      id: 2,
      title: 'Automação de marketing: guia completo',
      slug: 'automacao-marketing-guia-completo',
      content: 'Guia completo sobre automação de marketing...',
      excerpt: 'Aprenda tudo sobre automação de marketing e como implementar...',
      category: 'Marketing',
      status: 'Rascunho',
      date: '2024-01-14',
      image: '/images/blog/automacao-marketing.jpg',
      scheduledDate: ''
    }
  ]);

  const [editingPost, setEditingPost] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: '',
    slug: ''
  });



  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      setPosts(posts.map(post => 
        post.id === editingPost.id ? editingPost : post
      ));
    } else {
      const newPost = {
        id: Date.now(),
        title: 'Novo Post',
        slug: 'novo-post',
        content: 'Conteúdo do novo post...',
        excerpt: 'Resumo do novo post...',
        category: 'Vendas',
        status: 'Rascunho',
        date: new Date().toISOString().split('T')[0],
        image: '/images/blog/default.jpg',
        scheduledDate: ''
      };
      setPosts([...posts, newPost]);
    }
    setEditingPost(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEditPost = (post: any) => {
    setEditingPost(post);
  };

  const handleDeletePost = (postId: number) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const renderPostForm = () => (
    <ContentSection>
      <SectionHeader>
        <SectionTitle>
          {editingPost ? 'Editar Post' : 'Criar Novo Post'}
        </SectionTitle>
        <ActionButton onClick={handleSavePost}>
          <FiSave />
          Salvar Post
        </ActionButton>
      </SectionHeader>
      
      <Form onSubmit={handleSavePost}>
        <Grid>
          <FormGroup>
            <Label>Título do Post</Label>
            <Input
              type="text"
              value={editingPost?.title || ''}
              onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
              placeholder="Título do post"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Categoria</Label>
            <Select
              value={editingPost?.category || ''}
              onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>{category.name}</option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Status</Label>
            <Select
              value={editingPost?.status || ''}
              onChange={(e) => setEditingPost({...editingPost, status: e.target.value})}
            >
              <option value="Rascunho">Rascunho</option>
              <option value="Agendado">Agendado</option>
              <option value="Publicado">Publicar Agora</option>
            </Select>
          </FormGroup>
          
          {editingPost?.status === 'Agendado' && (
            <FormGroup>
              <Label>Data e Hora de Publicação</Label>
              <Input
                type="datetime-local"
                value={editingPost?.scheduledDate || ''}
                onChange={(e) => setEditingPost({...editingPost, scheduledDate: e.target.value})}
              />
            </FormGroup>
          )}
          
          <FormGroup>
            <Label>Imagem de Destaque</Label>
            <ImageUpload
              value={editingPost?.image || ''}
              onChange={(url) => setEditingPost({...editingPost, image: url})}
              placeholder="Clique para fazer upload da imagem de destaque"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Data de Publicação</Label>
            <Input
              type="date"
              value={editingPost?.date || ''}
              onChange={(e) => setEditingPost({...editingPost, date: e.target.value})}
            />
          </FormGroup>
        </Grid>
        
        <FormGroup>
          <Label>Resumo (Excerpt)</Label>
          <TextArea
            value={editingPost?.excerpt || ''}
            onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
            placeholder="Resumo do post que aparecerá na listagem"
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Conteúdo Completo</Label>
        </FormGroup>
        
        <AdvancedBlogEditor
          content={editingPost?.content || ''}
          onContentChange={(content) => setEditingPost({...editingPost, content})}
          seoData={seoData}
          onSEOChange={setSeoData}
        />
      </Form>
    </ContentSection>
  );

  const renderPostsList = () => (
    <ContentSection>
      <SectionHeader>
        <SectionTitle>Posts do Blog</SectionTitle>
        <ActionButton onClick={() => setEditingPost({})}>
          <FiPlus />
          Novo Post
        </ActionButton>
      </SectionHeader>
      
      <div style={{ padding: '2rem' }}>
        <Table>
          <thead>
            <tr>
              <Th>Título</Th>
              <Th>Categoria</Th>
              <Th>Status</Th>
              <Th>Data</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <Td>{post.title}</Td>
                <Td>{post.category}</Td>
                <Td>
                  <StatusBadge status={post.status}>
                    {post.status}
                    {post.status === 'Agendado' && post.scheduledDate && (
                      <div style={{ fontSize: '0.7rem', marginTop: '0.25rem' }}>
                        {new Date(post.scheduledDate).toLocaleString('pt-BR')}
                      </div>
                    )}
                  </StatusBadge>
                </Td>
                <Td>{post.date}</Td>
                <Td>
                  <TableActionButton title="Visualizar">
                    <FiEye />
                  </TableActionButton>
                  <TableActionButton 
                    title="Editar"
                    onClick={() => handleEditPost(post)}
                  >
                    <FiEdit />
                  </TableActionButton>
                  <TableActionButton 
                    title="Excluir" 
                    className="delete"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <FiTrash2 />
                  </TableActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </ContentSection>
  );

  return (
    <>
      {showSuccess && (
        <SuccessMessage
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          ✅ Post salvo com sucesso!
        </SuccessMessage>
      )}

      {editingPost !== null && renderPostForm()}
      {renderPostsList()}
    </>
  );
};

export default AdminBlogManager;
