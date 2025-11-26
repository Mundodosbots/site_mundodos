# 🚀 Deploy Mundo dos Bots - Com Reset de Senha
## Versão com Funcionalidade de Recuperação de Senha

---

## 📋 O QUE HÁ DE NOVO NESTA VERSÃO

### ✨ Novas Funcionalidades:
- ✅ **Reset de Senha** - Usuários podem recuperar suas senhas
- ✅ **Validação de Token** - Tokens seguros com expiração de 1 hora
- ✅ **Indicador de Força de Senha** - Visual feedback na criação de senha
- ✅ **Páginas Responsivas** - Design moderno e intuitivo

### 🔐 Segurança:
- ✅ Tokens criptográficos únicos
- ✅ Expiração automática de tokens
- ✅ Tokens de uso único
- ✅ Senhas com hash bcrypt

---

## 📦 CONTEÚDO DO PACOTE

```
mundo-dos-bots-reset-senha/
├── index.html                          # Frontend principal
├── manifest.json                       # PWA manifest
├── robots.txt                         # SEO
├── asset-manifest.json                # Assets do build
├── static/                            # CSS, JS e mídia
│   ├── css/
│   ├── js/
│   └── media/
├── api/                               # Backend Node.js
│   ├── server.js                      # Servidor principal
│   ├── routes/                        # Rotas da API
│   │   ├── auth.js                    # ⭐ ATUALIZADO - Com reset de senha
│   │   ├── users.js
│   │   ├── categories.js
│   │   ├── solutions.js
│   │   └── ...
│   ├── config/
│   ├── middleware/
│   ├── services/
│   └── package.json
├── schema.sql                         # Schema completo do banco
├── add_password_reset_table.sql       # ⭐ NOVO - Tabela de reset
├── nginx.conf                         # Configuração Nginx
└── README-DEPLOY.md                   # Este arquivo
```

---

## 🔧 INSTALAÇÃO PASSO A PASSO

### PASSO 1: Preparar o Servidor

```bash
# Conectar ao servidor via SSH
ssh usuario@mundodosbots.com.br

# Criar diretório do projeto
sudo mkdir -p /var/www/mundodosbots
cd /var/www/mundodosbots
```

### PASSO 2: Upload dos Arquivos

**Opção A - Via FTP/SFTP:**
1. Use FileZilla, WinSCP ou outro cliente FTP
2. Conecte em: `mundodosbots.com.br`
3. Faça upload de todos os arquivos para `/var/www/mundodosbots`

**Opção B - Via SCP (do seu computador local):**
```bash
scp -r mundo-dos-bots-reset-senha/* usuario@mundodosbots.com.br:/var/www/mundodosbots/
```

### PASSO 3: Configurar o Banco de Dados

```bash
# Conectar ao MySQL
mysql -u root -p

# Criar banco (se ainda não existir)
CREATE DATABASE IF NOT EXISTS mundo_dos_bots;
USE mundo_dos_bots;

# Importar schema completo (se for instalação nova)
SOURCE /var/www/mundodosbots/schema.sql;

# ⭐ IMPORTANTE: Adicionar tabela de reset de senha
SOURCE /var/www/mundodosbots/add_password_reset_table.sql;

# Verificar se a tabela foi criada
SHOW TABLES;
DESCRIBE password_reset_tokens;

# Sair do MySQL
EXIT;
```

### PASSO 4: Configurar o Backend

```bash
# Navegar para o diretório da API
cd /var/www/mundodosbots/api

# Instalar dependências
npm install --production

# Configurar variáveis de ambiente
cp env.example .env
nano .env
```

**Editar o arquivo `.env` com suas configurações:**

```env
# Servidor
PORT=5000
NODE_ENV=production

# Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=mundo_dos_bots
DB_PORT=3306

# JWT
JWT_SECRET=gere_uma_chave_secreta_forte_aqui_123456
JWT_EXPIRES_IN=24h

# Frontend URL (para envio de emails no futuro)
FRONTEND_URL=https://mundodosbots.com.br

# Email (opcional - para produção futura)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=seu-email@gmail.com
# SMTP_PASS=sua-senha-app
```

### PASSO 5: Configurar PM2 (Gerenciador de Processos)

```bash
# Instalar PM2 globalmente
sudo npm install -g pm2

# Iniciar a aplicação
pm2 start server.js --name "mundodosbots-api"

# Configurar para iniciar no boot
pm2 startup
pm2 save

# Verificar status
pm2 status
pm2 logs mundodosbots-api
```

### PASSO 6: Configurar Nginx

```bash
# Copiar configuração do Nginx
sudo cp /var/www/mundodosbots/nginx.conf /etc/nginx/sites-available/mundodosbots

# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/mundodosbots /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

### PASSO 7: Configurar SSL (HTTPS)

```bash
# Instalar Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obter certificado SSL
sudo certbot --nginx -d mundodosbots.com.br -d www.mundodosbots.com.br

# Renovação automática (já configurado automaticamente)
sudo certbot renew --dry-run
```

---

## 🧪 TESTAR A INSTALAÇÃO

### 1. Testar o Frontend
```bash
# Abrir no navegador
https://mundodosbots.com.br
```

### 2. Testar o Backend
```bash
# Verificar se a API está respondendo
curl https://mundodosbots.com.br/api/health

# Ou no navegador
https://mundodosbots.com.br/api/health
```

### 3. Testar Reset de Senha

1. Acesse: `https://mundodosbots.com.br/admin/login`
2. Clique em "Esqueceu sua senha?"
3. Digite um email cadastrado
4. Verifique se recebe a mensagem de sucesso
5. Em ambiente de desenvolvimento, o token aparecerá na tela
6. Acesse o link de reset e defina uma nova senha
7. Faça login com a nova senha

---

## 📊 MONITORAMENTO

### Verificar Logs da API
```bash
# Ver logs em tempo real
pm2 logs mundodosbots-api

# Ver logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Verificar Status
```bash
# Status do PM2
pm2 status

# Status do Nginx
sudo systemctl status nginx

# Status do MySQL
sudo systemctl status mysql
```

---

## 🔄 ATUALIZAÇÃO FUTURA

Para atualizar o site no futuro:

```bash
# 1. Fazer backup do banco de dados
mysqldump -u root -p mundo_dos_bots > backup_$(date +%Y%m%d).sql

# 2. Parar a aplicação
pm2 stop mundodosbots-api

# 3. Fazer backup dos arquivos atuais
cp -r /var/www/mundodosbots /var/www/mundodosbots_backup_$(date +%Y%m%d)

# 4. Substituir os arquivos novos

# 5. Atualizar dependências
cd /var/www/mundodosbots/api
npm install --production

# 6. Executar migrações SQL (se houver)

# 7. Reiniciar aplicação
pm2 restart mundodosbots-api

# 8. Limpar cache do Nginx
sudo systemctl reload nginx
```

---

## 🛡️ SEGURANÇA

### Firewall
```bash
# Permitir apenas portas necessárias
sudo ufw allow 22     # SSH
sudo ufw allow 80     # HTTP
sudo ufw allow 443    # HTTPS
sudo ufw enable
```

### Backup Automático
```bash
# Criar script de backup
sudo nano /usr/local/bin/backup-mundodosbots.sh
```

```bash
#!/bin/bash
# Backup diário do banco de dados
BACKUP_DIR="/var/backups/mundodosbots"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup do banco
mysqldump -u root -p'SUA_SENHA' mundo_dos_bots > $BACKUP_DIR/db_$DATE.sql

# Manter apenas últimos 7 dias
find $BACKUP_DIR -type f -mtime +7 -delete

echo "Backup concluído: $DATE"
```

```bash
# Tornar executável
sudo chmod +x /usr/local/bin/backup-mundodosbots.sh

# Agendar no cron (diário às 2h)
sudo crontab -e
# Adicionar: 0 2 * * * /usr/local/bin/backup-mundodosbots.sh
```

---

## 📧 INTEGRAÇÃO COM EMAIL (OPCIONAL - PRODUÇÃO)

Para enviar emails de reset de senha:

### 1. Instalar nodemailer
```bash
cd /var/www/mundodosbots/api
npm install nodemailer
```

### 2. Configurar no .env
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contato@mundodosbots.com.br
SMTP_PASS=sua-senha-de-app
```

### 3. Atualizar o código
No arquivo `api/routes/auth.js`, substitua o comentário de produção pelo código de envio de email.

---

## 🆘 TROUBLESHOOTING

### Erro 502 Bad Gateway
```bash
# Verificar se a API está rodando
pm2 status
pm2 restart mundodosbots-api
```

### Erro de Conexão com Banco de Dados
```bash
# Verificar se MySQL está rodando
sudo systemctl status mysql
sudo systemctl restart mysql

# Verificar credenciais no .env
nano /var/www/mundodosbots/api/.env
```

### Reset de senha não funciona
```bash
# Verificar se a tabela foi criada
mysql -u root -p
USE mundo_dos_bots;
SHOW TABLES;
DESCRIBE password_reset_tokens;

# Se não existir, criar manualmente
SOURCE /var/www/mundodosbots/add_password_reset_table.sql;
```

### Permissões de Arquivo
```bash
# Ajustar permissões
sudo chown -R www-data:www-data /var/www/mundodosbots
sudo chmod -R 755 /var/www/mundodosbots
```

---

## ✅ CHECKLIST FINAL

- [ ] Banco de dados criado e populado
- [ ] Tabela `password_reset_tokens` criada
- [ ] Backend rodando (PM2)
- [ ] Nginx configurado
- [ ] SSL/HTTPS ativo
- [ ] Frontend acessível
- [ ] Login funcionando
- [ ] Reset de senha funcionando
- [ ] Backup configurado
- [ ] Logs sendo gravados
- [ ] Firewall configurado

---

## 📞 SUPORTE

Para problemas técnicos:
- Verificar logs: `pm2 logs mundodosbots-api`
- Verificar status: `pm2 status`
- Reiniciar serviços: `pm2 restart mundodosbots-api && sudo systemctl restart nginx`

---

## 📝 INFORMAÇÕES IMPORTANTES

### Credenciais Padrão (MUDAR APÓS PRIMEIRO LOGIN)
- **Email:** admin@mundodosbots.com.br
- **Senha:** admin123

### Portas Usadas
- **Frontend:** 80 (HTTP) / 443 (HTTPS)
- **Backend API:** 5000
- **MySQL:** 3306

### Arquivos Importantes
- Configuração: `/var/www/mundodosbots/api/.env`
- Logs API: `~/.pm2/logs/`
- Logs Nginx: `/var/log/nginx/`
- Backups: `/var/backups/mundodosbots/`

---

**Deploy preparado em:** $(date)
**Versão:** 2.0 (Com Reset de Senha)
**Mundo dos Bots** - Transformando comunicação com IA 🤖


