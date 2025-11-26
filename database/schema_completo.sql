-- =====================================================
-- BANCO DE DADOS COMPLETO - MUNDO DOS BOTS
-- Sistema de Gestão de Chatbots e Automação
-- =====================================================
-- 
-- INSTRUÇÕES DE INSTALAÇÃO:
-- 1. Acesse o MySQL: mysql -u root -p
-- 2. Execute: source /caminho/para/schema_completo.sql
-- 3. Ou: mysql -u root -p < schema_completo.sql
-- 
-- CREDENCIAIS PADRÃO:
-- Email: admin@mundodosbots.com.br
-- Senha: admin123
-- =====================================================

-- =====================================================
-- CRIAÇÃO DO BANCO DE DADOS
-- =====================================================
CREATE DATABASE IF NOT EXISTS mundodos_mundo_dos_bots 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
-- Usuario: mundodos_mundo_dos_bots
-- Senha DQEdDp@RPNEd  
USE mundodos_mundo_dos_bots;

-- =====================================================
-- TABELA DE USUÁRIOS ADMINISTRATIVOS
-- Gerencia os usuários com acesso ao painel admin
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT 'Nome completo do usuário',
    email VARCHAR(100) UNIQUE NOT NULL COMMENT 'Email único para login',
    password VARCHAR(255) NOT NULL COMMENT 'Senha criptografada com bcrypt',
    role ENUM('admin', 'editor') DEFAULT 'editor' COMMENT 'Nível de permissão do usuário',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Indica se o usuário está ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Usuários do sistema administrativo';

-- =====================================================
-- TABELA DE TOKENS DE RESET DE SENHA
-- Gerencia os tokens para recuperação de senha
-- =====================================================
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL COMMENT 'ID do usuário que solicitou o reset',
    token VARCHAR(255) UNIQUE NOT NULL COMMENT 'Token único para validação',
    expires_at TIMESTAMP NOT NULL COMMENT 'Data de expiração do token',
    used BOOLEAN DEFAULT FALSE COMMENT 'Indica se o token já foi utilizado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_expires (expires_at),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Tokens para recuperação de senha';

-- =====================================================
-- TABELA DE CATEGORIAS DO BLOG
-- Organiza os posts do blog em categorias
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT 'Nome da categoria',
    slug VARCHAR(100) UNIQUE NOT NULL COMMENT 'Slug para URL amigável',
    description TEXT COMMENT 'Descrição detalhada da categoria',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Indica se a categoria está ativa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Categorias para organização dos posts do blog';

-- =====================================================
-- TABELA DE POSTS DO BLOG
-- Gerencia todos os artigos e posts do blog
-- =====================================================
CREATE TABLE IF NOT EXISTS blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL COMMENT 'Título do post',
    slug VARCHAR(255) UNIQUE NOT NULL COMMENT 'Slug para URL amigável',
    content LONGTEXT NOT NULL COMMENT 'Conteúdo completo em HTML/Markdown',
    excerpt TEXT COMMENT 'Resumo curto do post',
    featured_image VARCHAR(500) COMMENT 'URL da imagem destacada',
    category_id INT COMMENT 'ID da categoria',
    author_id INT COMMENT 'ID do autor',
    status ENUM('draft', 'scheduled', 'published') DEFAULT 'draft' COMMENT 'Status de publicação',
    published_at TIMESTAMP NULL COMMENT 'Data de publicação',
    scheduled_at TIMESTAMP NULL COMMENT 'Data agendada para publicação',
    seo_title VARCHAR(255) COMMENT 'Título otimizado para SEO',
    seo_description TEXT COMMENT 'Descrição meta para SEO',
    seo_keywords TEXT COMMENT 'Palavras-chave para SEO',
    view_count INT DEFAULT 0 COMMENT 'Contador de visualizações',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Indica se o post está ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_category (category_id),
    INDEX idx_author (author_id),
    INDEX idx_published (published_at),
    INDEX idx_slug (slug),
    INDEX idx_scheduled (scheduled_at),
    FULLTEXT idx_search (title, content, excerpt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Posts e artigos do blog';

-- =====================================================
-- TABELA DE CONFIGURAÇÕES DO SITE
-- Armazena configurações gerais do site
-- =====================================================
CREATE TABLE IF NOT EXISTS site_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL COMMENT 'Chave única da configuração',
    setting_value TEXT COMMENT 'Valor da configuração',
    setting_type ENUM('text', 'textarea', 'image', 'boolean', 'json') DEFAULT 'text' COMMENT 'Tipo do valor',
    description TEXT COMMENT 'Descrição do que a configuração faz',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Configurações gerais do site';

-- =====================================================
-- TABELA DE CONTEÚDO DA PÁGINA INICIAL
-- Gerencia seções e conteúdos da home
-- =====================================================
CREATE TABLE IF NOT EXISTS home_content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_name VARCHAR(100) NOT NULL COMMENT 'Nome identificador da seção',
    title VARCHAR(255) COMMENT 'Título da seção',
    subtitle TEXT COMMENT 'Subtítulo da seção',
    content TEXT COMMENT 'Conteúdo em HTML/texto',
    image_url VARCHAR(500) COMMENT 'URL da imagem',
    button_text VARCHAR(100) COMMENT 'Texto do botão CTA',
    button_link VARCHAR(500) COMMENT 'Link do botão',
    order_position INT DEFAULT 0 COMMENT 'Ordem de exibição',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Indica se está ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_section (section_name),
    INDEX idx_order (order_position),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Conteúdo dinâmico da página inicial';

-- =====================================================
-- TABELA DE SERVIÇOS
-- Catálogo de serviços oferecidos
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL COMMENT 'Nome do serviço',
    slug VARCHAR(255) UNIQUE NOT NULL COMMENT 'Slug para URL',
    description TEXT COMMENT 'Descrição curta',
    content LONGTEXT COMMENT 'Descrição completa',
    icon VARCHAR(100) COMMENT 'Nome do ícone',
    image_url VARCHAR(500) COMMENT 'URL da imagem',
    price DECIMAL(10,2) COMMENT 'Preço do serviço',
    is_featured BOOLEAN DEFAULT FALSE COMMENT 'Serviço em destaque',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Serviço ativo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_featured (is_featured),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Serviços oferecidos pela empresa';

-- =====================================================
-- TABELA DE SOLUÇÕES POR OBJETIVO
-- Soluções agrupadas por objetivos de negócio
-- =====================================================
CREATE TABLE IF NOT EXISTS solutions_by_objective (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL COMMENT 'Nome da solução',
    slug VARCHAR(255) UNIQUE NOT NULL COMMENT 'Slug para URL',
    title VARCHAR(255) NOT NULL COMMENT 'Título principal',
    subtitle TEXT COMMENT 'Subtítulo',
    description TEXT COMMENT 'Descrição resumida',
    content LONGTEXT COMMENT 'Conteúdo completo',
    benefits JSON COMMENT 'Lista de benefícios em JSON',
    features JSON COMMENT 'Lista de funcionalidades em JSON',
    image_url VARCHAR(500) COMMENT 'Imagem de card',
    hero_image VARCHAR(500) COMMENT 'Imagem de hero/banner',
    cta_text VARCHAR(100) DEFAULT 'Fale com um Especialista' COMMENT 'Texto do CTA',
    cta_whatsapp_message TEXT COMMENT 'Mensagem pré-preenchida WhatsApp',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Solução ativa',
    order_position INT DEFAULT 0 COMMENT 'Ordem de exibição',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_order (order_position),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Soluções organizadas por objetivo de negócio';

-- =====================================================
-- TABELA DE SOLUÇÕES POR SETOR
-- Soluções segmentadas por setor de mercado
-- =====================================================
CREATE TABLE IF NOT EXISTS solutions_by_sector (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL COMMENT 'Nome do setor',
    slug VARCHAR(255) UNIQUE NOT NULL COMMENT 'Slug para URL',
    title VARCHAR(255) NOT NULL COMMENT 'Título principal',
    subtitle TEXT COMMENT 'Subtítulo',
    description TEXT COMMENT 'Descrição resumida',
    content LONGTEXT COMMENT 'Conteúdo completo',
    challenges JSON COMMENT 'Desafios do setor em JSON',
    solutions JSON COMMENT 'Soluções oferecidas em JSON',
    case_studies JSON COMMENT 'Casos de sucesso em JSON',
    image_url VARCHAR(500) COMMENT 'Imagem de card',
    hero_image VARCHAR(500) COMMENT 'Imagem de hero/banner',
    cta_text VARCHAR(100) DEFAULT 'Fale com um Especialista' COMMENT 'Texto do CTA',
    cta_whatsapp_message TEXT COMMENT 'Mensagem pré-preenchida WhatsApp',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Solução ativa',
    order_position INT DEFAULT 0 COMMENT 'Ordem de exibição',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_order (order_position),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Soluções segmentadas por setor de mercado';

-- =====================================================
-- TABELA DE SOLUÇÕES POR PRODUTO
-- Catálogo de produtos específicos
-- =====================================================
CREATE TABLE IF NOT EXISTS solutions_by_product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL COMMENT 'Nome do produto',
    slug VARCHAR(255) UNIQUE NOT NULL COMMENT 'Slug para URL',
    title VARCHAR(255) NOT NULL COMMENT 'Título principal',
    subtitle TEXT COMMENT 'Subtítulo',
    description TEXT COMMENT 'Descrição resumida',
    content LONGTEXT COMMENT 'Conteúdo completo',
    features JSON COMMENT 'Funcionalidades em JSON',
    pricing JSON COMMENT 'Planos e preços em JSON',
    integrations JSON COMMENT 'Integrações disponíveis em JSON',
    image_url VARCHAR(500) COMMENT 'Imagem de card',
    hero_image VARCHAR(500) COMMENT 'Imagem de hero/banner',
    demo_video_url VARCHAR(500) COMMENT 'URL do vídeo de demonstração',
    cta_text VARCHAR(100) DEFAULT 'Fale com um Especialista' COMMENT 'Texto do CTA',
    cta_whatsapp_message TEXT COMMENT 'Mensagem pré-preenchida WhatsApp',
    is_active BOOLEAN DEFAULT TRUE COMMENT 'Produto ativo',
    order_position INT DEFAULT 0 COMMENT 'Ordem de exibição',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug),
    INDEX idx_order (order_position),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Produtos específicos oferecidos';

-- =====================================================
-- TABELA DE CONTATOS
-- Gerencia mensagens de contato do site
-- =====================================================
CREATE TABLE IF NOT EXISTS contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT 'Nome do contato',
    email VARCHAR(100) NOT NULL COMMENT 'Email do contato',
    phone VARCHAR(20) COMMENT 'Telefone de contato',
    subject VARCHAR(255) COMMENT 'Assunto da mensagem',
    message TEXT NOT NULL COMMENT 'Mensagem completa',
    status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new' COMMENT 'Status do atendimento',
    ip_address VARCHAR(45) COMMENT 'IP do remetente',
    user_agent TEXT COMMENT 'User agent do navegador',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_created (created_at),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Mensagens de contato recebidas';

-- =====================================================
-- TABELA DE CANDIDATOS (TRABALHE CONOSCO)
-- Gerencia candidaturas de emprego
-- =====================================================
CREATE TABLE IF NOT EXISTS job_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT 'Nome do candidato',
    email VARCHAR(100) NOT NULL COMMENT 'Email do candidato',
    phone VARCHAR(20) COMMENT 'Telefone de contato',
    position VARCHAR(100) NOT NULL COMMENT 'Cargo desejado',
    resume_url VARCHAR(500) COMMENT 'URL do currículo',
    cover_letter TEXT COMMENT 'Carta de apresentação',
    experience_years INT COMMENT 'Anos de experiência',
    status ENUM('new', 'reviewed', 'interviewed', 'hired', 'rejected') DEFAULT 'new' COMMENT 'Status da candidatura',
    notes TEXT COMMENT 'Observações internas',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_position (position),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Candidaturas de emprego';

-- =====================================================
-- TABELA DE INTERESSADOS EM FRANQUIA
-- Gerencia leads interessados em franquia
-- =====================================================
CREATE TABLE IF NOT EXISTS franchise_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT 'Nome do interessado',
    email VARCHAR(100) NOT NULL COMMENT 'Email do interessado',
    phone VARCHAR(20) COMMENT 'Telefone de contato',
    city VARCHAR(100) COMMENT 'Cidade',
    state VARCHAR(50) COMMENT 'Estado',
    investment_range VARCHAR(50) COMMENT 'Faixa de investimento disponível',
    experience_level VARCHAR(50) COMMENT 'Nível de experiência',
    message TEXT COMMENT 'Mensagem adicional',
    status ENUM('new', 'contacted', 'qualified', 'approved', 'rejected') DEFAULT 'new' COMMENT 'Status do lead',
    notes TEXT COMMENT 'Observações internas',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_state (state),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Leads interessados em franquia';

-- =====================================================
-- TABELA DE ARQUIVOS UPLOADADOS
-- Gerencia todos os arquivos enviados
-- =====================================================
CREATE TABLE IF NOT EXISTS uploaded_files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    original_name VARCHAR(255) NOT NULL COMMENT 'Nome original do arquivo',
    file_name VARCHAR(255) NOT NULL COMMENT 'Nome salvo no servidor',
    file_path VARCHAR(500) NOT NULL COMMENT 'Caminho completo do arquivo',
    file_size INT NOT NULL COMMENT 'Tamanho em bytes',
    mime_type VARCHAR(100) NOT NULL COMMENT 'Tipo MIME do arquivo',
    uploaded_by INT COMMENT 'ID do usuário que fez upload',
    is_public BOOLEAN DEFAULT TRUE COMMENT 'Arquivo público ou privado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_uploaded_by (uploaded_by),
    INDEX idx_mime_type (mime_type),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci 
COMMENT='Arquivos enviados pelos usuários';

-- =====================================================
-- INSERIR DADOS INICIAIS
-- =====================================================

-- Usuário administrador padrão
-- Email: admin@mundodosbots.com.br
-- Senha: admin123
INSERT INTO users (name, email, password, role) VALUES 
('Administrador', 'admin@mundodosbots.com.br', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Categorias padrão do blog
INSERT INTO categories (name, slug, description) VALUES 
('Vendas', 'vendas', 'Artigos sobre estratégias de vendas e conversão'),
('Marketing', 'marketing', 'Estratégias de marketing digital e automação'),
('Tecnologia', 'tecnologia', 'Inovações tecnológicas e tendências em IA'),
('Dicas', 'dicas', 'Dicas práticas e tutoriais'),
('Cases de Sucesso', 'cases', 'Histórias de sucesso dos nossos clientes');

-- Configurações padrão do site
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES 
('site_name', 'Mundo dos Bots', 'text', 'Nome do site'),
('site_description', 'Especialistas em Chatbots e Automação com Inteligência Artificial', 'text', 'Descrição do site'),
('site_tagline', 'Transforme seu negócio com IA', 'text', 'Slogan do site'),
('company_name', 'IA Soluções de Tecnologia em Atendimento LTDA', 'text', 'Razão social da empresa'),
('company_cnpj', '43.327.090/0001-32', 'text', 'CNPJ da empresa'),
('contact_phone', '(66) 98444-3050', 'text', 'Telefone principal'),
('contact_whatsapp', '5566984443050', 'text', 'WhatsApp no formato internacional'),
('contact_email', 'contato@mundodosbots.com.br', 'text', 'Email principal de contato'),
('contact_address', 'R. das Aroeiras, 766 - Sala A - St. Comercial, Sinop - MT, 78550-224', 'text', 'Endereço físico da empresa'),
('social_facebook', 'https://facebook.com/mundodosbots', 'text', 'URL do Facebook'),
('social_instagram', 'https://instagram.com/mundodosbots', 'text', 'URL do Instagram'),
('social_linkedin', 'https://linkedin.com/company/mundodosbots', 'text', 'URL do LinkedIn'),
('social_youtube', '', 'text', 'URL do YouTube'),
('primary_color', '#035F36', 'text', 'Cor primária do site'),
('secondary_color', '#302E61', 'text', 'Cor secundária do site'),
('logo_url', '/logo.png', 'image', 'URL do logotipo'),
('favicon_url', '/favicon.ico', 'image', 'URL do favicon'),
('maintenance_mode', 'false', 'boolean', 'Modo de manutenção ativo/inativo'),
('google_analytics_id', '', 'text', 'ID do Google Analytics'),
('facebook_pixel_id', '', 'text', 'ID do Facebook Pixel'),
('meta_title', 'Mundo dos Bots - Chatbots Inteligentes para seu Negócio', 'text', 'Meta title padrão'),
('meta_description', 'Aumente suas vendas e automatize seu atendimento com chatbots inteligentes. WhatsApp, Sites e Automação de Marketing.', 'textarea', 'Meta description padrão'),
('meta_keywords', 'chatbots, whatsapp, automação, inteligência artificial, vendas, marketing digital', 'text', 'Palavras-chave padrão');

-- Conteúdo padrão da página inicial
INSERT INTO home_content (section_name, title, subtitle, content, order_position) VALUES 
('hero', 'Transforme sua Comunicação com a Inteligência Artificial dos Nossos Bots', 
 'Soluções completas em chatbots para WhatsApp, sites e automação de marketing', 
 'Descubra como nossos chatbots inteligentes podem revolucionar seu negócio, aumentando vendas em até 300% e melhorando o atendimento ao cliente 24 horas por dia.', 1),
 
('services', 'Nossos Principais Serviços', 
 'Soluções personalizadas para cada necessidade do seu negócio', 
 'Oferecemos chatbots inteligentes para WhatsApp, sites e automação completa de marketing. Tudo com tecnologia de ponta e suporte especializado.', 2),
 
('solutions', 'Soluções Para o Seu Negócio', 
 'Por objetivo, setor ou produto específico', 
 'Escolha a solução ideal para o seu negócio entre nossas opções especializadas por objetivo, setor de atuação ou produto.', 3),
 
('franchise', 'Seja um Franqueado de Sucesso', 
 'Baixo investimento, alta lucratividade e suporte completo', 
 'Invista em uma franquia digital com potencial de crescimento ilimitado. Modelo de negócio validado e suporte completo para seu sucesso.', 4),
 
('testimonials', 'O Que Dizem Nossos Clientes', 
 'Histórias reais de transformação e sucesso', 
 'Veja como empresas de diversos setores estão transformando seus negócios com nossas soluções.', 5),
 
('cta_final', 'Pronto Para Transformar Seu Negócio?', 
 'Fale com um especialista e descubra a solução ideal', 
 'Nossa equipe está pronta para entender suas necessidades e apresentar a melhor solução em chatbots e automação para seu negócio.', 6);

-- Serviços padrão
INSERT INTO services (name, slug, description, icon, is_featured, content) VALUES 
('Chatbots para WhatsApp', 'chatbots-whatsapp', 
 'Automatize seu atendimento no WhatsApp com chatbots inteligentes que qualificam leads e fecham vendas 24/7', 
 'FiMessageCircle', TRUE,
 '<h2>Revolucione seu WhatsApp Business</h2><p>Atenda seus clientes automaticamente 24 horas por dia com inteligência artificial.</p>'),

('Chatbots para Sites', 'chatbots-sites', 
 'Mantenha seus visitantes engajados com chatbots interativos que qualificam leads e aumentam conversões', 
 'FiGlobe', TRUE,
 '<h2>Engaje Visitantes do seu Site</h2><p>Transforme visitantes em leads qualificados com conversas inteligentes.</p>'),

('Automação de Marketing', 'automacao-marketing', 
 'Automatize suas campanhas de marketing, qualifique leads automaticamente e multiplique seus resultados', 
 'FiTrendingUp', TRUE,
 '<h2>Marketing que Funciona no Piloto Automático</h2><p>Campanhas inteligentes que qualificam e nutrem leads automaticamente.</p>'),

('Integração com CRM', 'integracao-crm', 
 'Integre perfeitamente com seu CRM e centralize todas as informações dos clientes', 
 'FiDatabase', FALSE,
 '<h2>Dados Centralizados</h2><p>Integração perfeita com principais CRMs do mercado.</p>'),

('Análise e Relatórios', 'analise-relatorios', 
 'Acompanhe métricas em tempo real e tome decisões baseadas em dados', 
 'FiBarChart', FALSE,
 '<h2>Decisões Baseadas em Dados</h2><p>Dashboards completos e relatórios detalhados em tempo real.</p>');

-- Soluções por Objetivo
INSERT INTO solutions_by_objective (name, slug, title, subtitle, description, content, benefits, features, cta_whatsapp_message, order_position) VALUES 
('Aumentar Vendas', 'aumentar-vendas', 
 'Transforme Conversas em Vendas com Chatbots Inteligentes', 
 'Aumente suas vendas em até 300% com automação inteligente', 
 'Descubra como nossos chatbots podem revolucionar suas vendas, qualificando leads automaticamente e convertendo conversas em vendas reais 24 horas por dia.',
 '<h2>Venda Mais com Automação Inteligente</h2><p>Nossos chatbots são especializados em qualificar leads e conduzir conversas de vendas de forma natural e eficiente.</p>',
 '["Aumento de até 300% nas vendas", "Qualificação automática de leads", "Atendimento 24 horas por dia, 7 dias por semana", "Redução de 70% no tempo de resposta", "ROI médio de 5x em 6 meses", "Integração com sistemas de pagamento"]',
 '["Integração nativa com WhatsApp Business API", "Qualificação inteligente com perguntas personalizadas", "Catálogo de produtos integrado", "Checkout automatizado", "Upselling e cross-selling inteligente", "Relatórios de vendas em tempo real", "Integração com CRM", "Follow-up automático"]',
 'Olá! Gostaria de saber mais sobre como aumentar minhas vendas com chatbots inteligentes.', 1),

('Melhorar Atendimento', 'melhorar-atendimento', 
 'Atendimento Excepcional 24/7 com Inteligência Artificial', 
 'Transforme a experiência do seu cliente com atendimento inteligente', 
 'Ofereça um atendimento excepcional 24 horas por dia, 7 dias por semana, com respostas instantâneas, personalizadas e humanizadas.',
 '<h2>Atendimento que Encanta</h2><p>Proporcione uma experiência única com atendimento automatizado que parece humano.</p>',
 '["Atendimento 24/7 sem pausas", "Resposta instantânea a qualquer horário", "95% de satisfação dos clientes", "Redução de 80% nos custos operacionais", "Zero tempo de espera", "Histórico completo de conversas"]',
 '["Respostas contextualizadas e inteligentes", "Integração com base de conhecimento", "Transferência inteligente para humano", "Múltiplos idiomas", "Histórico de conversas", "Satisfação em tempo real", "FAQ automático", "Priorização de atendimentos"]',
 'Olá! Quero melhorar o atendimento da minha empresa com chatbots inteligentes disponíveis 24/7.', 2),

('Automatizar Marketing', 'automatizar-marketing', 
 'Automatize Seu Marketing e Multiplique Resultados', 
 'Marketing inteligente que funciona enquanto você dorme', 
 'Automatize suas campanhas de marketing, qualifique leads automaticamente e multiplique seus resultados com inteligência artificial.',
 '<h2>Marketing no Piloto Automático</h2><p>Campanhas inteligentes que trabalham 24h qualificando e nutrindo seus leads.</p>',
 '["Qualificação automática de 100% dos leads", "Campanhas personalizadas em escala", "Aumento de 250% nas conversões", "ROI mensurável e transparente", "Segmentação inteligente", "Nutrição automática de leads"]',
 '["Segmentação automática de leads", "Campanhas multicanal (WhatsApp, Email, SMS)", "A/B testing automatizado", "Analytics avançado", "Lead scoring inteligente", "Integração com ferramentas de marketing", "Automação de follow-up", "Personalização em massa"]',
 'Olá! Quero automatizar meu marketing e multiplicar meus resultados com IA.', 3),

('Reduzir Custos Operacionais', 'reduzir-custos', 
 'Reduza Custos e Aumente Eficiência Operacional', 
 'Economize até 60% nos custos operacionais com automação', 
 'Reduza significativamente seus custos operacionais automatizando tarefas repetitivas, otimizando processos e aumentando a eficiência da equipe.',
 '<h2>Eficiência que Gera Economia</h2><p>Automatize processos e libere sua equipe para tarefas estratégicas.</p>',
 '["Redução de até 60% nos custos operacionais", "Automação de tarefas repetitivas", "Aumento de 200% na eficiência", "ROI positivo em menos de 3 meses", "Escalabilidade sem aumentar custos", "Menos erros humanos"]',
 '["Automação de processos repetitivos", "Integração com sistemas existentes", "Relatórios de eficiência", "Escalabilidade ilimitada", "Redução de erros", "Otimização de tempo", "Dashboard de produtividade", "Análise de custos"]',
 'Olá! Quero reduzir os custos operacionais da minha empresa com automação inteligente.', 4);

-- Soluções por Setor
INSERT INTO solutions_by_sector (name, slug, title, subtitle, description, content, challenges, solutions, cta_whatsapp_message, order_position) VALUES 
('E-commerce', 'ecommerce', 
 'Chatbots que Vendem para E-commerce', 
 'Transforme visitantes em clientes com IA', 
 'Maximize suas vendas online com chatbots inteligentes que qualificam leads, recomendam produtos e fecham vendas automaticamente.',
 '<h2>E-commerce Turbinado com IA</h2><p>Aumente suas vendas online com automação inteligente.</p>',
 '["Alto índice de abandono de carrinho (70%)", "Atendimento apenas em horário comercial", "Dificuldade em qualificar leads", "Baixa taxa de conversão", "Custo alto de aquisição de clientes"]',
 '["Recuperação automática de carrinhos abandonados", "Atendimento 24/7 sem pausas", "Qualificação automática de compradores", "Recomendações personalizadas de produtos", "Checkout simplificado", "Upselling e cross-selling inteligente"]',
 'Olá! Quero aumentar as vendas do meu e-commerce com chatbots inteligentes.', 1),

('Imobiliárias', 'imobiliarias', 
 'Chatbots Especializados para Imobiliárias', 
 'Qualifique leads e feche mais negócios imobiliários', 
 'Automatize a qualificação de leads imobiliários, agende visitas automaticamente e aumente suas vendas com atendimento inteligente 24/7.',
 '<h2>Imobiliária Digital</h2><p>Qualifique leads e agende visitas automaticamente.</p>',
 '["Qualificação manual demorada de leads", "Perda de oportunidades fora do horário", "Dificuldade em agendar visitas", "Falta de follow-up consistente", "Alto custo por lead"]',
 '["Qualificação automática com perguntas-chave", "Agendamento automático de visitas", "Follow-up automático e consistente", "Envio automático de imóveis similares", "Relatórios de interesse", "Integração com portais imobiliários"]',
 'Olá! Quero qualificar leads e fechar mais negócios na minha imobiliária com automação.', 2),

('Clínicas e Consultórios', 'clinicas-consultorios', 
 'Chatbots para Clínicas e Consultórios', 
 'Melhore o atendimento e otimize agendamentos', 
 'Otimize o atendimento da sua clínica com agendamento automático, triagem inteligente de pacientes e lembretes automáticos que reduzem faltas.',
 '<h2>Saúde Digital</h2><p>Atendimento eficiente e agendamento sem complicações.</p>',
 '["Agendamento manual e demorado", "Alta taxa de faltas em consultas", "Atendimento telefônico sobrecarregado", "Dificuldade em triagem de urgências", "Falta de comunicação com pacientes"]',
 '["Agendamento online 24/7", "Triagem inteligente de sintomas", "Lembretes automáticos de consultas", "Confirmação automática", "Histórico médico acessível", "Telemedicina integrada", "Envio de resultados", "Pesquisa de satisfação"]',
 'Olá! Quero melhorar o atendimento e otimizar os agendamentos da minha clínica.', 3),

('Educação', 'educacao', 
 'Chatbots para Instituições de Ensino', 
 'Transforme a experiência educacional com IA', 
 'Automatize o atendimento educacional, melhore a experiência dos alunos e aumente as matrículas com chatbots especializados em educação.',
 '<h2>Educação 4.0</h2><p>Atendimento automatizado para alunos e responsáveis.</p>',
 '["Dúvidas repetitivas que sobrecarregam equipe", "Dificuldade em acompanhar leads de matrícula", "Falta de informações atualizadas", "Baixa taxa de retenção de alunos", "Comunicação ineficiente"]',
 '["FAQ automático para dúvidas frequentes", "Processo de matrícula online", "Suporte ao aluno 24/7", "Notificações de prazos e eventos", "Acompanhamento de performance", "Portal do aluno integrado", "Gamificação do aprendizado"]',
 'Olá! Quero transformar a experiência educacional da minha instituição com automação.', 4),

('Indústria', 'industria', 
 'Chatbots para Indústria e B2B', 
 'Automatize processos e qualifique leads industriais', 
 'Otimize processos industriais, qualifique leads B2B e ofereça suporte técnico automatizado com chatbots especializados.',
 '<h2>Indústria 4.0</h2><p>Automação inteligente para processos industriais.</p>',
 '["Processos manuais e demorados", "Qualificação complexa de leads B2B", "Suporte técnico custoso", "Comunicação interna ineficiente", "Falta de rastreabilidade"]',
 '["Automação de processos repetitivos", "Qualificação avançada de leads B2B", "Suporte técnico automatizado", "Portal de atendimento ao cliente", "Rastreamento de pedidos", "Integração com ERP", "Comunicação interna automatizada"]',
 'Olá! Quero automatizar processos da minha indústria com chatbots inteligentes.', 5),

('Restaurantes e Food Service', 'restaurantes', 
 'Chatbots para Restaurantes e Delivery', 
 'Automatize pedidos e aumente suas vendas', 
 'Receba pedidos automaticamente via WhatsApp, gerencie entregas e aumente suas vendas com cardápio digital inteligente.',
 '<h2>Delivery Inteligente</h2><p>Pedidos automáticos e gestão simplificada.</p>',
 '["Pedidos por telefone demorados e com erros", "Falta de equipe para atender demanda", "Dificuldade em gerenciar múltiplos canais", "Ausência de histórico de pedidos", "Promoções não alcançam todos"]',
 '["Cardápio digital interativo", "Pedidos automáticos via WhatsApp", "Gestão de entregas integrada", "Programa de fidelidade automático", "Promoções segmentadas", "Histórico de pedidos", "Avaliações automatizadas"]',
 'Olá! Quero automatizar pedidos e aumentar as vendas do meu restaurante.', 6);

-- Soluções por Produto
INSERT INTO solutions_by_product (name, slug, title, subtitle, description, content, features, pricing, cta_whatsapp_message, order_position) VALUES 
('Chatbots para WhatsApp', 'chatbots-whatsapp', 
 'Chatbot Inteligente para WhatsApp Business', 
 'Automatize seu WhatsApp Business com tecnologia de ponta', 
 'Transforme seu WhatsApp Business com chatbots inteligentes que qualificam leads, fecham vendas e atendem clientes automaticamente 24/7.',
 '<h2>WhatsApp Business Automatizado</h2><p>A solução completa para automatizar seu WhatsApp.</p>',
 '["Integração nativa com WhatsApp Business API", "Respostas automáticas inteligentes", "Qualificação avançada de leads", "Catálogo de produtos integrado", "Múltiplos atendentes", "Chatbot + Humano", "Relatórios detalhados", "Mensagens em massa segmentadas", "Agendamento de mensagens", "Tags e segmentação", "Histórico completo", "Métricas em tempo real"]',
 '{"starter": {"name": "Starter", "price": 97, "period": "mês", "features": ["Até 1.000 conversas/mês", "1 número WhatsApp", "Respostas automáticas básicas", "Suporte por email", "Relatórios básicos"]}, "professional": {"name": "Professional", "price": 197, "period": "mês", "popular": true, "features": ["Até 5.000 conversas/mês", "2 números WhatsApp", "Qualificação de leads avançada", "Suporte prioritário", "Relatórios completos", "Integrações CRM", "Mensagens em massa"]}, "enterprise": {"name": "Enterprise", "price": 497, "period": "mês", "features": ["Conversas ilimitadas", "Números ilimitados", "Customização completa", "Suporte 24/7", "Analytics avançado", "Integrações personalizadas", "API dedicada", "Consultoria inclusa"]}}',
 'Olá! Quero automatizar meu WhatsApp Business com um chatbot inteligente.', 1),

('Chatbots para Sites', 'chatbots-sites', 
 'Chatbot para Sites e Landing Pages', 
 'Engaje visitantes e converta mais vendas', 
 'Mantenha seus visitantes engajados com chatbots interativos que qualificam leads, respondem dúvidas e aumentam suas conversões.',
 '<h2>Site Mais Inteligente</h2><p>Transforme visitantes em clientes qualificados.</p>',
 '["Integração simples (copiar e colar)", "Design 100% personalizável", "Múltiplos idiomas", "Qualificação de leads", "Captura de contatos", "Integração com formulários", "Analytics detalhado", "A/B testing", "Gatilhos inteligentes", "Popup inteligente", "Mobile responsivo", "LGPD compliant"]',
 '{"basic": {"name": "Basic", "price": 77, "period": "mês", "features": ["1 chatbot", "Até 1.000 visitantes/mês", "Templates prontos", "Suporte por email", "Branding Mundo dos Bots"]}, "business": {"name": "Business", "price": 147, "period": "mês", "popular": true, "features": ["3 chatbots", "Até 10.000 visitantes/mês", "Design personalizado", "Suporte prioritário", "Sem branding", "Integrações", "Relatórios avançados"]}, "premium": {"name": "Premium", "price": 297, "period": "mês", "features": ["Chatbots ilimitados", "Visitantes ilimitados", "White label completo", "Suporte 24/7", "API personalizada", "Consultoria mensal", "Desenvolvimento customizado"]}}',
 'Olá! Quero engajar visitantes do meu site e aumentar conversões com chatbots.', 2),

('Automação de Agendamentos', 'automacao-agendamentos', 
 'Sistema de Agendamentos Automatizado', 
 'Organize sua agenda de forma inteligente', 
 'Automatize completamente seus agendamentos com sistema inteligente que organiza horários, envia lembretes e reduz faltas em até 70%.',
 '<h2>Agenda Sempre Cheia</h2><p>Agendamentos automáticos que não falham.</p>',
 '["Integração com Google Calendar e Outlook", "Múltiplos calendários e profissionais", "Confirmação automática", "Lembretes via WhatsApp, Email e SMS", "Reagendamento fácil", "Lista de espera automática", "Bloqueio de horários", "Sincronização em tempo real", "Pagamento online integrado", "Histórico completo", "Relatórios de ocupação"]',
 '{"essencial": {"name": "Essencial", "price": 67, "period": "mês", "features": ["1 profissional", "1 serviço", "Até 100 agendamentos/mês", "Lembretes básicos", "Suporte por email"]}, "profissional": {"name": "Profissional", "price": 127, "period": "mês", "popular": true, "features": ["Até 5 profissionais", "Serviços ilimitados", "Até 500 agendamentos/mês", "Lembretes avançados", "Pagamento online", "Suporte prioritário", "Relatórios"]}, "clinica": {"name": "Clínica/Empresa", "price": 247, "period": "mês", "features": ["Profissionais ilimitados", "Agendamentos ilimitados", "Múltiplas unidades", "API completa", "Integrações personalizadas", "Suporte 24/7", "Consultoria inclusa"]}}',
 'Olá! Quero automatizar os agendamentos e reduzir faltas com sistema inteligente.', 3),

('Qualificação Automática de Leads', 'qualificacao-leads', 
 'Sistema de Qualificação Inteligente de Leads', 
 'Identifique os melhores leads automaticamente', 
 'Qualifique seus leads automaticamente com inteligência artificial que identifica as melhores oportunidades e prioriza seu time de vendas.',
 '<h2>Leads Qualificados Automaticamente</h2><p>IA que identifica suas melhores oportunidades.</p>',
 '["Qualificação por IA avançada", "Lead scoring automático", "Segmentação inteligente", "Enriquecimento de dados", "Distribuição automática para vendedores", "Follow-up automático", "Integração com CRM", "Previsão de conversão", "Análise de comportamento", "Nutrição automática", "Relatórios preditivos", "Dashboard executivo"]',
 '{"growth": {"name": "Growth", "price": 127, "period": "mês", "features": ["Até 500 leads/mês", "Qualificação básica", "Lead scoring simples", "Integrações básicas", "Suporte por email"]}, "scale": {"name": "Scale", "price": 247, "period": "mês", "popular": true, "features": ["Até 2.000 leads/mês", "Qualificação avançada", "IA de previsão", "Integrações completas", "Distribuição automática", "Suporte prioritário", "Relatórios avançados"]}, "enterprise": {"name": "Enterprise", "price": 497, "period": "mês", "features": ["Leads ilimitados", "IA personalizada", "Enriquecimento de dados", "API dedicada", "Integrações ilimitadas", "Consultoria estratégica", "Suporte 24/7", "Desenvolvimento customizado"]}}',
 'Olá! Quero qualificar meus leads automaticamente e priorizar as melhores oportunidades.', 4),

('Automação de Marketing', 'automacao-marketing-completa', 
 'Plataforma Completa de Marketing Automation', 
 'Marketing inteligente que trabalha 24/7', 
 'Plataforma completa de automação de marketing com campanhas multicanal, segmentação inteligente e analytics avançado.',
 '<h2>Marketing no Automático</h2><p>Campanhas inteligentes em todos os canais.</p>',
 '["Campanhas multicanal (WhatsApp, Email, SMS)", "Segmentação avançada", "Jornadas automatizadas", "A/B testing automático", "Lead nurturing inteligente", "Personalização em massa", "Integração com anúncios", "ROI tracking", "Analytics preditivo", "Automação de funil", "Gatilhos comportamentais", "Social media automation"]',
 '{"starter": {"name": "Starter", "price": 197, "period": "mês", "features": ["Até 1.000 contatos", "2 canais", "Jornadas básicas", "Templates prontos", "Suporte por email", "Relatórios básicos"]}, "professional": {"name": "Professional", "price": 397, "period": "mês", "popular": true, "features": ["Até 10.000 contatos", "Todos os canais", "Jornadas ilimitadas", "A/B testing", "Segmentação avançada", "Integrações", "Suporte prioritário", "Analytics completo"]}, "enterprise": {"name": "Enterprise", "price": 797, "period": "mês", "features": ["Contatos ilimitados", "White label", "IA personalizada", "API dedicada", "Integrações customizadas", "Consultoria estratégica", "Suporte 24/7", "Desenvolvimento dedicado", "Gerente de conta"]}}',
 'Olá! Quero uma plataforma completa de automação de marketing com IA.', 5);

-- =====================================================
-- VIEWS ÚTEIS PARA RELATÓRIOS
-- =====================================================

-- View de posts publicados com autor e categoria
CREATE OR REPLACE VIEW vw_published_posts AS
SELECT 
    bp.id,
    bp.title,
    bp.slug,
    bp.excerpt,
    bp.featured_image,
    bp.published_at,
    bp.view_count,
    c.name as category_name,
    c.slug as category_slug,
    u.name as author_name,
    u.email as author_email
FROM blog_posts bp
LEFT JOIN categories c ON bp.category_id = c.id
LEFT JOIN users u ON bp.author_id = u.id
WHERE bp.status = 'published' 
AND bp.is_active = TRUE
ORDER BY bp.published_at DESC;

-- View de estatísticas do blog
CREATE OR REPLACE VIEW vw_blog_stats AS
SELECT 
    COUNT(*) as total_posts,
    SUM(CASE WHEN status = 'published' THEN 1 ELSE 0 END) as published_posts,
    SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft_posts,
    SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled_posts,
    SUM(view_count) as total_views,
    AVG(view_count) as avg_views_per_post
FROM blog_posts
WHERE is_active = TRUE;

-- View de contatos pendentes
CREATE OR REPLACE VIEW vw_pending_contacts AS
SELECT 
    id,
    name,
    email,
    phone,
    subject,
    LEFT(message, 100) as message_preview,
    created_at,
    TIMESTAMPDIFF(HOUR, created_at, NOW()) as hours_waiting
FROM contacts
WHERE status = 'new'
ORDER BY created_at DESC;

-- =====================================================
-- PROCEDURES ÚTEIS
-- =====================================================

-- Procedure para publicar post agendado
DELIMITER //
CREATE PROCEDURE sp_publish_scheduled_posts()
BEGIN
    UPDATE blog_posts 
    SET status = 'published',
        published_at = NOW()
    WHERE status = 'scheduled' 
    AND scheduled_at <= NOW()
    AND is_active = TRUE;
    
    SELECT ROW_COUNT() as posts_published;
END //
DELIMITER ;

-- Procedure para limpar tokens expirados
DELIMITER //
CREATE PROCEDURE sp_cleanup_expired_tokens()
BEGIN
    DELETE FROM password_reset_tokens 
    WHERE expires_at < NOW() 
    OR used = TRUE;
    
    SELECT ROW_COUNT() as tokens_removed;
END //
DELIMITER ;

-- Procedure para estatísticas de vendas (exemplo)
DELIMITER //
CREATE PROCEDURE sp_get_monthly_stats(IN target_month INT, IN target_year INT)
BEGIN
    SELECT 
        COUNT(DISTINCT c.id) as total_contacts,
        COUNT(DISTINCT fa.id) as total_franchise_apps,
        COUNT(DISTINCT ja.id) as total_job_apps,
        COUNT(DISTINCT bp.id) as posts_published
    FROM 
        (SELECT 1 as dummy) as base
    LEFT JOIN contacts c ON MONTH(c.created_at) = target_month 
        AND YEAR(c.created_at) = target_year
    LEFT JOIN franchise_applications fa ON MONTH(fa.created_at) = target_month 
        AND YEAR(fa.created_at) = target_year
    LEFT JOIN job_applications ja ON MONTH(ja.created_at) = target_month 
        AND YEAR(ja.created_at) = target_year
    LEFT JOIN blog_posts bp ON MONTH(bp.published_at) = target_month 
        AND YEAR(bp.published_at) = target_year
        AND bp.status = 'published';
END //
DELIMITER ;

-- =====================================================
-- TRIGGERS PARA AUDITORIA E AUTOMAÇÃO
-- =====================================================

-- Trigger para atualizar data de atualização automaticamente
DELIMITER //
CREATE TRIGGER tr_blog_posts_before_update
BEFORE UPDATE ON blog_posts
FOR EACH ROW
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
    
    -- Se mudar status para published e ainda não tem data de publicação
    IF NEW.status = 'published' AND OLD.status != 'published' AND NEW.published_at IS NULL THEN
        SET NEW.published_at = CURRENT_TIMESTAMP;
    END IF;
END //
DELIMITER ;

-- =====================================================
-- EVENTOS AGENDADOS (MySQL Event Scheduler)
-- =====================================================

-- Habilitar o scheduler de eventos
SET GLOBAL event_scheduler = ON;

-- Evento para publicar posts agendados a cada 5 minutos
CREATE EVENT IF NOT EXISTS evt_publish_scheduled_posts
ON SCHEDULE EVERY 5 MINUTE
DO
    CALL sp_publish_scheduled_posts();

-- Evento para limpar tokens expirados diariamente
CREATE EVENT IF NOT EXISTS evt_cleanup_expired_tokens
ON SCHEDULE EVERY 1 DAY
STARTS (TIMESTAMP(CURRENT_DATE) + INTERVAL 1 DAY + INTERVAL 3 HOUR)
DO
    CALL sp_cleanup_expired_tokens();

-- =====================================================
-- ÍNDICES ADICIONAIS PARA PERFORMANCE
-- =====================================================

-- Índices compostos para queries comuns
CREATE INDEX idx_blog_status_published ON blog_posts(status, published_at DESC) WHERE status = 'published';
CREATE INDEX idx_blog_category_status ON blog_posts(category_id, status, published_at DESC);
CREATE INDEX idx_contacts_status_created ON contacts(status, created_at DESC);
CREATE INDEX idx_franchise_status_created ON franchise_applications(status, created_at DESC);
CREATE INDEX idx_users_email_active ON users(email, is_active);

-- =====================================================
-- CONFIGURAÇÕES FINAIS
-- =====================================================

-- Garantir que o charset está correto em todas as tabelas
ALTER DATABASE mundodos_mundo_dos_bots CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

-- =====================================================
-- SCRIPT FINALIZADO
-- =====================================================

SELECT '✅ Banco de dados criado com sucesso!' as status;
SELECT '📊 Tabelas criadas: 16' as info;
SELECT '👤 Usuário admin criado: admin@mundodosbots.com.br / admin123' as credentials;
SELECT '🎯 Dados iniciais inseridos' as info;
SELECT '⚡ Índices e otimizações aplicados' as info;
SELECT '' as blank;
SELECT '🚀 Sistema pronto para uso!' as final_message;

