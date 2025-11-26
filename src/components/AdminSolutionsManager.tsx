import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiTarget, FiBriefcase, FiPackage, FiEdit, FiEye, FiPlus, FiTrash2, FiSave, FiX } from 'react-icons/fi';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: var(--primary-color);
  font-size: 1.8rem;
  font-weight: 600;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--border-color);
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Tab = styled.button<{ active: boolean }>`
  padding: 1rem 2rem;
  background: ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  border: none;
  border-radius: 8px 8px 0 0;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? 'var(--primary-dark)' : 'var(--background-gray)'};
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #00b894;
    transform: translateY(-2px);
  }
`;

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
`;

const SolutionCard = styled(motion.div)`
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const SolutionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const SolutionTitle = styled.h3`
  color: var(--primary-color);
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const SolutionActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'view' | 'delete' }>`
  padding: 0.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  background: ${props => {
    switch (props.variant) {
      case 'edit': return 'var(--primary-color)';
      case 'view': return 'var(--accent-color)';
      case 'delete': return '#ef4444';
      default: return 'var(--text-secondary)';
    }
  }};

  &:hover {
    transform: scale(1.1);
  }
`;

const SolutionMeta = styled.div`
  margin-bottom: 1rem;
`;

const SolutionSlug = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0.25rem 0;
`;

const SolutionStatus = styled.span<{ active: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  background: ${props => props.active ? '#10b981' : '#ef4444'};
  color: white;
`;

const FormOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const FormContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const FormTitle = styled.h3`
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  padding: 0.5rem;

  &:hover {
    color: var(--text-primary);
  }
`;

const FormGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--text-primary);
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SaveButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #00b894;
  }
`;

const CancelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--text-secondary);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #6b7280;
  }
`;

interface Solution {
  id: number;
  name: string;
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  is_active: boolean;
  order_position: number;
}

interface AdminSolutionsManagerProps {
  type: 'objective' | 'sector' | 'product';
}

const AdminSolutionsManager: React.FC<AdminSolutionsManagerProps> = ({ type }) => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    title: '',
    subtitle: '',
    description: ''
  });

  const typeLabels = {
    objective: { title: 'Soluções por Objetivo', icon: FiTarget },
    sector: { title: 'Soluções por Setor', icon: FiBriefcase },
    product: { title: 'Soluções por Produto', icon: FiPackage }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const IconComponent = typeLabels[type].icon;

  useEffect(() => {
    fetchSolutions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const fetchSolutions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/solutions/${type}`);
      const data = await response.json();
      
      if (data.success) {
        setSolutions(data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar soluções:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingSolution(null);
    setFormData({
      name: '',
      slug: '',
      title: '',
      subtitle: '',
      description: ''
    });
    setShowForm(true);
  };

  const handleEdit = (solution: Solution) => {
    setEditingSolution(solution);
    setFormData({
      name: solution.name,
      slug: solution.slug,
      title: solution.title,
      subtitle: solution.subtitle || '',
      description: solution.description || ''
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      const url = editingSolution 
        ? `/api/solutions/${type}/${editingSolution.id}`
        : `/api/solutions/${type}`;
      
      const method = editingSolution ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        setShowForm(false);
        fetchSolutions();
      }
    } catch (error) {
      console.error('Erro ao salvar solução:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir esta solução?')) return;

    try {
      const response = await fetch(`/api/solutions/${type}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        fetchSolutions();
      }
    } catch (error) {
      console.error('Erro ao excluir solução:', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Container>
      <Header>
        <Title>{typeLabels[type].title}</Title>
        <AddButton onClick={handleAddNew}>
          <FiPlus />
          Nova Solução
        </AddButton>
      </Header>

      <SolutionsGrid>
        {solutions.map((solution) => (
          <SolutionCard
            key={solution.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SolutionHeader>
              <SolutionTitle>{solution.name}</SolutionTitle>
              <SolutionActions>
                <ActionButton variant="view" title="Visualizar">
                  <FiEye />
                </ActionButton>
                <ActionButton variant="edit" title="Editar" onClick={() => handleEdit(solution)}>
                  <FiEdit />
                </ActionButton>
                <ActionButton variant="delete" title="Excluir" onClick={() => handleDelete(solution.id)}>
                  <FiTrash2 />
                </ActionButton>
              </SolutionActions>
            </SolutionHeader>
            
            <SolutionMeta>
              <SolutionSlug>/{solution.slug}</SolutionSlug>
              <SolutionStatus active={solution.is_active}>
                {solution.is_active ? 'Ativo' : 'Inativo'}
              </SolutionStatus>
            </SolutionMeta>
            
            <p>{solution.title}</p>
            {solution.subtitle && <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{solution.subtitle}</p>}
          </SolutionCard>
        ))}
      </SolutionsGrid>

      {showForm && (
        <FormOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowForm(false)}
        >
          <FormContainer
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <FormHeader>
              <FormTitle>
                {editingSolution ? 'Editar Solução' : 'Nova Solução'}
              </FormTitle>
              <CloseButton onClick={() => setShowForm(false)}>
                <FiX />
              </CloseButton>
            </FormHeader>

            <FormGrid>
              <FormGroup>
                <Label>Nome</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome da solução"
                />
              </FormGroup>

              <FormGroup>
                <Label>Slug</Label>
                <Input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="slug-da-solucao"
                />
              </FormGroup>

              <FormGroup>
                <Label>Título</Label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Título da página"
                />
              </FormGroup>

              <FormGroup>
                <Label>Subtítulo</Label>
                <Input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Subtítulo da página"
                />
              </FormGroup>

              <FormGroup>
                <Label>Descrição</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição da solução"
                />
              </FormGroup>
            </FormGrid>

            <FormActions>
              <SaveButton onClick={handleSave}>
                <FiSave />
                {editingSolution ? 'Atualizar' : 'Criar'}
              </SaveButton>
              <CancelButton onClick={() => setShowForm(false)}>
                <FiX />
                Cancelar
              </CancelButton>
            </FormActions>
          </FormContainer>
        </FormOverlay>
      )}
    </Container>
  );
};

export default AdminSolutionsManager;
