# Build e Deploy Docker - Mundo dos Bots

## Repositório Docker
- **Repositório**: `lp_mundodos_site`
- **Backend**: `lp_mundodos_site:backend`
- **Frontend**: `lp_mundodos_site:frontend`

## Comandos de Build

### 1. Build da Imagem Backend

```bash
docker build -t mundodosbots/lp_mundodos_site:backend -f backend/Dockerfile ./backend
```

### 2. Build da Imagem Frontend

```bash
docker build -t mundodosbots/lp_mundodos_site:frontend .
```

**Nota**: O `REACT_APP_API_URL` agora é configurado em **runtime** via variável de ambiente no Portainer. Não é mais necessário passar como build arg!

### 3. Push para o Repositório

Primeiro, faça login no Docker:
```bash
docker login
```

Depois, faça push das imagens:
```bash
# Push Backend
docker push mundodosbots/lp_mundodos_site:backend

# Push Frontend
docker push mundodosbots/lp_mundodos_site:frontend
```

### 4. Script Automatizado (PowerShell)

Use o script `rebuild-and-push.ps1` para fazer tudo de uma vez:
```powershell
.\rebuild-and-push.ps1
```

## Deploy no Portainer

### 1. Preparar o Stack

Use o arquivo `docker-compose.portainer.yml` que contém:
- Todas as variáveis de ambiente necessárias
- Configuração para MySQL externo (DB_HOST=mysql)
- Labels Traefik para roteamento
- Healthchecks
- Configuração de deploy para Docker Swarm

### 2. Importar Stack no Portainer

1. Acesse o Portainer
2. Vá em **Stacks**
3. Clique em **Add stack**
4. Cole o conteúdo do arquivo `docker-compose.portainer.yml`
5. Ajuste as variáveis de ambiente se necessário:
   - `DB_HOST`: Nome do serviço MySQL (padrão: `mysql`)
   - `DB_USER`, `DB_PASSWORD`, `DB_NAME`: Credenciais do banco
   - `JWT_SECRET`: Chave secreta JWT
   - `CORS_ORIGIN`: Domínio permitido
   - `PABBLY_API_KEY`: Chave da API Pabbly (se necessário)

### 3. Verificar Rede

Certifique-se de que a rede `InconectNet` existe:
```bash
docker network create InconectNet
```

Ou use uma rede existente no Portainer.

### 4. Verificar MySQL

O MySQL deve estar rodando na mesma rede Docker (`InconectNet`) com o nome de serviço `mysql`. Se o nome for diferente, ajuste o `DB_HOST` no docker-compose.

## Variáveis de Ambiente Importantes

### Backend

**Banco de Dados:**
- `DB_HOST=mysql` (nome do serviço MySQL na rede Docker)
- `DB_PORT=3306`
- `DB_USER=root`
- `DB_PASSWORD=sua_senha`
- `DB_NAME=site_mundodosbots`

**Segurança:**
- `JWT_SECRET=chave_secreta_jwt`
- `JWT_EXPIRE=7d`

**CORS:**
- `CORS_ORIGIN=https://mundodosbots.com.br`

**Pabbly:**
- `PABBLY_API_KEY=sua_chave_pabbly`
- `PABBLY_WEBHOOK_URL=https://mundodosbots.com.br/api/pabbly/webhook`

### Frontend

**Variável de ambiente configurável em runtime:**
- `REACT_APP_API_URL` - URL da API (ex: `https://api.mundodosbots.com.br/api`)

**Nota**: A URL da API agora é configurada em **runtime** via variável de ambiente no Portainer, não precisa mais de build arg!

## Troubleshooting

### Backend não conecta ao MySQL

1. Verifique se o MySQL está na mesma rede Docker
2. Verifique se o nome do serviço MySQL está correto no `DB_HOST`
3. Verifique as credenciais do banco de dados

### Frontend não acessa a API

1. Verifique se o `REACT_APP_API_URL` foi configurado corretamente no build
2. Verifique se o CORS está configurado corretamente no backend
3. Verifique os logs do Traefik para roteamento

### Healthcheck falhando

1. Verifique se as portas estão corretas (4010 frontend, 6010 backend)
2. Verifique se os serviços estão rodando
3. Aumente o `start_period` se necessário

