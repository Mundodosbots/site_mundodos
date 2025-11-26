import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash2, FiSave, FiX } from 'react-icons/fi';

const CategoryManagerContainer = styled.div`
  background: white;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const CategoryHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CategoryTitle = styled.h4`
  color: var(--primary-color);
  margin: 0;
`;

const AddButton = styled.button`
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
`;

const CategoryList = styled.div`
  padding: 2rem;
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  background: var(--background-gray);
`;

const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CategoryName = styled.span`
  font-weight: 600;
  color: var(--text-primary);
`;

const CategorySlug = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
  background: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

const CategoryActions = styled.div`
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

const CategoryForm = styled(motion.div)`
  padding: 2rem;
  border-top: 1px solid var(--border-color);
  background: var(--background-gray);
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  align-items: end;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
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

const CancelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--text-light);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: var(--text-secondary);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
`;

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

interface CategoryManagerProps {
  categories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ categories, onCategoriesChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: ''
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleNameChange = (name: string) => {
    const slug = generateSlug(name);
    setFormData({ ...formData, name, slug });
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;

    if (editingCategory) {
      // Editando categoria existente
      const updatedCategories = categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...formData }
          : cat
      );
      onCategoriesChange(updatedCategories);
    } else {
      // Criando nova categoria
      const newCategory: Category = {
        id: Date.now(),
        name: formData.name,
        slug: formData.slug,
        description: formData.description
      };
      onCategoriesChange([...categories, newCategory]);
    }

    // Limpar formulário
    setFormData({ name: '', slug: '', description: '' });
    setEditingCategory(null);
    setShowForm(false);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || ''
    });
    setShowForm(true);
  };

  const handleDelete = (categoryId: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      const updatedCategories = categories.filter(cat => cat.id !== categoryId);
      onCategoriesChange(updatedCategories);
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', slug: '', description: '' });
    setEditingCategory(null);
    setShowForm(false);
  };

  return (
    <CategoryManagerContainer>
      <CategoryHeader>
        <CategoryTitle>Gerenciar Categorias</CategoryTitle>
        <AddButton onClick={() => setShowForm(true)}>
          <FiPlus />
          Nova Categoria
        </AddButton>
      </CategoryHeader>

      <CategoryList>
        {categories.length === 0 ? (
          <EmptyState>
            <p>Nenhuma categoria criada ainda.</p>
            <p>Clique em "Nova Categoria" para começar.</p>
          </EmptyState>
        ) : (
          categories.map((category) => (
            <CategoryItem key={category.id}>
              <CategoryInfo>
                <CategoryName>{category.name}</CategoryName>
                <CategorySlug>{category.slug}</CategorySlug>
                {category.description && (
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {category.description}
                  </span>
                )}
              </CategoryInfo>
              <CategoryActions>
                <ActionButton
                  title="Editar"
                  onClick={() => handleEdit(category)}
                >
                  <FiEdit />
                </ActionButton>
                <ActionButton
                  title="Excluir"
                  className="delete"
                  onClick={() => handleDelete(category.id)}
                >
                  <FiTrash2 />
                </ActionButton>
              </CategoryActions>
            </CategoryItem>
          ))
        )}
      </CategoryList>

      {showForm && (
        <CategoryForm
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FormGrid>
            <FormGroup>
              <Label>Nome da Categoria</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Ex: Marketing Digital"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Slug (URL)</Label>
              <Input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="marketing-digital"
              />
            </FormGroup>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <SaveButton onClick={handleSave}>
                <FiSave />
                {editingCategory ? 'Atualizar' : 'Criar'}
              </SaveButton>
              <CancelButton onClick={handleCancel}>
                <FiX />
                Cancelar
              </CancelButton>
            </div>
          </FormGrid>
          
          <FormGroup style={{ marginTop: '1rem' }}>
            <Label>Descrição (Opcional)</Label>
            <Input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Breve descrição da categoria"
            />
          </FormGroup>
        </CategoryForm>
      )}
    </CategoryManagerContainer>
  );
};

export default CategoryManager;
