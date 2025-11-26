#!/bin/bash

# ============================================
# Script de Instalação Automática
# Mundo dos Bots - Deploy com Reset de Senha
# ============================================

set -e  # Sair em caso de erro

echo "============================================"
echo "🚀 Mundo dos Bots - Instalação Automática"
echo "============================================"
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para imprimir mensagens
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ️  $1${NC}"
}

# Verificar se está rodando como root
if [[ $EUID -ne 0 ]]; then
   print_error "Este script deve ser executado como root (use sudo)"
   exit 1
fi

print_info "Iniciando instalação..."
echo ""

# 1. Verificar dependências
print_info "Verificando dependências..."

if ! command -v node &> /dev/null; then
    print_error "Node.js não está instalado. Instale Node.js 18+ primeiro."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "NPM não está instalado. Instale Node.js 18+ primeiro."
    exit 1
fi

if ! command -v nginx &> /dev/null; then
    print_error "Nginx não está instalado. Instalando..."
    apt-get update
    apt-get install -y nginx
fi

if ! command -v mysql &> /dev/null; then
    print_error "MySQL não está instalado. Instale MySQL primeiro."
    exit 1
fi

print_success "Todas as dependências estão instaladas"
echo ""

# 2. Configurar diretório
print_info "Configurando diretórios..."
INSTALL_DIR="/var/www/mundodosbots"

if [ -d "$INSTALL_DIR" ]; then
    print_info "Fazendo backup do diretório existente..."
    BACKUP_DIR="/var/www/mundodosbots_backup_$(date +%Y%m%d_%H%M%S)"
    mv "$INSTALL_DIR" "$BACKUP_DIR"
    print_success "Backup criado em: $BACKUP_DIR"
fi

mkdir -p "$INSTALL_DIR"
print_success "Diretório criado: $INSTALL_DIR"
echo ""

# 3. Copiar arquivos
print_info "Copiando arquivos..."
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cp -r "$SCRIPT_DIR"/* "$INSTALL_DIR/"
print_success "Arquivos copiados"
echo ""

# 4. Configurar banco de dados
print_info "Configurando banco de dados..."
echo "Digite a senha do root do MySQL:"
read -s MYSQL_ROOT_PASSWORD

# Criar banco e importar schema
mysql -u root -p"$MYSQL_ROOT_PASSWORD" <<EOF
CREATE DATABASE IF NOT EXISTS mundo_dos_bots;
USE mundo_dos_bots;
SOURCE $INSTALL_DIR/schema.sql;
SOURCE $INSTALL_DIR/add_password_reset_table.sql;
EOF

if [ $? -eq 0 ]; then
    print_success "Banco de dados configurado"
else
    print_error "Erro ao configurar banco de dados"
    exit 1
fi
echo ""

# 5. Configurar backend
print_info "Configurando backend..."
cd "$INSTALL_DIR/api"

# Instalar dependências
npm install --production
print_success "Dependências instaladas"

# Criar arquivo .env
if [ ! -f ".env" ]; then
    cp env.example .env
    
    # Gerar JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    
    # Atualizar .env
    sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env
    sed -i "s/DB_PASSWORD=.*/DB_PASSWORD=$MYSQL_ROOT_PASSWORD/" .env
    sed -i "s/NODE_ENV=.*/NODE_ENV=production/" .env
    
    print_success "Arquivo .env criado"
fi
echo ""

# 6. Configurar PM2
print_info "Configurando PM2..."
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
    print_success "PM2 instalado"
fi

# Parar processo anterior se existir
pm2 stop mundodosbots-api 2>/dev/null || true
pm2 delete mundodosbots-api 2>/dev/null || true

# Iniciar aplicação
pm2 start server.js --name mundodosbots-api
pm2 save
pm2 startup | tail -n 1 | bash

print_success "Backend configurado e rodando"
echo ""

# 7. Configurar Nginx
print_info "Configurando Nginx..."

# Remover configuração antiga se existir
rm -f /etc/nginx/sites-enabled/mundodosbots
rm -f /etc/nginx/sites-available/mundodosbots

# Copiar nova configuração
cp "$INSTALL_DIR/nginx.conf" /etc/nginx/sites-available/mundodosbots
ln -s /etc/nginx/sites-available/mundodosbots /etc/nginx/sites-enabled/

# Testar configuração
if nginx -t; then
    systemctl restart nginx
    print_success "Nginx configurado"
else
    print_error "Erro na configuração do Nginx"
    exit 1
fi
echo ""

# 8. Configurar permissões
print_info "Configurando permissões..."
chown -R www-data:www-data "$INSTALL_DIR"
chmod -R 755 "$INSTALL_DIR"
chmod -R 775 "$INSTALL_DIR/api/uploads"
print_success "Permissões configuradas"
echo ""

# 9. Configurar SSL (opcional)
print_info "Deseja configurar SSL/HTTPS com Let's Encrypt? (s/n)"
read -r CONFIGURE_SSL

if [[ "$CONFIGURE_SSL" == "s" || "$CONFIGURE_SSL" == "S" ]]; then
    if ! command -v certbot &> /dev/null; then
        apt-get update
        apt-get install -y certbot python3-certbot-nginx
    fi
    
    echo "Digite seu email para o certificado SSL:"
    read -r SSL_EMAIL
    
    certbot --nginx -d mundodosbots.com.br -d www.mundodosbots.com.br --email "$SSL_EMAIL" --agree-tos --non-interactive
    
    if [ $? -eq 0 ]; then
        print_success "SSL configurado com sucesso"
    else
        print_error "Erro ao configurar SSL (você pode configurar manualmente depois)"
    fi
fi
echo ""

# 10. Configurar Firewall
print_info "Configurando firewall..."
if command -v ufw &> /dev/null; then
    ufw allow 22/tcp
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw --force enable
    print_success "Firewall configurado"
fi
echo ""

# 11. Verificar instalação
print_info "Verificando instalação..."

# Verificar se o backend está rodando
if pm2 list | grep -q mundodosbots-api; then
    print_success "Backend está rodando"
else
    print_error "Backend não está rodando"
fi

# Verificar se o Nginx está rodando
if systemctl is-active --quiet nginx; then
    print_success "Nginx está rodando"
else
    print_error "Nginx não está rodando"
fi

echo ""
echo "============================================"
echo "✅ INSTALAÇÃO CONCLUÍDA!"
echo "============================================"
echo ""
print_success "Frontend: https://mundodosbots.com.br"
print_success "Backend: https://mundodosbots.com.br/api"
print_success "Admin: https://mundodosbots.com.br/admin/login"
echo ""
print_info "Credenciais padrão do admin:"
echo "  Email: admin@mundodosbots.com.br"
echo "  Senha: admin123"
echo ""
print_info "⚠️  IMPORTANTE: Altere a senha padrão após o primeiro login!"
echo ""
print_info "Para monitorar a aplicação:"
echo "  pm2 status"
echo "  pm2 logs mundodosbots-api"
echo "  pm2 monit"
echo ""
print_info "Para verificar logs do Nginx:"
echo "  tail -f /var/log/nginx/mundodosbots_access.log"
echo "  tail -f /var/log/nginx/mundodosbots_error.log"
echo ""
print_success "Deploy concluído com sucesso! 🎉"
echo ""


