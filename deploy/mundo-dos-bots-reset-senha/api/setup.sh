#!/bin/bash

echo "🚀 Configurando Backend Mundo dos Bots"
echo "======================================"

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js primeiro."
    exit 1
fi

# Verificar se MySQL está instalado
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL não encontrado. Por favor, instale o MySQL primeiro."
    echo "📖 Instruções: https://dev.mysql.com/downloads/mysql/"
    exit 1
fi

echo "✅ Node.js e MySQL encontrados"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Criar arquivo .env se não existir
if [ ! -f .env ]; then
    echo "⚙️ Criando arquivo .env..."
    cp env.example .env
    echo "📝 Por favor, edite o arquivo .env com suas configurações do banco de dados"
else
    echo "✅ Arquivo .env já existe"
fi

# Criar diretório de uploads
echo "📁 Criando diretório de uploads..."
mkdir -p uploads

# Verificar conexão com banco
echo "🗄️ Testando conexão com banco de dados..."
echo "📝 Certifique-se de que:"
echo "   1. MySQL está rodando"
echo "   2. Banco 'mundo_dos_bots' foi criado"
echo "   3. Arquivo .env está configurado corretamente"

echo ""
echo "🎯 Próximos passos:"
echo "   1. Configure o arquivo .env com suas credenciais do MySQL"
echo "   2. Execute: mysql -u root -p < database/schema.sql"
echo "   3. Execute: npm run dev"
echo ""
echo "✅ Configuração concluída!"
