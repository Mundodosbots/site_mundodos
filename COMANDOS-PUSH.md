# Comandos para Rebuild e Push - Docker Hub

## Repositório
- **Usuário**: `mundodosbots`
- **Repositório**: `lp_mundodos_site`
- **Backend**: `mundodosbots/lp_mundodos_site:backend`
- **Frontend**: `mundodosbots/lp_mundodos_site:frontend`

## Opção 1: Script Automatizado (Recomendado)

Execute o script PowerShell que faz tudo automaticamente:

```powershell
.\rebuild-and-push.ps1
```

## Opção 2: Comandos Manuais

### 1. Login no Docker Hub

```bash
docker login
```

Digite seu username e password do Docker Hub.

### 2. Rebuild e Push do Backend

```bash
# Build
docker build -t mundodosbots/lp_mundodos_site:backend -f backend/Dockerfile ./backend

# Push
docker push mundodosbots/lp_mundodos_site:backend
```

### 3. Rebuild e Push do Frontend

```bash
# Build
docker build -t mundodosbots/lp_mundodos_site:frontend .

# Push
docker push mundodosbots/lp_mundodos_site:frontend
```

## Após o Push

1. Acesse o **Portainer**
2. Vá na sua **Stack**
3. Clique em **Editor** ou **Update the stack**
4. Clique em **Pull and redeploy** para atualizar as imagens
5. Ou simplesmente faça **Update the stack** se o docker-compose.yml já estiver atualizado

## Verificar se as Imagens Foram Atualizadas

No Docker Hub:
- https://hub.docker.com/r/mundodosbots/lp_mundodos_site

No Portainer:
- Verifique os logs dos containers após o redeploy
- Backend deve mostrar: `🌐 CORS configurado para origens: [...]`
- Frontend deve carregar o `runtime-config.js` corretamente

