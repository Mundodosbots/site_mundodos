# 🚀 Deploy - Mundo dos Bots

## 📋 Instruções de Deploy

### 1. Upload dos Arquivos
```bash
# Fazer upload da pasta para o servidor
scp -r mundodosbots-YYYYMMDD-HHMMSS/ user@mundodosbots.com.br:/tmp/
```

### 2. Instalação no Servidor
```bash
# Conectar ao servidor
ssh user@mundodosbots.com.br

# Ir para o diretório
cd /tmp/mundodosbots-YYYYMMDD-HHMMSS/

# Executar instalação
sudo ./install.sh
```

### 3. Configurar SSL
```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obter certificado SSL
sudo certbot --nginx -d mundodosbots.com.br -d www.mundodosbots.com.br
```

### 4. Verificar Deploy
```bash
# Status da aplicação
pm2 status

# Logs
pm2 logs mundodosbots-api

# Status Nginx
sudo systemctl status nginx

# Testar site
curl -I https://mundodosbots.com.br
```

## 🔧 Configurações

### Banco de Dados
- **Host:** localhost
- **Database:** mundo_dos_bots
- **User:** mundo_dos_bots_user
- **Password:** senha_segura_2025

### Aplicação
- **Porta:** 5000
- **PM2:** mundodosbots-api
- **Logs:** /var/log/mundodosbots/

### Nginx
- **Config:** /etc/nginx/sites-available/mundodosbots.conf
- **SSL:** Let's Encrypt

## 🚨 Troubleshooting

### Problemas Comuns
1. **502 Bad Gateway**: `pm2 restart mundodosbots-api`
2. **Permissões**: `sudo chown -R www-data:www-data /var/www/mundodosbots`
3. **Banco**: Verificar credenciais em `.env.production`
4. **SSL**: `sudo certbot renew --dry-run`

### Logs Importantes
- **PM2:** `pm2 logs`
- **Nginx:** `/var/log/nginx/error.log`
- **App:** `/var/log/mundodosbots/server.log`
