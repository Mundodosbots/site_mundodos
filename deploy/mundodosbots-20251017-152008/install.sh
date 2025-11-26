#!/bin/bash

# Script de instalação no servidor
set -e

echo "🚀 Instalando Mundo dos Bots..."

# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Instalar Nginx
sudo apt install nginx -y

# Instalar MySQL
sudo apt install mysql-server -y

# Criar diretórios
sudo mkdir -p /var/www/mundodosbots
sudo mkdir -p /var/log/mundodosbots
sudo mkdir -p /var/www/mundodosbots/uploads

# Copiar arquivos
sudo cp -r frontend/ /var/www/mundodosbots/
sudo cp -r backend/ /var/www/mundodosbots/

# Configurar permissões
sudo chown -R www-data:www-data /var/www/mundodosbots
sudo chmod -R 755 /var/www/mundodosbots

# Instalar dependências do backend
cd /var/www/mundodosbots/backend
sudo npm install --production

# Configurar banco de dados
echo "Configurando banco de dados..."
sudo mysql -e "CREATE DATABASE IF NOT EXISTS mundo_dos_bots;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'mundo_dos_bots_user'@'localhost' IDENTIFIED BY 'senha_segura_2025';"
sudo mysql -e "GRANT ALL PRIVILEGES ON mundo_dos_bots.* TO 'mundo_dos_bots_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Executar schema
sudo mysql mundo_dos_bots < schema_completo.sql

# Configurar Nginx
sudo cp nginx/mundodosbots.conf /etc/nginx/sites-available/
sudo ln -sf /etc/nginx/sites-available/mundodosbots.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Testar configuração Nginx
sudo nginx -t

# Iniciar serviços
sudo systemctl restart nginx
sudo systemctl enable nginx

# Iniciar aplicação com PM2
cd /var/www/mundodosbots/backend
pm2 start server.js --name "mundodosbots-api" --env production
pm2 save
pm2 startup

echo "✅ Instalação concluída!"
echo "🔧 Próximos passos:"
echo "1. Configurar SSL: sudo certbot --nginx -d mundodosbots.com.br"
echo "2. Verificar status: pm2 status"
echo "3. Ver logs: pm2 logs mundodosbots-api"
