# 🚀 Deploy no Portainer - Imagens Docker Hub

## ✅ Imagens Criadas

Você já tem as imagens no Docker Hub:
- `mundodosbots/lp_mundodos:backend`
- `mundodosbots/lp_mundodos:frontend`

## 📝 Passo a Passo no Portainer

### 1. Acessar Portainer
- Vá em **Stacks** → **Add stack**

### 2. Configurar Deploy via Git

1. **Name**: `mundo-dos-bots`

2. **Build method**: Selecione **Repository** (ícone Git)

3. **Repository URL**: 
   ```
   https://github.com/Mundodosbots/site_mundodos
   ```

4. **Repository reference**: 
   ```
   refs/heads/main
   ```

5. **Compose path**: 
   ```
   docker-compose.yml
   ```

6. **Environment Variables**: 
   - **NÃO É NECESSÁRIO** - todas as variáveis já estão no `docker-compose.yml`

### 3. Deploy

1. Clique em **"Deploy the stack"**
2. O Portainer vai:
   - Fazer pull das imagens do Docker Hub
   - Criar os containers
   - Configurar o Traefik

## 🔍 Verificar Deploy

### Verificar Imagens
1. Vá em **Images**
2. Verifique se as imagens aparecem:
   - `mundodosbots/lp_mundodos:backend`
   - `mundodosbots/lp_mundodos:frontend`

### Verificar Containers
1. Vá em **Containers**
2. Verifique se estão rodando:
   - `mundo-dos-bots_backend`
   - `mundo-dos-bots_frontend`

### Verificar Logs
1. Clique em cada container
2. Vá na aba **Logs**
3. Verifique se não há erros

## 🔄 Atualizar Imagens

Quando atualizar o código e fizer push de novas imagens:

1. **No seu computador:**
   ```powershell
   # Build e push novamente
   docker build -t mundodosbots/lp_mundodos:backend -f backend/Dockerfile ./backend
   docker push mundodosbots/lp_mundodos:backend
   
   docker build -t mundodosbots/lp_mundodos:frontend --build-arg REACT_APP_API_URL=https://api.mundodosbots.com.br/api .
   docker push mundodosbots/lp_mundodos:frontend
   ```

2. **No Portainer:**
   - Vá em **Stacks** → Sua stack → **Editor**
   - Clique em **Pull and redeploy**
   - Ou clique em **Update the stack**

## ⚠️ Importante

- Certifique-se de que as imagens estão **públicas** no Docker Hub (ou configure autenticação)
- Certifique-se de que a network `InconectNet` existe no Portainer
- Certifique-se de que o Traefik está rodando na mesma network

## 🐛 Troubleshooting

### Erro: "pull access denied"
- Verifique se as imagens estão públicas no Docker Hub
- Ou configure autenticação do Docker Hub no Portainer

### Containers não iniciam
- Verifique os logs: **Containers** → Clique no container → **Logs**
- Verifique se a network `InconectNet` existe

### Traefik não roteia
- Verifique se o Traefik está na mesma network `InconectNet`
- Verifique se os labels do Traefik estão corretos

