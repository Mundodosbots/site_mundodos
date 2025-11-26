# 🚀 Passos Finais - Deploy no Portainer

## ✅ O que você já tem:
- ✅ Imagens criadas localmente
- ✅ Imagens taggeadas: `mundodosbots/lp_mundodos:backend` e `mundodosbots/lp_mundodos:frontend`
- ✅ Login no Docker Hub feito

## 📤 Passo 1: Push para Docker Hub

Execute no terminal:

```powershell
docker push mundodosbots/lp_mundodos:backend
docker push mundodosbots/lp_mundodos:frontend
```

Isso vai enviar as imagens para o Docker Hub. Pode levar alguns minutos.

## ✅ Passo 2: Verificar no Docker Hub

1. Acesse: https://hub.docker.com/r/mundodosbots/lp_mundodos
2. Verifique se as tags `backend` e `frontend` aparecem

## 🚀 Passo 3: Deploy no Portainer

1. **Acesse o Portainer**
2. Vá em **Stacks** → **Add stack**

3. **Configure:**
   - **Name**: `mundo-dos-bots`
   - **Build method**: **Repository** (ícone Git)
   - **Repository URL**: `https://github.com/Mundodosbots/site_mundodos`
   - **Repository reference**: `refs/heads/main`
   - **Compose path**: `docker-compose.yml`
   - **Environment Variables**: Não precisa (tudo está no compose)

4. **Clique em "Deploy the stack"**

## 🔍 Passo 4: Verificar Deploy

### Verificar Containers
1. Vá em **Containers**
2. Verifique se estão rodando:
   - `mundo-dos-bots_backend`
   - `mundo-dos-bots_frontend`

### Verificar Logs
1. Clique em cada container
2. Vá na aba **Logs**
3. Verifique se não há erros

### Testar Aplicação
- Frontend: `https://mundodosbots.com.br`
- Backend API: `https://api.mundodosbots.com.br`

## ⚠️ Importante

- Certifique-se de que a network `InconectNet` existe no Portainer
- Certifique-se de que o Traefik está rodando na mesma network
- Certifique-se de que os domínios estão apontando para o servidor

## 🔄 Atualizar no Futuro

Quando atualizar o código:

1. **Build novamente:**
   ```powershell
   docker build -t mundodosbots/mundo-dos-bots-backend:latest -f backend/Dockerfile ./backend
   docker build -t mundodosbots/mundo-dos-bots-frontend:latest --build-arg REACT_APP_API_URL=https://api.mundodosbots.com.br/api .
   ```

2. **Tag e Push:**
   ```powershell
   docker tag mundodosbots/mundo-dos-bots-backend:latest mundodosbots/lp_mundodos:backend
   docker tag mundodosbots/mundo-dos-bots-frontend:latest mundodosbots/lp_mundodos:frontend
   docker push mundodosbots/lp_mundodos:backend
   docker push mundodosbots/lp_mundodos:frontend
   ```

3. **No Portainer:**
   - Stacks → Sua stack → **Pull and redeploy**

