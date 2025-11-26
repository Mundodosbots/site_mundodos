# 🚀 Backend API - Mundo dos Bots

Backend completo em Node.js/Express com MySQL para o site Mundo dos Bots.

## 📋 Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **MySQL** (versão 8.0 ou superior)
- **npm** ou **yarn**

## 🗄️ Configuração do Banco de Dados

### 1. Instalar MySQL
```bash
# macOS (com Homebrew)
brew install mysql

# Ubuntu/Debian
sudo apt-get install mysql-server

# Windows
# Baixar do site oficial: https://dev.mysql.com/downloads/mysql/
```

### 2. Iniciar MySQL
```bash
# macOS
brew services start mysql

# Ubuntu/Debian
sudo systemctl start mysql

# Windows
# Iniciar pelo serviço do Windows
```

### 3. Criar Banco de Dados
```bash
# Acessar MySQL
mysql -u root -p

# Executar o schema
source database/schema.sql
```

## ⚙️ Configuração do Projeto

### 1. Instalar Dependências
```bash
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente
```bash
# Copiar arquivo de exemplo
cp env.example .env

# Editar com suas configurações
nano .env
```

### 3. Configurações do .env
```env
# Configurações do Banco de Dados MySQL
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=mundo_dos_bots
DB_PORT=3306

# Configurações do JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
JWT_EXPIRES_IN=24h

# Configurações do Servidor
PORT=5000
NODE_ENV=development

# Configurações de Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# Configurações de Segurança
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

## 🚀 Executar o Projeto

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## 📊 Estrutura do Banco de Dados

### Tabelas Principais

#### 👥 **users**
- Usuários administrativos
- Autenticação e autorização

#### 📂 **categories**
- Categorias do blog
- Organização de conteúdo

#### 📝 **blog_posts**
- Posts do blog
- Conteúdo principal do site

#### ⚙️ **site_settings**
- Configurações do site
- Dados dinâmicos

#### 🏠 **home_content**
- Conteúdo da página inicial
- Seções editáveis

#### 🛠️ **services**
- Serviços oferecidos
- Catálogo de produtos

#### 📞 **contacts**
- Formulários de contato
- Leads e mensagens

#### 💼 **job_applications**
- Candidatos (Trabalhe Conosco)
- Processo seletivo

#### 🏪 **franchise_applications**
- Interessados em franquia
- Qualificação de leads

#### 📁 **uploaded_files**
- Arquivos enviados
- Gerenciamento de mídia

## 🔐 Autenticação

### Usuário Padrão
- **Email:** admin@mundodosbots.com.br
- **Senha:** admin123

### Endpoints de Autenticação

#### POST `/api/auth/login`
```json
{
  "email": "admin@mundodosbots.com.br",
  "password": "admin123"
}
```

#### GET `/api/auth/verify`
- Verificar token válido
- Header: `Authorization: Bearer <token>`

#### POST `/api/auth/logout`
- Logout (remove token)

#### PUT `/api/auth/change-password`
- Alterar senha
- Header: `Authorization: Bearer <token>`

## 📂 Upload de Arquivos

### POST `/api/upload/image`
- Upload de imagens
- FormData com campo `image`
- Header: `Authorization: Bearer <token>`

### GET `/api/upload/my-files`
- Listar arquivos do usuário
- Paginação: `?page=1&limit=20`

### DELETE `/api/upload/:id`
- Excluir arquivo
- Header: `Authorization: Bearer <token>`

## 🏷️ Categorias

### GET `/api/categories`
- Listar categorias (público)

### GET `/api/categories/admin`
- Listar todas as categorias (admin)
- Header: `Authorization: Bearer <token>`

### POST `/api/categories`
- Criar nova categoria
- Header: `Authorization: Bearer <token>`

### PUT `/api/categories/:id`
- Atualizar categoria
- Header: `Authorization: Bearer <token>`

### DELETE `/api/categories/:id`
- Excluir categoria (soft delete)
- Header: `Authorization: Bearer <token>`

## 🔒 Segurança

### Middlewares Implementados
- **Helmet:** Headers de segurança
- **CORS:** Controle de origem
- **Rate Limiting:** Limite de requisições
- **JWT:** Autenticação por token
- **bcrypt:** Criptografia de senhas
- **Validation:** Validação de dados

### Configurações de Segurança
- Senhas criptografadas com bcrypt
- Tokens JWT com expiração
- Rate limiting por IP
- Headers de segurança
- Validação de entrada
- Sanitização de dados

## 📈 Monitoramento

### Health Check
```bash
GET /health
```

### Logs
- **Desenvolvimento:** Morgan dev
- **Produção:** Morgan combined
- **Erros:** Console + arquivo

## 🚀 Deploy

### Variáveis de Produção
```env
NODE_ENV=production
DB_HOST=seu_host_producao
DB_USER=seu_usuario_producao
DB_PASSWORD=sua_senha_producao
JWT_SECRET=chave_super_secreta_producao
CORS_ORIGIN=https://mundodosbots.com.br
```

### Process Manager (PM2)
```bash
npm install -g pm2
pm2 start server.js --name "mundo-dos-bots-api"
pm2 save
pm2 startup
```

## 🧪 Testes

```bash
npm test
```

## 📝 Scripts Disponíveis

- `npm start` - Iniciar em produção
- `npm run dev` - Iniciar em desenvolvimento
- `npm test` - Executar testes

## 🔧 Comandos Úteis

### Resetar Banco
```bash
mysql -u root -p mundo_dos_bots < database/schema.sql
```

### Backup do Banco
```bash
mysqldump -u root -p mundo_dos_bots > backup.sql
```

### Restaurar Backup
```bash
mysql -u root -p mundo_dos_bots < backup.sql
```

## 📞 Suporte

Para dúvidas ou problemas:
- **Email:** contato@mundodosbots.com.br
- **WhatsApp:** (66) 98444-3050

---

**Desenvolvido com ❤️ pela Mundo dos Bots**
