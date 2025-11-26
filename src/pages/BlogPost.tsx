import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FiCalendar, FiTag, FiShare2, FiArrowLeft, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  color: white;
  padding: 120px 0 80px;
  text-align: center;
`;

const PostSection = styled.section`
  padding: 80px 0;
`;

const PostContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PostImage = styled.div`
  height: 400px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  border-radius: var(--border-radius-large);
  margin-bottom: 2rem;
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

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-light);
  font-size: 0.9rem;
  
  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const PostCategory = styled.span`
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const PostContent = styled.div`
  line-height: 1.8;
  color: var(--text-secondary);
  font-size: 1.1rem;
  
  h2 {
    color: var(--text-primary);
    margin: 2rem 0 1rem;
    font-size: 1.8rem;
  }
  
  h3 {
    color: var(--text-primary);
    margin: 1.5rem 0 1rem;
    font-size: 1.4rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  blockquote {
    border-left: 4px solid var(--primary-color);
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: var(--text-primary);
    font-size: 1.2rem;
  }
`;

const ShareSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 3rem 0;
  padding: 2rem;
  background: var(--background-gray);
  border-radius: var(--border-radius-large);
  
  h4 {
    margin: 0;
    color: var(--text-primary);
  }
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);
  
  &.facebook {
    background: #1877f2;
    color: white;
    
    &:hover {
      background: #166fe5;
      transform: translateY(-2px);
    }
  }
  
  &.twitter {
    background: #1da1f2;
    color: white;
    
    &:hover {
      background: #1a91da;
      transform: translateY(-2px);
    }
  }
  
  &.linkedin {
    background: #0077b5;
    color: white;
    
    &:hover {
      background: #006097;
      transform: translateY(-2px);
    }
  }
  
  &.whatsapp {
    background: #25d366;
    color: white;
    
    &:hover {
      background: #128c7e;
      transform: translateY(-2px);
    }
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 2rem;
  
  &:hover {
    color: var(--primary-light);
  }
`;

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Simulação de dados do post baseado no slug
  const getPostData = (slug: string) => {
    const posts = {
      'chatbots-revolucionando-atendimento': {
        title: 'Como os Chatbots Estão Revolucionando o Atendimento ao Cliente',
        category: 'Chatbots',
        date: '15 Jan 2024',
        readTime: '5 min',
        content: `
          <p>A inteligência artificial está transformando radicalmente a forma como as empresas se comunicam com seus clientes. Os chatbots, em particular, emergiram como uma das tecnologias mais disruptivas do século XXI, oferecendo uma nova abordagem para o atendimento ao cliente.</p>
          
          <h2>O que são Chatbots?</h2>
          <p>Chatbots são programas de computador que simulam conversas humanas através de inteligência artificial. Eles podem responder perguntas, resolver problemas e até mesmo realizar transações, tudo isso de forma automatizada e 24 horas por dia.</p>
          
          <h3>Principais Benefícios dos Chatbots</h3>
          <ul>
            <li><strong>Atendimento 24/7:</strong> Os chatbots nunca dormem, oferecendo suporte constante aos clientes</li>
            <li><strong>Resposta Instantânea:</strong> Eliminam o tempo de espera, proporcionando respostas imediatas</li>
            <li><strong>Escalabilidade:</strong> Podem atender milhares de clientes simultaneamente</li>
            <li><strong>Redução de Custos:</strong> Diminuem significativamente os custos operacionais</li>
            <li><strong>Personalização:</strong> Oferecem experiências personalizadas baseadas no histórico do usuário</li>
          </ul>
          
          <blockquote>
            "Os chatbots não são apenas uma tendência, são uma necessidade para empresas que querem sobreviver na era digital."
          </blockquote>
          
          <h2>Implementação Estratégica</h2>
          <p>Para implementar chatbots com sucesso, é essencial seguir uma estratégia bem definida:</p>
          
          <ol>
            <li><strong>Defina os Objetivos:</strong> Estabeleça claramente o que você quer alcançar com o chatbot</li>
            <li><strong>Escolha a Plataforma:</strong> Selecione a tecnologia mais adequada para suas necessidades</li>
            <li><strong>Desenvolva o Conteúdo:</strong> Crie respostas e fluxos de conversa relevantes</li>
            <li><strong>Teste Exaustivamente:</strong> Realize testes com usuários reais antes do lançamento</li>
            <li><strong>Monitore e Otimize:</strong> Acompanhe o desempenho e faça melhorias contínuas</li>
          </ol>
          
          <h3>Casos de Sucesso</h3>
          <p>Empresas como a <strong>Mundo dos Bots</strong> têm ajudado centenas de empresas a implementar chatbots com resultados impressionantes:</p>
          
          <ul>
            <li>E-commerce que aumentou vendas em 40%</li>
            <li>Clínicas que reduziram faltas em 60%</li>
            <li>Imobiliárias que qualificaram 3x mais leads</li>
          </ul>
          
          <h2>O Futuro dos Chatbots</h2>
          <p>Com o avanço da inteligência artificial, os chatbots estão se tornando cada vez mais inteligentes e capazes. Tendências emergentes incluem:</p>
          
          <ul>
            <li>Processamento de linguagem natural mais avançado</li>
            <li>Integração com sistemas de voz</li>
            <li>Análise de sentimentos em tempo real</li>
            <li>Automação de processos complexos</li>
          </ul>
          
          <p>A <strong>Mundo dos Bots</strong> está na vanguarda dessas inovações, desenvolvendo soluções que não apenas atendem às necessidades atuais, mas também preparam as empresas para o futuro.</p>
          
          <h3>Conclusão</h3>
          <p>Os chatbots representam uma revolução no atendimento ao cliente. Empresas que adotam essa tecnologia agora estão posicionadas para liderar seus mercados, oferecendo experiências superiores e construindo relacionamentos mais fortes com seus clientes.</p>
          
          <p>Se você ainda não implementou chatbots em sua empresa, agora é o momento de começar. A <strong>Mundo dos Bots</strong> está pronta para ajudá-lo nessa jornada de transformação digital.</p>
        `
      },
      'estrategias-automacao-vendas': {
        title: '5 Estratégias de Automação para Aumentar suas Vendas',
        category: 'Marketing',
        date: '12 Jan 2024',
        readTime: '7 min',
        content: `
          <p>A automação de marketing se tornou uma ferramenta essencial para empresas que buscam aumentar suas vendas de forma eficiente e escalável. Neste artigo, vamos explorar 5 estratégias comprovadas que podem transformar seus resultados.</p>
          
          <h2>1. Automação de Email Marketing</h2>
          <p>O email marketing continua sendo uma das ferramentas mais eficazes para conversão. Com automação, você pode:</p>
          <ul>
            <li>Enviar emails personalizados baseados no comportamento do usuário</li>
            <li>Criar sequências de nutrição de leads</li>
            <li>Automatizar follow-ups de vendas</li>
            <li>Segmentar sua base de contatos automaticamente</li>
          </ul>
          
          <h2>2. Chatbots para Qualificação de Leads</h2>
          <p>Chatbots inteligentes podem qualificar leads 24/7, fazendo perguntas estratégicas e pontuando prospects automaticamente. Isso permite que sua equipe de vendas foque apenas nos leads mais qualificados.</p>
          
          <h2>3. Automação de Redes Sociais</h2>
          <p>Mantenha uma presença consistente nas redes sociais com:</p>
          <ul>
            <li>Agendamento automático de posts</li>
            <li>Respostas automáticas a comentários</li>
            <li>Monitoramento de menções da marca</li>
            <li>Análise de performance em tempo real</li>
          </ul>
          
          <h2>4. Automação de Agendamentos</h2>
          <p>Elimine a burocracia de agendamentos com sistemas automatizados que:</p>
          <ul>
            <li>Permitem que clientes agendem reuniões 24/7</li>
            <li>Enviam lembretes automáticos</li>
            <li>Sincronizam com calendários</li>
            <li>Reduzem faltas significativamente</li>
          </ul>
          
          <h2>5. Automação de CRM</h2>
          <p>Integre todas as suas ferramentas de vendas para:</p>
          <ul>
            <li>Atualizar dados de clientes automaticamente</li>
            <li>Criar tarefas baseadas em gatilhos</li>
            <li>Gerar relatórios automáticos</li>
            <li>Otimizar o funil de vendas</li>
          </ul>
          
          <h3>Implementação Estratégica</h3>
          <p>Para implementar essas estratégias com sucesso, siga estes passos:</p>
          <ol>
            <li>Defina seus objetivos de vendas</li>
            <li>Mapeie o journey do cliente</li>
            <li>Escolha as ferramentas adequadas</li>
            <li>Teste e otimize continuamente</li>
          </ol>
          
          <p>A <strong>Mundo dos Bots</strong> oferece soluções completas em automação que podem ajudar sua empresa a implementar essas estratégias com sucesso.</p>
        `
      }
    };
    
    return posts[slug as keyof typeof posts] || {
      title: 'Artigo não encontrado',
      category: 'Geral',
      date: 'Data não disponível',
      readTime: '0 min',
      content: '<p>Este artigo não foi encontrado.</p>'
    };
  };

  const post = getPostData(slug || '');

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  return (
    <>
      <Helmet>
        <title>{post.title} - Blog Mundo dos Bots</title>
        <meta name="description" content={post.content.replace(/<[^>]*>/g, '').substring(0, 160)} />
      </Helmet>

      <HeroSection>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BackButton to="/blog">
              <FiArrowLeft />
              Voltar ao Blog
            </BackButton>
            <h1>{post.title}</h1>
          </motion.div>
        </div>
      </HeroSection>

      <PostSection>
        <div className="container">
          <PostContainer>
            <PostImage />
            
            <PostMeta>
              <span>
                <FiCalendar />
                {post.date}
              </span>
              <span>
                <FiTag />
                {post.readTime} de leitura
              </span>
              <PostCategory>{post.category}</PostCategory>
            </PostMeta>

            <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />

            <ShareSection>
              <h4>Compartilhe este artigo:</h4>
              <ShareButton 
                className="facebook" 
                onClick={() => handleShare('facebook')}
                title="Compartilhar no Facebook"
              >
                <FiFacebook />
              </ShareButton>
              <ShareButton 
                className="twitter" 
                onClick={() => handleShare('twitter')}
                title="Compartilhar no Twitter"
              >
                <FiTwitter />
              </ShareButton>
              <ShareButton 
                className="linkedin" 
                onClick={() => handleShare('linkedin')}
                title="Compartilhar no LinkedIn"
              >
                <FiLinkedin />
              </ShareButton>
              <ShareButton 
                className="whatsapp" 
                onClick={() => handleShare('whatsapp')}
                title="Compartilhar no WhatsApp"
              >
                <FiShare2 />
              </ShareButton>
            </ShareSection>
          </PostContainer>
        </div>
      </PostSection>
    </>
  );
};

export default BlogPost;
