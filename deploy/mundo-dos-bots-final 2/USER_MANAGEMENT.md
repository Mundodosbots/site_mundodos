# 👥 Sistema de Gerenciamento de Usuários

## 📋 Funcionalidades Implementadas

### 🔧 Backend (API)

#### **Rotas de Autenticação (`/api/auth`)**
- ✅ `POST /api/auth/login` - Login de usuários
- ✅ `POST /api/auth/register` - Registro público de usuários
- ✅ `GET /api/auth/verify` - Verificação de token
- ✅ `PUT /api/auth/change-password` - Alteração de senha

#### **Rotas de Gerenciamento (`/api/users`)**
- ✅ `GET /api/users` - Listar todos os usuários (apenas admin)
- ✅ `GET /api/users/:id` - Obter usuário por ID
- ✅ `POST /api/users` - Criar novo usuário (apenas admin)
- ✅ `PUT /api/users/:id` - Atualizar usuário
- ✅ `PUT /api/users/:id/password` - Alterar senha de usuário
- ✅ `DELETE /api/users/:id` - Desativar usuário (soft delete)
- ✅ `PUT /api/users/:id/activate` - Reativar usuário

### 🎨 Frontend

#### **Páginas**
- ✅ `/register` - Página de registro público
- ✅ `/admin/login` - Login administrativo (atualizado com API real)
- ✅ `/admin/dashboard` - Painel administrativo com gerenciamento de usuários

#### **Componentes**
- ✅ `UserManager` - Interface completa de gerenciamento de usuários
- ✅ `ProtectedRoute` - Proteção de rotas com validação de token
- ✅ `Register` - Formulário de registro público

## 🔐 Segurança Implementada

### **Validações**
- ✅ Validação de email único
- ✅ Senhas com mínimo 6 caracteres
- ✅ Criptografia de senhas com bcrypt (salt 12)
- ✅ Tokens JWT com expiração
- ✅ Middleware de autenticação
- ✅ Verificação de permissões (admin/editor)

### **Proteções**
- ✅ Rate limiting
- ✅ Validação de entrada com express-validator
- ✅ Sanitização de dados
- ✅ Soft delete para usuários
- ✅ Verificação de token em tempo real

## 📊 Estrutura do Banco de Dados

```sql
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
```

## 🚀 Como Usar

### **1. Registro Público**
- Acesse: `https://mundodosbots.com.br/register`
- Preencha: Nome, Email, Senha, Confirmar Senha
- Role padrão: `editor`
- Status padrão: `ativo`

### **2. Login Administrativo**
- Acesse: `https://mundodosbots.com.br/admin/login`
- Use as credenciais criadas pelo administrador do sistema

### **3. Gerenciamento de Usuários**
- Acesse o painel: `https://mundodosbots.com.br/admin/dashboard`
- Clique em "Usuários" no menu lateral
- Funcionalidades disponíveis:
  - ✅ Criar novo usuário
  - ✅ Editar usuário existente
  - ✅ Alterar senha
  - ✅ Ativar/Desativar usuário
  - ✅ Visualizar lista completa

## 🎯 Roles e Permissões

### **Admin**
- ✅ Acesso total ao painel administrativo
- ✅ Gerenciar todos os usuários
- ✅ Criar/editar/deletar usuários
- ✅ Alterar roles de usuários
- ✅ Acesso a todas as funcionalidades

### **Editor**
- ✅ Acesso ao painel administrativo
- ✅ Gerenciar conteúdo (blog, categorias, etc.)
- ❌ Não pode gerenciar usuários
- ❌ Não pode alterar configurações críticas

## 🔧 Configuração

### **Variáveis de Ambiente**
```env
# JWT
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
JWT_EXPIRES_IN=24h

# API URL (Frontend)
REACT_APP_API_URL=https://mundodosbots.com.br/api
```

### **Scripts Disponíveis**
```bash
# Criar usuário admin
cd backend
node scripts/create-admin.js

# Verificar credenciais admin
node scripts/check-admin-credentials.js
```

## 📱 Interface do Usuário

### **Página de Registro**
- 🎨 Design moderno e responsivo
- ✅ Validação em tempo real
- ✅ Feedback visual de erros/sucesso
- ✅ Toggle de visibilidade de senha
- ✅ Redirecionamento automático após sucesso

### **Gerenciador de Usuários**
- 📊 Tabela com todos os usuários
- 🔍 Filtros por status e role
- ✏️ Edição inline com modal
- 🗑️ Soft delete com confirmação
- 🔄 Reativação de usuários
- 📱 Interface responsiva

## 🧪 Testes

### **Endpoints para Testar**
```bash
# Registro
curl -X POST https://mundodosbots.com.br/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@exemplo.com","password":"123456"}'

# Login
curl -X POST https://mundodosbots.com.br/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"SEU_EMAIL","password":"SUA_SENHA"}'

# Listar usuários (com token)
curl -X GET https://mundodosbots.com.br/api/users \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🚨 Troubleshooting

### **Problemas Comuns**

1. **Erro 401 - Não autorizado**
   - Verifique se o token está sendo enviado
   - Confirme se o token não expirou
   - Verifique se o usuário está ativo

2. **Erro 403 - Acesso negado**
   - Confirme se o usuário tem role de admin
   - Verifique as permissões da rota

3. **Erro 400 - Email já existe**
   - Use um email diferente
   - Verifique se o usuário não está desativado

4. **Erro de conexão**
   - Verifique se o backend está rodando
   - Confirme a URL da API no frontend
   - Verifique as configurações de CORS

## 📈 Próximas Melhorias

- [ ] Sistema de recuperação de senha
- [ ] Autenticação de dois fatores (2FA)
- [ ] Logs de auditoria
- [ ] Filtros avançados no gerenciador
- [ ] Exportação de dados de usuários
- [ ] Notificações por email
- [ ] Sistema de convites

---

**✅ Sistema completo e funcional!** Todas as funcionalidades de gerenciamento de usuários foram implementadas com segurança e interface moderna.

