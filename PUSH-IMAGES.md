# Push das Imagens para Docker Hub

## Pré-requisitos

1. Ter uma conta no Docker Hub
2. Estar logado no Docker Hub: `docker login`
3. Ter as imagens locais criadas:
   - `lp_mundodos_site:backend`
   - `lp_mundodos_site:frontend`

## Passos para Push

### 1. Fazer Login no Docker Hub

```bash
docker login
```

Digite seu username e password do Docker Hub.

### 2. Fazer Tag das Imagens

**IMPORTANTE**: Substitua `SEU_USUARIO_DOCKERHUB` pelo seu nome de usuário do Docker Hub.

```bash
# Tag do Backend
docker tag lp_mundodos_site:backend SEU_USUARIO_DOCKERHUB/lp_mundodos_site:backend

# Tag do Frontend
docker tag lp_mundodos_site:frontend SEU_USUARIO_DOCKERHUB/lp_mundodos_site:frontend
```

**Exemplo** (se seu usuário for `mundodosbots`):
```bash
docker tag lp_mundodos_site:backend mundodosbots/lp_mundodos_site:backend
docker tag lp_mundodos_site:frontend mundodosbots/lp_mundodos_site:frontend
```

### 3. Fazer Push das Imagens

```bash
# Push do Backend
docker push SEU_USUARIO_DOCKERHUB/lp_mundodos_site:backend

# Push do Frontend
docker push SEU_USUARIO_DOCKERHUB/lp_mundodos_site:frontend
```

### 4. Atualizar docker-compose.yml

Após fazer push, atualize o `docker-compose.yml` com o nome completo das imagens:

```yaml
backend:
  image: SEU_USUARIO_DOCKERHUB/lp_mundodos_site:backend

frontend:
  image: SEU_USUARIO_DOCKERHUB/lp_mundodos_site:frontend
```

## Script Automatizado (PowerShell)

Você também pode usar o script `push-images.ps1`, mas **antes** precisa fazer tag das imagens manualmente com seu usuário do Docker Hub.

## Verificar Imagens no Docker Hub

Após o push, você pode verificar as imagens em:
- https://hub.docker.com/r/SEU_USUARIO_DOCKERHUB/lp_mundodos_site

