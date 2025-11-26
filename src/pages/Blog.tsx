import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;
`;

const BlogSection = styled.section`
  padding: 80px 0;
`;

const SearchSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-large);
  box-shadow: var(--shadow-light);
  margin-bottom: 3rem;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SearchButton = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: var(--primary-light);
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  
  button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    background: white;
    border-radius: 20px;
    cursor: pointer;
    transition: var(--transition);
    
    &:hover, &.active {
      background: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
  }
`;

const BlogCard = styled(motion.div)`
  background: white;
  border-radius: var(--border-radius-large);
  overflow: hidden;
  box-shadow: var(--shadow-light);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-medium);
  }
`;

const BlogImage = styled.div`
  height: 200px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--text-light);
  
  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;

const BlogCategory = styled.span`
  background: var(--primary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Blog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'tecnologia', name: 'Tecnologia' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'empreendedorismo', name: 'Empreendedorismo' },
    { id: 'chatbots', name: 'Chatbots' },
    { id: 'automacao', name: 'Automação' }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Como os Chatbots Estão Revolucionando o Atendimento ao Cliente',
      excerpt: 'Descubra como a inteligência artificial está transformando a forma como as empresas atendem seus clientes, proporcionando uma experiência mais eficiente e personalizada.',
      category: 'chatbots',
      categoryName: 'Chatbots',
      date: '15 Jan 2024',
      readTime: '5 min',
      slug: 'chatbots-revolucionando-atendimento'
    },
    {
      id: 2,
      title: '5 Estratégias de Automação para Aumentar suas Vendas',
      excerpt: 'Aprenda as melhores práticas para implementar automação de marketing e aumentar suas conversões de forma significativa.',
      category: 'marketing',
      categoryName: 'Marketing',
      date: '12 Jan 2024',
      readTime: '7 min',
      slug: 'estrategias-automacao-vendas'
    },
    {
      id: 3,
      title: 'Franquia Digital: O Futuro dos Negócios',
      excerpt: 'Conheça as vantagens de investir em uma franquia digital e como começar seu próprio negócio com baixo investimento.',
      category: 'empreendedorismo',
      categoryName: 'Empreendedorismo',
      date: '10 Jan 2024',
      readTime: '6 min',
      slug: 'franquia-digital-futuro-negocios'
    },
    {
      id: 4,
      title: 'Inteligência Artificial: Tendências para 2024',
      excerpt: 'Explore as principais tendências em IA que vão dominar o mercado em 2024 e como sua empresa pode se beneficiar.',
      category: 'tecnologia',
      categoryName: 'Tecnologia',
      date: '8 Jan 2024',
      readTime: '8 min',
      slug: 'ia-tendencias-2024'
    },
    {
      id: 5,
      title: 'Automação de Marketing: Do Básico ao Avançado',
      excerpt: 'Um guia completo sobre como implementar automação de marketing em sua empresa, desde conceitos básicos até estratégias avançadas.',
      category: 'automacao',
      categoryName: 'Automação',
      date: '5 Jan 2024',
      readTime: '10 min',
      slug: 'automacao-marketing-basico-avancado'
    },
    {
      id: 6,
      title: 'Chatbots para WhatsApp: Guia Completo de Implementação',
      excerpt: 'Aprenda tudo sobre como implementar chatbots no WhatsApp Business e transformar seu atendimento.',
      category: 'chatbots',
      categoryName: 'Chatbots',
      date: '3 Jan 2024',
      readTime: '12 min',
      slug: 'chatbots-whatsapp-guia-implementacao'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // A busca já é feita automaticamente pelo filtro
  };

  return (
    <>
      <Helmet>
        <title>Blog - Mundo dos Bots | Artigos sobre Chatbots e Automação</title>
        <meta name="description" content="Fique por dentro das novidades em chatbots, automação e inteligência artificial. Artigos exclusivos sobre tecnologia e marketing digital." />
      </Helmet>

      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Blog Mundo dos Bots</h1>
            <p style={{ fontSize: '1.2rem', marginTop: '1rem', opacity: 0.9 }}>
              Fique por dentro das novidades em chatbots, automação e inteligência artificial
            </p>
          </motion.div>
        </div>
      </HeroSection>

      <BlogSection>
        <div className="container">
          <SearchSection>
            <SearchForm onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchButton type="submit">
                <FiSearch />
              </SearchButton>
            </SearchForm>
            
            <CategoryFilter>
              {categories.map(category => (
                <button
                  key={category.id}
                  className={selectedCategory === category.id ? 'active' : ''}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </CategoryFilter>
          </SearchSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <BlogImage />
                <BlogContent>
                  <BlogMeta>
                    <span>
                      <FiCalendar />
                      {post.date}
                    </span>
                    <span>
                      <FiTag />
                      {post.readTime} de leitura
                    </span>
                  </BlogMeta>
                  
                  <BlogCategory>{post.categoryName}</BlogCategory>
                  
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>
                    <Link to={`/blog/${post.slug}`} style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    to={`/blog/${post.slug}`}
                    style={{ 
                      color: 'var(--primary-color)', 
                      fontWeight: '500',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    Ler mais
                    <FiArrowRight />
                  </Link>
                </BlogContent>
              </BlogCard>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                Nenhum artigo encontrado
              </h3>
              <p style={{ color: 'var(--text-light)' }}>
                Tente ajustar sua busca ou selecionar uma categoria diferente.
              </p>
            </div>
          )}
        </div>
      </BlogSection>
    </>
  );
};

export default Blog;
