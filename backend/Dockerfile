# Backend Dockerfile - Mundo dos Bots
FROM node:18-alpine

# Instalar wget para healthcheck
RUN apk add --no-cache wget

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências de produção
RUN npm ci --only=production && npm cache clean --force

# Copiar código da aplicação
COPY . .

# Criar diretório de uploads
RUN mkdir -p uploads data

# Expor porta
EXPOSE 5000

# Variáveis de ambiente padrão
ENV NODE_ENV=production
ENV PORT=5000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]

