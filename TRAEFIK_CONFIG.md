# 🔧 Configuração Traefik - Mundo dos Bots

## 📋 Configurações Aplicadas

### ✅ Networks
- **Network utilizada**: `InconectNet` (network externa existente)
- Configurada como `external: true` no docker-compose.yml

### ✅ Variáveis de Ambiente
- Todas as variáveis estão **hardcoded diretamente no docker-compose.yml**
- Não é necessário arquivo `.env` ou `stack.env`
- JWT_SECRET já foi gerado automaticamente

### ✅ Traefik Labels

#### Frontend (mundodosbots.com.br)
```yaml
labels:
  - traefik.enable=true
  - traefik.http.routers.mundodosbots.rule=Host(`mundodosbots.com.br`)
  - traefik.http.routers.mundodosbots.entrypoints=websecure
  - traefik.http.routers.mundodosbots.priority=1
  - traefik.http.routers.mundodosbots.tls.certresolver=letsencryptresolver
  - traefik.http.routers.mundodosbots.service=mundodosbots
  - traefik.http.services.mundodosbots.loadbalancer.server.port=4010
  - traefik.http.services.mundodosbots.loadbalancer.passHostHeader=true
```

#### Backend (api.mundodosbots.com.br)
```yaml
labels:
  - traefik.enable=true
  - traefik.http.routers.mundodosbots-api.rule=Host(`api.mundodosbots.com.br`)
  - traefik.http.routers.mundodosbots-api.entrypoints=websecure
  - traefik.http.routers.mundodosbots-api.priority=1
  - traefik.http.routers.mundodosbots-api.tls.certresolver=letsencryptresolver
  - traefik.http.routers.mundodosbots-api.service=mundodosbots-api
  - traefik.http.services.mundodosbots-api.loadbalancer.server.port=6010
  - traefik.http.services.mundodosbots-api.loadbalancer.passHostHeader=true
```

## 🌐 Estrutura de Domínios

### Opção Atual (Subdomínios Separados)
- **Frontend**: `https://mundodosbots.com.br`
- **Backend API**: `https://api.mundodosbots.com.br`
- **Frontend chama**: `https://api.mundodosbots.com.br/api`

### Alternativa (Mesmo Domínio)
Se preferir usar o mesmo domínio para tudo:
- **Frontend**: `https://mundodosbots.com.br`
- **Backend API**: `https://mundodosbots.com.br/api`

Para usar esta opção, altere no `docker-compose.yml`:
1. Backend labels: `Host(`mundodosbots.com.br`)` + `PathPrefix(`/api`)`
2. Frontend build args: `REACT_APP_API_URL: /api`

## 🔐 Variáveis Configuradas

Todas as variáveis estão no `docker-compose.yml`:

- ✅ **DB_HOST**: 104.254.130.194
- ✅ **DB_USER**: mundodos_mundo_dos_bots
- ✅ **DB_PASSWORD**: !mV8xuENT%X*
- ✅ **DB_NAME**: mundodos_mundo_dos_bots
- ✅ **JWT_SECRET**: [gerado automaticamente]
- ✅ **CORS_ORIGIN**: https://mundodosbots.com.br
- ✅ **REACT_APP_API_URL**: https://api.mundodosbots.com.br/api

## 📝 Deploy no Portainer

1. **Name**: `mundo-dos-bots`
2. **Repository URL**: `https://github.com/Mundodosbots/site_mundodos`
3. **Repository reference**: `refs/heads/main`
4. **Compose path**: `docker-compose.yml`
5. **Environment Variables**: **NÃO É NECESSÁRIO** - tudo está no compose!

## ⚠️ Importante

- **Não precisa** criar arquivo `stack.env`
- **Não precisa** adicionar variáveis no Portainer
- **Não precisa** expor portas manualmente (Traefik faz isso)
- Certifique-se de que o Traefik está rodando na mesma network `InconectNet`
- Certifique-se de que os domínios estão apontando para o servidor

## 🔄 Como Funciona

1. **Traefik** recebe requisições HTTPS na porta 443
2. **Traefik** faz SSL termination (Let's Encrypt)
3. **Traefik** roteia para os containers baseado nos labels
4. **Frontend** (Nginx) serve os arquivos estáticos do React na porta 4010
5. **Backend** (Node.js) responde na porta 6010 internamente
6. **Frontend React** faz chamadas diretas para `https://api.mundodosbots.com.br/api`

## 🐛 Troubleshooting

### Containers não aparecem no Traefik
- Verifique se estão na mesma network: `InconectNet`
- Verifique se `traefik.enable=true` está configurado

### SSL não funciona
- Verifique se o Traefik tem `letsencryptresolver` configurado
- Verifique se os domínios estão apontando corretamente

### Frontend não conecta no backend
- Verifique se `REACT_APP_API_URL` está correto no build
- Verifique se o backend está acessível via Traefik
- Verifique CORS no backend

