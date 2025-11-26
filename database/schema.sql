-- =====================================================
-- BANCO DE DADOS MUNDO DOS BOTS
-- =====================================================

CREATE DATABASE IF NOT EXISTS mundo_dos_bots;
USE mundo_dos_bots;

-- =====================================================
-- TABELA DE USUÁRIOS ADMINISTRATIVOS
-- =====================================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor') DEFAULT 'editor',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE CATEGORIAS DO BLOG
-- =====================================================
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE POSTS DO BLOG
-- =====================================================
CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content LONGTEXT NOT NULL,
    excerpt TEXT,
    featured_image VARCHAR(500),
    category_id INT,
    author_id INT,
    status ENUM('draft', 'scheduled', 'published') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    scheduled_at TIMESTAMP NULL,
    seo_title VARCHAR(255),
    seo_description TEXT,
    seo_keywords TEXT,
    view_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- TABELA DE CONFIGURAÇÕES DO SITE
-- =====================================================
CREATE TABLE site_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('text', 'textarea', 'image', 'boolean', 'json') DEFAULT 'text',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE CONTEÚDO DA PÁGINA INICIAL
-- =====================================================
CREATE TABLE home_content (
    id INT PRIMARY KEY AUTO_INCREMENT,
    section_name VARCHAR(100) NOT NULL,
    title VARCHAR(255),
    subtitle TEXT,
    content TEXT,
    image_url VARCHAR(500),
    button_text VARCHAR(100),
    button_link VARCHAR(500),
    order_position INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE SERVIÇOS
-- =====================================================
CREATE TABLE services (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    content LONGTEXT,
    icon VARCHAR(100),
    image_url VARCHAR(500),
    price DECIMAL(10,2),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE SOLUÇÕES POR OBJETIVO
-- =====================================================
CREATE TABLE solutions_by_objective (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    description TEXT,
    content LONGTEXT,
    benefits JSON,
    features JSON,
    image_url VARCHAR(500),
    hero_image VARCHAR(500),
    cta_text VARCHAR(100) DEFAULT 'Fale com um Especialista',
    cta_whatsapp_message TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    order_position INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE SOLUÇÕES POR SETOR
-- =====================================================
CREATE TABLE solutions_by_sector (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    description TEXT,
    content LONGTEXT,
    challenges JSON,
    solutions JSON,
    case_studies JSON,
    image_url VARCHAR(500),
    hero_image VARCHAR(500),
    cta_text VARCHAR(100) DEFAULT 'Fale com um Especialista',
    cta_whatsapp_message TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    order_position INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE SOLUÇÕES POR PRODUTO
-- =====================================================
CREATE TABLE solutions_by_product (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    description TEXT,
    content LONGTEXT,
    features JSON,
    pricing JSON,
    integrations JSON,
    image_url VARCHAR(500),
    hero_image VARCHAR(500),
    demo_video_url VARCHAR(500),
    cta_text VARCHAR(100) DEFAULT 'Fale com um Especialista',
    cta_whatsapp_message TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    order_position INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE CONTATOS
-- =====================================================
CREATE TABLE contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status ENUM('new', 'read', 'replied', 'closed') DEFAULT 'new',
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE CANDIDATOS (TRABALHE CONOSCO)
-- =====================================================
CREATE TABLE job_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(100) NOT NULL,
    resume_url VARCHAR(500),
    cover_letter TEXT,
    experience_years INT,
    status ENUM('new', 'reviewed', 'interviewed', 'hired', 'rejected') DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE INTERESSADOS EM FRANQUIA
-- =====================================================
CREATE TABLE franchise_applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    city VARCHAR(100),
    state VARCHAR(50),
    investment_range VARCHAR(50),
    experience_level VARCHAR(50),
    message TEXT,
    status ENUM('new', 'contacted', 'qualified', 'approved', 'rejected') DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABELA DE ARQUIVOS UPLOADADOS
-- =====================================================
CREATE TABLE uploaded_files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    original_name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    uploaded_by INT,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- =====================================================
-- INSERIR DADOS INICIAIS
-- =====================================================

-- Usuário administrador padrão (senha: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('Administrador', 'admin@mundodosbots.com.br', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Categorias padrão
INSERT INTO categories (name, slug, description) VALUES 
('Vendas', 'vendas', 'Artigos sobre vendas e conversão'),
('Marketing', 'marketing', 'Estratégias de marketing digital'),
('Tecnologia', 'tecnologia', 'Inovações tecnológicas'),
('Dicas', 'dicas', 'Dicas e tutoriais'),
('Cases', 'cases', 'Casos de sucesso');

-- Configurações padrão do site
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES 
('site_name', 'Mundo dos Bots', 'text', 'Nome do site'),
('site_description', 'Especialistas em Chatbots e Automação', 'text', 'Descrição do site'),
('company_name', 'IA Soluções de Tecnologia em Atendimento LTDA', 'text', 'Nome da empresa'),
('company_cnpj', '43.327.090/0001-32', 'text', 'CNPJ da empresa'),
('contact_phone', '(66) 98444-3050', 'text', 'Telefone de contato'),
('contact_whatsapp', '(66) 98444-3050', 'text', 'WhatsApp de contato'),
('contact_email', 'contato@mundodosbots.com.br', 'text', 'Email de contato'),
('contact_address', 'R. das Aroeiras, 766 - Sala A - St. Comercial, Sinop - MT, 78550-224', 'text', 'Endereço da empresa'),
('social_facebook', '', 'text', 'Link do Facebook'),
('social_instagram', '', 'text', 'Link do Instagram'),
('social_linkedin', '', 'text', 'Link do LinkedIn'),
('primary_color', '#302E61', 'text', 'Cor primária do site'),
('maintenance_mode', 'false', 'boolean', 'Modo de manutenção');

-- Conteúdo padrão da página inicial
INSERT INTO home_content (section_name, title, subtitle, content, order_position) VALUES 
('hero', 'Transforme sua Comunicação com a Inteligência Artificial dos Nossos Bots', 'Soluções completas em chatbots para WhatsApp, sites e automação de marketing', 'Descubra como nossos chatbots podem revolucionar seu negócio, aumentando vendas e melhorando o atendimento ao cliente.', 1),
('services', 'Nossos Principais Serviços', 'Soluções personalizadas para cada necessidade', 'Oferecemos chatbots inteligentes para WhatsApp, sites e automação completa de marketing.', 2),
('franchise', 'Seja um Franqueado de Sucesso', 'Baixo investimento, alta lucratividade', 'Invista em uma franquia digital com potencial de crescimento ilimitado.', 3);

-- Serviços padrão
INSERT INTO services (name, slug, description, icon, is_featured) VALUES 
('Chatbots para WhatsApp', 'chatbots-whatsapp', 'Automatize seu atendimento no WhatsApp com chatbots inteligentes', 'FiMessageCircle', TRUE),
('Chatbots para Sites', 'chatbots-sites', 'Mantenha seus visitantes engajados com chatbots interativos', 'FiGlobe', TRUE),
('Automação de Marketing', 'automacao-marketing', 'Automatize suas campanhas de marketing e qualifique leads', 'FiTrendingUp', TRUE);

-- Soluções por Objetivo
INSERT INTO solutions_by_objective (name, slug, title, subtitle, description, content, benefits, features, cta_whatsapp_message, order_position) VALUES 
('Aumentar Vendas', 'aumentar-vendas', 'Transforme Conversas em Vendas com Chatbots Inteligentes', 'Aumente suas vendas em até 300% com automação inteligente', 'Descubra como nossos chatbots podem revolucionar suas vendas, qualificando leads e convertendo conversas em vendas reais.', 'Conteúdo completo sobre como aumentar vendas com chatbots...', '["Aumento de 300% nas vendas", "Qualificação automática de leads", "Atendimento 24/7", "Redução de 70% no tempo de resposta"]', '["Integração com WhatsApp Business", "Qualificação automática de leads", "Relatórios detalhados", "Personalização avançada"]', 'Olá! Gostaria de saber mais sobre como aumentar minhas vendas com chatbots inteligentes.', 1),
('Melhorar Atendimento', 'melhorar-atendimento', 'Atendimento Excepcional 24/7 com IA', 'Transforme a experiência do seu cliente com atendimento inteligente', 'Ofereça um atendimento excepcional 24 horas por dia, 7 dias por semana, com respostas instantâneas e personalizadas.', 'Conteúdo completo sobre como melhorar o atendimento...', '["Atendimento 24/7", "Resposta instantânea", "Satisfação do cliente", "Redução de custos"]', '["Respostas automáticas inteligentes", "Integração com CRM", "Histórico de conversas", "Transferência para humano"]', 'Olá! Quero melhorar o atendimento da minha empresa com chatbots inteligentes.', 2),
('Automatizar Marketing', 'automatizar-marketing', 'Automatize Seu Marketing e Multiplique Resultados', 'Marketing inteligente que funciona enquanto você dorme', 'Automatize suas campanhas de marketing, qualifique leads automaticamente e multiplique seus resultados com IA.', 'Conteúdo completo sobre automação de marketing...', '["Qualificação automática de leads", "Campanhas personalizadas", "Aumento de conversões", "ROI mensurável"]', '["Segmentação automática", "Campanhas multicanal", "Analytics avançado", "A/B testing"]', 'Olá! Quero automatizar meu marketing e multiplicar meus resultados.', 3),
('Reduzir Custos Operacionais', 'reduzir-custos', 'Reduza Custos e Aumente Eficiência', 'Economize até 60% nos custos operacionais', 'Reduza significativamente seus custos operacionais automatizando tarefas repetitivas e otimizando processos.', 'Conteúdo completo sobre redução de custos...', '["Redução de 60% nos custos", "Automação de processos", "Aumento de eficiência", "ROI rápido"]', '["Automação de tarefas", "Integração com sistemas", "Relatórios de eficiência", "Escalabilidade"]', 'Olá! Quero reduzir os custos operacionais da minha empresa com automação.', 4);

-- Soluções por Setor
INSERT INTO solutions_by_sector (name, slug, title, subtitle, description, content, challenges, solutions, cta_whatsapp_message, order_position) VALUES 
('E-commerce', 'ecommerce', 'Chatbots que Vendem para E-commerce', 'Transforme visitantes em clientes com IA', 'Maximize suas vendas online com chatbots inteligentes que qualificam leads e fecham vendas automaticamente.', 'Conteúdo completo para e-commerce...', '["Abandono de carrinho", "Atendimento fora do horário", "Qualificação de leads", "Conversão baixa"]', '["Recuperação de carrinho", "Atendimento 24/7", "Qualificação automática", "Upselling inteligente"]', 'Olá! Quero aumentar as vendas do meu e-commerce com chatbots inteligentes.', 1),
('Imobiliárias', 'imobiliarias', 'Chatbots para Imobiliárias', 'Qualifique leads e feche mais negócios', 'Automatize a qualificação de leads imobiliários e aumente suas vendas com atendimento inteligente.', 'Conteúdo completo para imobiliárias...', '["Qualificação manual de leads", "Perda de oportunidades", "Atendimento demorado", "Falta de follow-up"]', '["Qualificação automática", "Agendamento de visitas", "Follow-up automático", "Relatórios detalhados"]', 'Olá! Quero qualificar leads e fechar mais negócios na minha imobiliária.', 2),
('Clínicas e Consultórios', 'clinicas-consultorios', 'Chatbots para Saúde', 'Melhore o atendimento da sua clínica', 'Otimize o atendimento da sua clínica com agendamento automático e triagem inteligente de pacientes.', 'Conteúdo completo para clínicas...', '["Agendamento manual", "Falta de pacientes", "Atendimento demorado", "Perda de consultas"]', '["Agendamento automático", "Triagem inteligente", "Lembretes automáticos", "Histórico médico"]', 'Olá! Quero melhorar o atendimento da minha clínica com chatbots inteligentes.', 3),
('Educação', 'educacao', 'Chatbots para Educação', 'Transforme a experiência educacional', 'Automatize o atendimento educacional e melhore a experiência dos alunos com chatbots inteligentes.', 'Conteúdo completo para educação...', '["Atendimento manual", "Dúvidas repetitivas", "Falta de informações", "Baixa retenção"]', '["FAQ automático", "Matrículas online", "Suporte 24/7", "Gamificação"]', 'Olá! Quero transformar a experiência educacional da minha instituição.', 4),
('Indústria', 'industria', 'Chatbots para Indústria', 'Automatize processos industriais', 'Otimize processos industriais com chatbots inteligentes que automatizam atendimento e qualificam leads.', 'Conteúdo completo para indústria...', '["Processos manuais", "Falta de eficiência", "Custos altos", "Erros humanos"]', '["Automação de processos", "Qualificação de leads", "Suporte técnico", "Relatórios automáticos"]', 'Olá! Quero automatizar processos da minha indústria com chatbots inteligentes.', 5);

-- Soluções por Produto
INSERT INTO solutions_by_product (name, slug, title, subtitle, description, content, features, pricing, cta_whatsapp_message, order_position) VALUES 
('Chatbots para WhatsApp', 'chatbots-whatsapp', 'Chatbots Inteligentes para WhatsApp', 'Automatize seu WhatsApp Business com IA', 'Transforme seu WhatsApp Business com chatbots inteligentes que qualificam leads e fecham vendas automaticamente.', 'Conteúdo completo sobre chatbots para WhatsApp...', '["Integração nativa com WhatsApp", "Respostas automáticas", "Qualificação de leads", "Relatórios detalhados"]', '{"starter": {"price": 97, "features": ["Até 1000 mensagens/mês", "Respostas básicas", "Suporte por email"]}, "professional": {"price": 197, "features": ["Mensagens ilimitadas", "Qualificação de leads", "Suporte prioritário"]}}', 'Olá! Quero automatizar meu WhatsApp Business com chatbots inteligentes.', 1),
('Chatbots para Sites', 'chatbots-sites', 'Chatbots para Sites e Landing Pages', 'Engaje visitantes e converta mais', 'Mantenha seus visitantes engajados com chatbots interativos que qualificam leads e aumentam conversões.', 'Conteúdo completo sobre chatbots para sites...', '["Integração fácil", "Design personalizado", "Qualificação de leads", "Analytics avançado"]', '{"starter": {"price": 147, "features": ["1 chatbot", "Até 1000 conversas/mês", "Templates básicos"]}, "business": {"price": 297, "features": ["Chatbots ilimitados", "Conversas ilimitadas", "Design personalizado"]}}', 'Olá! Quero engajar visitantes do meu site com chatbots inteligentes.', 2),
('Automação de Agendamentos', 'automacao-agendamentos', 'Automatize Seus Agendamentos', 'Agende automaticamente e nunca perca uma oportunidade', 'Automatize seus agendamentos com chatbots inteligentes que organizam sua agenda e qualificam leads.', 'Conteúdo completo sobre automação de agendamentos...', '["Integração com calendários", "Confirmação automática", "Lembretes inteligentes", "Reagendamento fácil"]', '{"basic": {"price": 127, "features": ["1 calendário", "Até 50 agendamentos/mês", "Lembretes básicos"]}, "premium": {"price": 247, "features": ["Calendários ilimitados", "Agendamentos ilimitados", "Lembretes avançados"]}}', 'Olá! Quero automatizar os agendamentos da minha empresa.', 3),
('Qualificação de Leads', 'qualificacao-leads', 'Qualifique Leads Automaticamente', 'Transforme leads frios em oportunidades quentes', 'Qualifique seus leads automaticamente com chatbots inteligentes que identificam oportunidades reais de venda.', 'Conteúdo completo sobre qualificação de leads...', '["Qualificação automática", "Score de leads", "Segmentação inteligente", "Relatórios detalhados"]', '{"starter": {"price": 167, "features": ["Até 500 leads/mês", "Qualificação básica", "Relatórios simples"]}, "enterprise": {"price": 397, "features": ["Leads ilimitados", "Qualificação avançada", "Analytics completo"]}}', 'Olá! Quero qualificar meus leads automaticamente com IA.', 4);

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_created ON contacts(created_at);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_categories_active ON categories(is_active);
