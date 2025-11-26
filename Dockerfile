# Frontend Dockerfile - Mundo dos Bots
# Multi-stage build: Build React + Serve com Nginx

# Stage 1: Build da aplicação React
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci && npm cache clean --force

# Copiar código fonte
COPY . .

# Build da aplicação
# REACT_APP_API_URL será injetado no build time via ARG
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# Stage 2: Servir com Nginx
FROM nginx:alpine

# Instalar wget para healthcheck
RUN apk add --no-cache wget

# Copiar build do stage anterior
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 4010
EXPOSE 4010

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]

