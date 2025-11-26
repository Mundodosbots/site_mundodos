# 🌐 Mundo dos Bots - Website Oficial

Sistema web completo para a empresa Mundo dos Bots, especializada em chatbots e automação. Inclui site institucional responsivo e painel administrativo completo.

## 📋 Sobre o Projeto

Este é um sistema completo desenvolvido com React (TypeScript) no frontend e Node.js/Express no backend, utilizando MySQL como banco de dados. O sistema oferece:

- **Site Institucional**: Website moderno e responsivo com blog, serviços, formulários e muito mais
- **Painel Administrativo**: Sistema completo de gerenciamento de conteúdo, usuários e configurações
- **API REST**: Backend robusto com autenticação JWT e segurança implementada
- **Integrações**: Pabbly Connect para automação de redes sociais, EmailJS para envio de emails

## 🚀 Funcionalidades Principais

### Site Público
- ✅ Homepage com banner, serviços e CTAs
- ✅ Blog completo com pesquisa e categorias
- ✅ Páginas de serviços organizadas por objetivo, setor e produto
- ✅ Formulários de contato, franquia e trabalhe conosco
- ✅ Multilinguagem (PT-BR, EN-US, ES-ES)
- ✅ Design responsivo e otimizado para SEO
- ✅ Compartilhamento social em posts

### Painel Administrativo
- ✅ Gerenciamento completo de blog (criar, editar, publicar, agendar)
- ✅ Editor avançado com TipTap (imagens, links, tabelas, YouTube)
- ✅ Gerenciamento de usuários (criar, editar, ativar/desativar)
- ✅ Gerenciamento de categorias
- ✅ Gerenciamento de soluções/serviços
- ✅ Configurações do site
- ✅ Upload de imagens

### Sistema de Autenticação
- ✅ Login com JWT
- ✅ Registro público de usuários
- ✅ Recuperação de senha
- ✅ Proteção de rotas
- ✅ Roles e permissões (admin/editor)

## 🛠️ Tecnologias

### Frontend
- React 18 + TypeScript
- Styled Components
- React Router
- Framer Motion (animações)
- TipTap (editor de texto rico)
- React Hook Form

### Backend
- Node.js + Express
- MySQL
- JWT (autenticação)
- bcrypt (criptografia)
- Multer (upload de arquivos)
- Node-cron (agendamento)

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- MySQL 8.0+
- npm ou yarn

### 1. Clone o repositório
```bash
git clone [URL_DO_REPOSITORIO]
cd mundo-dos-bots
```

### 2. Instale as dependências do frontend
```bash
npm install
```

### 3. Instale as dependências do backend
```bash
cd backend
npm install
```

### 4. Configure o banco de dados
```bash
# Acesse o MySQL
mysql -u root -p

# Execute o schema
source database/schema.sql
```

### 5. Configure as variáveis de ambiente

**Frontend**: Crie um arquivo `.env` na raiz:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Backend**: Copie `backend/env.example` para `backend/.env` e configure:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=mundo_dos_bots
DB_PORT=3306
JWT_SECRET=sua_chave_secreta_muito_segura
JWT_EXPIRES_IN=24h
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### 6. Execute o projeto

**Backend** (em um terminal):
```bash
cd backend
npm run dev
```

**Frontend** (em outro terminal):
```bash
npm start
```

Acesse: http://localhost:3000

## 🏗️ Estrutura do Projeto

```
mundo-dos-bots/
├── src/                    # Frontend React
│   ├── components/         # Componentes reutilizáveis
│   ├── pages/              # Páginas do site
│   ├── contexts/           # Contextos React
│   ├── hooks/              # Custom hooks
│   ├── locales/           # Traduções
│   └── utils/             # Utilitários
├── backend/               # Backend Node.js
│   ├── routes/            # Rotas da API
│   ├── services/          # Serviços
│   ├── middleware/        # Middlewares
│   ├── config/            # Configurações
│   └── scripts/           # Scripts utilitários
├── database/              # Scripts SQL
│   ├── schema.sql         # Schema principal
│   └── schema_completo.sql
└── public/                # Arquivos estáticos
```

## 🔐 Credenciais Padrão

### Super Admin
- **Email**: `gfpandolfo@mundodosbots.com.br`
- **Senha**: `Hits#4546`

### Admin Padrão
- **Email**: `admin@mundodosbots.com.br`
- **Senha**: `admin123`

⚠️ **IMPORTANTE**: Altere as senhas padrão após o primeiro acesso!

## 📡 API Endpoints Principais

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `GET /api/auth/verify` - Verificar token
- `PUT /api/auth/change-password` - Alterar senha

### Blog
- `GET /api/blog` - Listar posts (público)
- `GET /api/blog/:id` - Obter post
- `POST /api/blog` - Criar post (admin)
- `PUT /api/blog/:id` - Atualizar post (admin)
- `DELETE /api/blog/:id` - Excluir post (admin)

### Usuários
- `GET /api/users` - Listar usuários (admin)
- `POST /api/users` - Criar usuário (admin)
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Desativar usuário (admin)

### Upload
- `POST /api/upload/image` - Upload de imagem
- `GET /api/upload/my-files` - Listar arquivos

## 🌐 Deploy

### Build de Produção

**Frontend**:
```bash
npm run build
```

**Backend**: Configure `backend/.env` com variáveis de produção:
```env
NODE_ENV=production
DB_HOST=seu_host_producao
CORS_ORIGIN=https://mundodosbots.com.br
```

### URLs de Produção
- **Site**: `https://mundodosbots.com.br/2025/`
- **Admin**: `https://mundodosbots.com.br/2025/admin/login`
- **API**: `https://mundodosbots.com.br/api/`

## 🔒 Segurança

- ✅ Senhas criptografadas com bcrypt
- ✅ Tokens JWT com expiração
- ✅ Rate limiting
- ✅ CORS configurado
- ✅ Validação de dados
- ✅ Headers de segurança (Helmet)
- ✅ Soft delete para usuários

## 📊 Banco de Dados

### Tabelas Principais
- `users` - Usuários do sistema
- `blog_posts` - Posts do blog
- `categories` - Categorias
- `solutions` - Soluções/serviços
- `site_settings` - Configurações
- `home_content` - Conteúdo da home
- `contacts` - Formulários de contato
- `job_applications` - Candidaturas
- `franchise_applications` - Interessados em franquia

## 🔧 Scripts Disponíveis

### Frontend
- `npm start` - Inicia desenvolvimento
- `npm run build` - Build de produção
- `npm test` - Executa testes

### Backend
- `npm start` - Inicia produção
- `npm run dev` - Inicia desenvolvimento (nodemon)
- `node scripts/create-admin.js` - Criar usuário admin
- `node scripts/check-admin-credentials.js` - Verificar credenciais

## 📱 Integrações

### Pabbly Connect
Automação de publicações em redes sociais (Facebook, Instagram, LinkedIn).

### EmailJS
Envio de emails via formulários de contato.

## 🎨 Personalização

### Cores Principais
As cores estão definidas em `src/index.css`:
- `--primary-color`: #035F36 (verde principal)
- `--secondary-color`: #ff6b35 (laranja)
- `--accent-color`: #00d4aa (verde água)

## 📞 Suporte

- **Email**: contato@mundodosbots.com.br
- **WhatsApp**: (66) 98444-3050

---

**Desenvolvido com ❤️ pela equipe Mundo dos Bots**
