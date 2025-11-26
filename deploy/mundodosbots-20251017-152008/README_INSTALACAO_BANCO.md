# 📊 Instalação do Banco de Dados - Mundo dos Bots

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Pré-requisitos](#pré-requisitos)
- [Instalação Completa](#instalação-completa)
- [Estrutura do Banco](#estrutura-do-banco)
- [Credenciais Padrão](#credenciais-padrão)
- [Verificação da Instalação](#verificação-da-instalação)
- [Manutenção](#manutenção)

## 🎯 Visão Geral

Este documento descreve como instalar e configurar o banco de dados MySQL completo para a aplicação Mundo dos Bots. O script `schema_completo.sql` contém:

- ✅ Criação do database
- ✅ 16 tabelas principais
- ✅ Todas as relações (Foreign Keys)
- ✅ Dados iniciais (usuário admin, categorias, configurações, etc)
- ✅ Índices para performance
- ✅ Views para relatórios
- ✅ Stored Procedures
- ✅ Triggers de automação
- ✅ Eventos agendados

## 🔧 Pré-requisitos

### 1. MySQL Instalado
Versão mínima: MySQL 5.7 ou superior (recomendado MySQL 8.0+)

**Verificar versão:**
```bash
mysql --version
```

### 2. Acesso Root ou Usuário com Privilégios
Você precisará de um usuário MySQL com permissões para:
- Criar databases
- Criar tabelas
- Criar triggers, procedures e events
- Inserir dados

### 3. Cliente MySQL
- **MySQL Command Line Client** (vem com MySQL)
- **MySQL Workbench** (interface gráfica)
- **phpMyAdmin** (se estiver usando)
- **DBeaver** ou outro cliente SQL

## 🚀 Instalação Completa

### Método 1: Via Terminal (Recomendado)

#### Passo 1: Acessar o MySQL
```bash
mysql -u root -p
```
Digite a senha do root quando solicitado.

#### Passo 2: Executar o Script Completo
Dentro do MySQL:
```sql
source /caminho/completo/para/schema_completo.sql;
```

**Exemplo macOS:**
```sql
source /Users/gfpandolfo/Pictures/Cursor_projetos/Site\ Mundo\ dos\ Bots/database/schema_completo.sql;
```

**Exemplo Linux:**
```sql
source /var/www/mundodosbots/database/schema_completo.sql;
```

**Exemplo Windows:**
```sql
source C:/xampp/htdocs/mundodosbots/database/schema_completo.sql;
```

#### Passo 3: Verificar a Instalação
```sql
USE mundo_dos_bots;
SHOW TABLES;
```

Você deve ver 16 tabelas listadas.

### Método 2: Via Linha de Comando Única

Execute diretamente do terminal sem entrar no MySQL:

**macOS/Linux:**
```bash
cd /Users/gfpandolfo/Pictures/Cursor_projetos/Site\ Mundo\ dos\ Bots/database/
mysql -u root -p < schema_completo.sql
```

**Windows:**
```cmd
cd C:\xampp\htdocs\mundodosbots\database\
mysql -u root -p < schema_completo.sql
```

### Método 3: Via MySQL Workbench

1. Abra o MySQL Workbench
2. Conecte ao servidor MySQL
3. Menu: **File > Open SQL Script**
4. Selecione o arquivo `schema_completo.sql`
5. Clique no ícone do raio ⚡ para executar
6. Aguarde a conclusão (aparecerá mensagens de sucesso)

### Método 4: Via phpMyAdmin

1. Acesse o phpMyAdmin
2. Clique em **Importar** no menu superior
3. Escolha o arquivo `schema_completo.sql`
4. Clique em **Executar**
5. Aguarde a confirmação de sucesso

## 🗄️ Estrutura do Banco

### Tabelas Principais

| Tabela | Descrição | Registros Iniciais |
|--------|-----------|-------------------|
| `users` | Usuários administrativos | 1 admin |
| `password_reset_tokens` | Tokens de recuperação de senha | 0 |
| `categories` | Categorias do blog | 5 categorias |
| `blog_posts` | Posts e artigos | 0 |
| `site_settings` | Configurações gerais | 24 configs |
| `home_content` | Conteúdo da página inicial | 6 seções |
| `services` | Serviços oferecidos | 5 serviços |
| `solutions_by_objective` | Soluções por objetivo | 4 soluções |
| `solutions_by_sector` | Soluções por setor | 6 setores |
| `solutions_by_product` | Soluções por produto | 5 produtos |
| `contacts` | Formulários de contato | 0 |
| `job_applications` | Candidaturas de emprego | 0 |
| `franchise_applications` | Leads de franquia | 0 |
| `uploaded_files` | Arquivos enviados | 0 |

### Views Criadas

- `vw_published_posts` - Posts publicados com autor e categoria
- `vw_blog_stats` - Estatísticas do blog
- `vw_pending_contacts` - Contatos pendentes

### Stored Procedures

- `sp_publish_scheduled_posts()` - Publica posts agendados
- `sp_cleanup_expired_tokens()` - Remove tokens expirados
- `sp_get_monthly_stats(month, year)` - Estatísticas mensais

### Eventos Agendados

- `evt_publish_scheduled_posts` - Executa a cada 5 minutos
- `evt_cleanup_expired_tokens` - Executa diariamente às 3h

## 🔐 Credenciais Padrão

### Usuário Administrador

**⚠️ IMPORTANTE: Altere estas credenciais após o primeiro acesso!**

```
Email: admin@mundodosbots.com.br
Senha: admin123
```

### Como Alterar a Senha do Admin

```sql
USE mundo_dos_bots;

-- Gerar nova senha (exemplo: "NovaSenhaSegura123!")
-- Use um gerador bcrypt online ou na aplicação
UPDATE users 
SET password = '$2b$10$HASH_GERADO_AQUI'
WHERE email = 'admin@mundodosbots.com.br';
```

## ✅ Verificação da Instalação

### 1. Verificar Database
```sql
SHOW DATABASES LIKE 'mundo_dos_bots';
```

### 2. Verificar Tabelas
```sql
USE mundo_dos_bots;
SHOW TABLES;
```
Deve retornar 16 tabelas.

### 3. Verificar Usuário Admin
```sql
SELECT id, name, email, role FROM users WHERE role = 'admin';
```

### 4. Verificar Dados Iniciais
```sql
-- Verificar categorias
SELECT COUNT(*) as total_categorias FROM categories;
-- Deve retornar: 5

-- Verificar configurações
SELECT COUNT(*) as total_configs FROM site_settings;
-- Deve retornar: 24

-- Verificar serviços
SELECT COUNT(*) as total_servicos FROM services;
-- Deve retornar: 5

-- Verificar soluções por objetivo
SELECT COUNT(*) as total FROM solutions_by_objective;
-- Deve retornar: 4

-- Verificar soluções por setor
SELECT COUNT(*) as total FROM solutions_by_sector;
-- Deve retornar: 6

-- Verificar soluções por produto
SELECT COUNT(*) as total FROM solutions_by_product;
-- Deve retornar: 5
```

### 5. Verificar Índices
```sql
SHOW INDEX FROM blog_posts;
SHOW INDEX FROM users;
```

### 6. Verificar Events Scheduler
```sql
SHOW EVENTS FROM mundo_dos_bots;
```
Deve mostrar 2 eventos ativos.

### 7. Verificar Procedures
```sql
SHOW PROCEDURE STATUS WHERE Db = 'mundo_dos_bots';
```
Deve mostrar 3 procedures.

## 🔧 Configuração do Backend

Após instalar o banco, configure o arquivo `.env` do backend:

```env
# Configurações do Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=mundo_dos_bots

# Outras configurações...
```

### Teste de Conexão

Execute no terminal do backend:
```bash
cd backend
node -e "require('./config/database').testConnection()"
```

Deve retornar: `✅ Conexão com MySQL estabelecida com sucesso!`

## 🛠️ Manutenção

### Backup do Banco de Dados

**Backup Completo:**
```bash
mysqldump -u root -p mundo_dos_bots > backup_$(date +%Y%m%d_%H%M%S).sql
```

**Backup Apenas da Estrutura:**
```bash
mysqldump -u root -p --no-data mundo_dos_bots > backup_structure.sql
```

**Backup Apenas dos Dados:**
```bash
mysqldump -u root -p --no-create-info mundo_dos_bots > backup_data.sql
```

### Restaurar Backup

```bash
mysql -u root -p mundo_dos_bots < backup_20250117_143000.sql
```

### Limpar e Reinstalar

**⚠️ CUIDADO: Isto apagará TODOS os dados!**

```sql
-- Apagar o database
DROP DATABASE IF EXISTS mundo_dos_bots;

-- Reinstalar executando o script novamente
source /caminho/para/schema_completo.sql;
```

### Verificar Tamanho do Banco

```sql
SELECT 
    table_schema AS "Database",
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS "Size (MB)"
FROM information_schema.tables
WHERE table_schema = 'mundo_dos_bots'
GROUP BY table_schema;
```

### Otimizar Tabelas

Execute periodicamente para manter a performance:

```sql
USE mundo_dos_bots;

OPTIMIZE TABLE blog_posts;
OPTIMIZE TABLE contacts;
OPTIMIZE TABLE users;
-- Repita para outras tabelas conforme necessário
```

### Verificar Eventos Agendados

```sql
-- Ver se o scheduler está ativo
SHOW VARIABLES LIKE 'event_scheduler';

-- Ativar se estiver OFF
SET GLOBAL event_scheduler = ON;

-- Ver eventos
SHOW EVENTS FROM mundo_dos_bots;
```

## 🐛 Solução de Problemas

### Erro: "Access denied for user"

**Solução:** Verifique suas credenciais MySQL
```bash
mysql -u root -p
# Digite a senha correta
```

### Erro: "Database already exists"

**Solução:** O banco já existe. Para reinstalar:
```sql
DROP DATABASE mundo_dos_bots;
source /caminho/para/schema_completo.sql;
```

### Erro: "Event scheduler is not enabled"

**Solução:** Ativar o scheduler
```sql
SET GLOBAL event_scheduler = ON;
```

Para ativar permanentemente, edite o arquivo `my.cnf` ou `my.ini`:
```ini
[mysqld]
event_scheduler=ON
```

### Erro: "SQLSTATE[HY000] [2002] Connection refused"

**Soluções possíveis:**
1. Verificar se o MySQL está rodando:
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mysql
   
   # Windows (Services.msc)
   ```

2. Verificar o host e porta no `.env`
3. Verificar firewall

### Erro: "Table doesn't exist" após instalação

**Solução:** Reinstalar o banco completamente
```sql
DROP DATABASE IF EXISTS mundo_dos_bots;
source /caminho/completo/schema_completo.sql;
```

## 📚 Consultas Úteis

### Ver Todas as Configurações do Site
```sql
SELECT * FROM site_settings ORDER BY setting_key;
```

### Ver Posts Publicados
```sql
SELECT * FROM vw_published_posts LIMIT 10;
```

### Estatísticas do Blog
```sql
SELECT * FROM vw_blog_stats;
```

### Contatos Pendentes
```sql
SELECT * FROM vw_pending_contacts;
```

### Publicar Posts Agendados Manualmente
```sql
CALL sp_publish_scheduled_posts();
```

### Limpar Tokens Expirados Manualmente
```sql
CALL sp_cleanup_expired_tokens();
```

### Estatísticas do Mês Atual
```sql
CALL sp_get_monthly_stats(MONTH(NOW()), YEAR(NOW()));
```

## 🎓 Próximos Passos

1. ✅ Instalar o banco de dados usando este guia
2. ✅ Configurar o arquivo `.env` do backend
3. ✅ Testar a conexão
4. ✅ Fazer login no painel admin
5. ✅ **ALTERAR A SENHA PADRÃO!**
6. ✅ Configurar as configurações do site
7. ✅ Começar a usar o sistema

## 📞 Suporte

Se encontrar problemas:
1. Verifique a seção [Solução de Problemas](#-solução-de-problemas)
2. Revise os logs de erro do MySQL
3. Verifique se todas as dependências estão instaladas
4. Confirme as permissões do usuário MySQL

---

**Arquivo de Schema:** `schema_completo.sql`  
**Última Atualização:** Janeiro 2025  
**Versão:** 1.0.0

