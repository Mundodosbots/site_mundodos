import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import AdminHomeContent from './AdminHomeContent';
import AdminBlogManager from './AdminBlogManager';
import AdminSiteSettings from './AdminSiteSettings';
import AdminSolutionsManager from '../components/AdminSolutionsManager';
import CategoryManager from '../components/CategoryManager';
import ApiSettingsSummary from '../components/ApiSettingsSummary';
import UserManager from '../components/UserManager';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  FiUsers, 
  FiFileText, 
  FiSettings, 
  FiLogOut, 
  FiPlus, 
  FiEdit, 
  FiTrash2,
  FiEye,
  FiActivity,
  FiMessageCircle,
  FiHome,
  FiTag,
  FiTarget,
  FiBriefcase,
  FiPackage
} from 'react-icons/fi';

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: var(--background-gray);
`;

const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  background: var(--primary-color);
  color: white;
  padding: 2rem 0;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  padding: 0 2rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`;

const SidebarTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const SidebarSubtitle = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const SidebarMenu = styled.nav`
  padding: 0 1rem;
`;

const MenuItem = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: none;
  border: none;
  color: white;
  text-align: left;
  border-radius: var(--border-radius);
  transition: var(--transition);
  margin-bottom: 0.5rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &.active {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const MainContent = styled.main`
  margin-left: 250px;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
`;

const HeaderTitle = styled.h1`
  color: var(--primary-color);
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: var(--accent-dark);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const StatCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  text-align: center;
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin: 0 auto 1rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-size: 1rem;
`;

const ContentSection = styled.section`
  background: white;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  overflow: hidden;
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
  
  &:hover {
    background: var(--primary-dark);
  }
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

const ActionButton = styled.button`
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

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: 'Vendas', slug: 'vendas', description: 'Artigos sobre vendas e conversão' },
    { id: 2, name: 'Marketing', slug: 'marketing', description: 'Estratégias de marketing digital' },
    { id: 3, name: 'Tecnologia', slug: 'tecnologia', description: 'Inovações tecnológicas' },
    { id: 4, name: 'Dicas', slug: 'dicas', description: 'Dicas e tutoriais' },
    { id: 5, name: 'Cases', slug: 'cases', description: 'Casos de sucesso' }
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const stats = [
    { icon: <FiUsers />, number: '1,234', label: t('admin.dashboard.activeUsers') },
    { icon: <FiFileText />, number: '56', label: t('admin.dashboard.blogPosts') },
    { icon: <FiMessageCircle />, number: '89', label: t('admin.dashboard.activeChatbots') },
    { icon: <FiActivity />, number: '12.5K', label: t('admin.dashboard.monthlyVisits') },
  ];

  const blogPosts = [
    { id: 1, title: 'Como chatbots podem aumentar suas vendas', status: 'Publicado', date: '2024-01-15' },
    { id: 2, title: 'Automação de marketing: guia completo', status: 'Rascunho', date: '2024-01-14' },
    { id: 3, title: 'Tendências de IA para 2024', status: 'Publicado', date: '2024-01-13' },
  ];

  const renderDashboard = () => (
    <>
      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatIcon>{stat.icon}</StatIcon>
            <StatNumber>{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsGrid>

      <ApiSettingsSummary />

      <ContentSection>
        <SectionHeader>
          <SectionTitle>{t('admin.dashboard.recentBlogPosts')}</SectionTitle>
          <AddButton>
            <FiPlus />
            {t('admin.blog.addPost')}
          </AddButton>
        </SectionHeader>
        <Table>
          <thead>
            <tr>
              <Th>{t('admin.blog.titleField')}</Th>
              <Th>{t('admin.blog.statusField')}</Th>
              <Th>{t('admin.dashboard.date')}</Th>
              <Th>{t('admin.dashboard.actions')}</Th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.map((post) => (
              <tr key={post.id}>
                <Td>{post.title}</Td>
                <Td>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: 'var(--border-radius)',
                    fontSize: '0.8rem',
                    background: post.status === 'Publicado' ? '#d4edda' : '#fff3cd',
                    color: post.status === 'Publicado' ? '#155724' : '#856404'
                  }}>
                    {post.status}
                  </span>
                </Td>
                <Td>{post.date}</Td>
                <Td>
                  <ActionButton title="Visualizar">
                    <FiEye />
                  </ActionButton>
                  <ActionButton title="Editar">
                    <FiEdit />
                  </ActionButton>
                  <ActionButton title="Excluir" className="delete">
                    <FiTrash2 />
                  </ActionButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ContentSection>
    </>
  );

  const renderHome = () => <AdminHomeContent />;
  
  const renderBlog = () => <AdminBlogManager categories={categories} onCategoriesChange={setCategories} />;
  
  const renderCategories = () => <CategoryManager categories={categories} onCategoriesChange={setCategories} />;

  const renderUsers = () => <UserManager />;

  const renderSettings = () => <AdminSiteSettings />;

  return (
    <DashboardContainer>
      <Sidebar>
        <SidebarHeader>
          <SidebarTitle>Mundo dos Bots</SidebarTitle>
          <SidebarSubtitle>Painel Administrativo</SidebarSubtitle>
        </SidebarHeader>
        
        <SidebarMenu>
          <MenuItem
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiActivity />
            Dashboard
          </MenuItem>
          
          <MenuItem
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => setActiveTab('home')}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiHome />
            {t('admin.dashboard.home')}
          </MenuItem>
          
          <MenuItem
            className={activeTab === 'blog' ? 'active' : ''}
            onClick={() => setActiveTab('blog')}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiFileText />
            {t('admin.dashboard.blog')}
          </MenuItem>
          
          <MenuItem
            className={activeTab === 'categories' ? 'active' : ''}
            onClick={() => setActiveTab('categories')}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiTag />
            {t('admin.dashboard.categories')}
          </MenuItem>
          
          <MenuItem
            className={activeTab === 'solutions-objective' ? 'active' : ''}
            onClick={() => setActiveTab('solutions-objective')}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiTarget />
            {t('admin.dashboard.solutionsObjective')}
          </MenuItem>
          
          <MenuItem
            className={activeTab === 'solutions-sector' ? 'active' : ''}
            onClick={() => setActiveTab('solutions-sector')}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiBriefcase />
            {t('admin.dashboard.solutionsSector')}
          </MenuItem>
          
          <MenuItem
            className={activeTab === 'solutions-product' ? 'active' : ''}
            onClick={() => setActiveTab('solutions-product')}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPackage />
            {t('admin.dashboard.solutionsProduct')}
          </MenuItem>
          
          <MenuItem
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiUsers />
            {t('admin.dashboard.users')}
          </MenuItem>
          
          <MenuItem
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiSettings />
            {t('admin.dashboard.siteSettings')}
          </MenuItem>
          
          <MenuItem
            onClick={() => navigate('/admin/settings')}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            style={{ marginTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}
          >
            <FiSettings />
            Configurações de APIs
          </MenuItem>
        </SidebarMenu>
      </Sidebar>

      <MainContent>
        <Header>
          <HeaderTitle>
            {activeTab === 'dashboard' && t('admin.dashboard.title')}
            {activeTab === 'home' && t('admin.dashboard.manageHome')}
            {activeTab === 'blog' && t('admin.blog.title')}
            {activeTab === 'categories' && t('admin.dashboard.manageCategories')}
            {activeTab === 'solutions-objective' && t('admin.dashboard.solutionsObjective')}
            {activeTab === 'solutions-sector' && t('admin.dashboard.solutionsSector')}
            {activeTab === 'solutions-product' && t('admin.dashboard.solutionsProduct')}
            {activeTab === 'users' && t('admin.dashboard.manageUsers')}
            {activeTab === 'settings' && t('admin.dashboard.siteSettings')}
          </HeaderTitle>
          
          <LogoutButton onClick={handleLogout}>
            <FiLogOut />
            {t('admin.dashboard.logout')}
          </LogoutButton>
        </Header>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'home' && renderHome()}
        {activeTab === 'blog' && renderBlog()}
        {activeTab === 'categories' && renderCategories()}
        {activeTab === 'solutions-objective' && <AdminSolutionsManager type="objective" />}
        {activeTab === 'solutions-sector' && <AdminSolutionsManager type="sector" />}
        {activeTab === 'solutions-product' && <AdminSolutionsManager type="product" />}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'settings' && renderSettings()}
      </MainContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;
