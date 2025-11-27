import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FiPlus, 
  FiEdit2, 
  FiTrash2, 
  FiUser, 
  FiMail, 
  FiShield,
  FiCheck,
  FiX,
  FiSave,
  FiRefreshCw
} from 'react-icons/fi';
import { API_BASE_URL } from '../utils/config';

const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 600;
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  background: ${props => {
    switch (props.variant) {
      case 'primary': return 'var(--primary-color)';
      case 'danger': return '#e74c3c';
      default: return 'var(--background-gray)';
    }
  }};
  color: ${props => props.variant === 'secondary' ? 'var(--text-primary)' : 'white'};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: var(--transition);
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow-light);
`;

const TableHeader = styled.thead`
  background: var(--background-gray);
`;

const TableRow = styled.tr`
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--text-primary);
`;

const TableCell = styled.td`
  padding: 1rem;
  color: var(--text-secondary);
`;

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => props.active ? '#d4edda' : '#f8d7da'};
  color: ${props => props.active ? '#155724' : '#721c24'};
`;

const RoleBadge = styled.span<{ role: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => props.role === 'admin' ? '#cce5ff' : '#e6f3ff'};
  color: ${props => props.role === 'admin' ? '#0066cc' : '#004499'};
`;

const ActionButton = styled.button<{ variant?: 'edit' | 'delete' | 'activate' }>`
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  color: var(--text-light);
  transition: var(--transition);
  margin-right: 0.5rem;
  
  &:hover {
    background: var(--background-gray);
    color: ${props => {
      switch (props.variant) {
        case 'edit': return 'var(--primary-color)';
        case 'delete': return '#e74c3c';
        case 'activate': return '#27ae60';
        default: return 'var(--text-primary)';
      }
    }};
  }
`;

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-light);
  
  &:hover {
    color: var(--text-primary);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #f3f3f3;
  border-top: 2px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'editor';
  is_active: boolean;
}

const UserManager: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: 'editor',
    is_active: true
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const API_BASE = API_BASE_URL;

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/users`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.data);
      } else {
        setError('Erro ao carregar usuários');
      }
    } catch (error) {
      setError('Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        is_active: user.is_active
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'editor',
        is_active: true
      });
    }
    setModalOpen(true);
    setError('');
    setSuccess('');
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'editor',
      is_active: true
    });
    setError('');
    setSuccess('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingUser ? `${API_BASE}/users/${editingUser.id}` : `${API_BASE}/users`;
      const method = editingUser ? 'PUT' : 'POST';

      const body: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        is_active: formData.is_active
      };

      // Só incluir senha se estiver preenchida ou for um novo usuário
      if (formData.password || !editingUser) {
        body.password = formData.password;
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setSuccess(editingUser ? 'Usuário atualizado com sucesso!' : 'Usuário criado com sucesso!');
        fetchUsers();
        setTimeout(() => {
          closeModal();
        }, 1500);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao salvar usuário');
      }
    } catch (error) {
      setError('Erro ao salvar usuário');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (user: User) => {
    if (!window.confirm(`Tem certeza que deseja desativar o usuário ${user.name}?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/users/${user.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setSuccess('Usuário desativado com sucesso!');
        fetchUsers();
      } else {
        setError('Erro ao desativar usuário');
      }
    } catch (error) {
      setError('Erro ao desativar usuário');
    }
  };

  const handleActivate = async (user: User) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE}/users/${user.id}/activate`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setSuccess('Usuário reativado com sucesso!');
        fetchUsers();
      } else {
        setError('Erro ao reativar usuário');
      }
    } catch (error) {
      setError('Erro ao reativar usuário');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <Container>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <LoadingSpinner />
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Carregando usuários...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Gerenciar Usuários</Title>
        <Button onClick={() => openModal()}>
          <FiPlus />
          Novo Usuário
        </Button>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Criado em</TableHeaderCell>
            <TableHeaderCell>Ações</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiUser />
                  {user.name}
                </div>
              </TableCell>
              <TableCell>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FiMail />
                  {user.email}
                </div>
              </TableCell>
              <TableCell>
                <RoleBadge role={user.role}>
                  <FiShield style={{ marginRight: '0.25rem' }} />
                  {user.role}
                </RoleBadge>
              </TableCell>
              <TableCell>
                <StatusBadge active={user.is_active}>
                  {user.is_active ? (
                    <>
                      <FiCheck style={{ marginRight: '0.25rem' }} />
                      Ativo
                    </>
                  ) : (
                    <>
                      <FiX style={{ marginRight: '0.25rem' }} />
                      Inativo
                    </>
                  )}
                </StatusBadge>
              </TableCell>
              <TableCell>{formatDate(user.created_at)}</TableCell>
              <TableCell>
                <ActionButton variant="edit" onClick={() => openModal(user)}>
                  <FiEdit2 />
                </ActionButton>
                {user.is_active ? (
                  <ActionButton variant="delete" onClick={() => handleDelete(user)}>
                    <FiTrash2 />
                  </ActionButton>
                ) : (
                  <ActionButton variant="activate" onClick={() => handleActivate(user)}>
                    <FiRefreshCw />
                  </ActionButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>
              {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
            </ModalTitle>
            <CloseButton onClick={closeModal}>
              <FiX />
            </CloseButton>
          </ModalHeader>

          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Nome *</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">
                Senha {editingUser ? '(deixe em branco para manter a atual)' : '*'}
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required={!editingUser}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="role">Role *</Label>
              <Select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              >
                <option value="editor">Editor</option>
                <option value="admin">Administrador</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <Checkbox
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                />
                Usuário ativo
              </label>
            </FormGroup>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
              <Button type="button" variant="secondary" onClick={closeModal}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? (
                  <>
                    <LoadingSpinner />
                    Salvando...
                  </>
                ) : (
                  <>
                    <FiSave />
                    {editingUser ? 'Atualizar' : 'Criar'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default UserManager;

