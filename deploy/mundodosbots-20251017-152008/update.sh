#!/bin/bash

# Script de atualização
set -e

echo "🔄 Atualizando Mundo dos Bots..."

# Fazer backup antes da atualização
./backup.sh

# Parar aplicação
pm2 stop mundodosbots-api

# Fazer backup dos arquivos atuais
sudo cp -r /var/www/mundodosbots/backend /var/www/mundodosbots/backend.backup.$(date +%Y%m%d_%H%M%S)

# Copiar novos arquivos
sudo cp -r backend/ /var/www/mundodosbots/
sudo cp -r frontend/ /var/www/mundodosbots/

# Instalar dependências
cd /var/www/mundodosbots/backend
sudo npm install --production

# Configurar permissões
sudo chown -R www-data:www-data /var/www/mundodosbots

# Reiniciar aplicação
pm2 start mundodosbots-api

echo "✅ Atualização concluída!"
