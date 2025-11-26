# 🚀 Guia Rápido - Preencher Dados no Portainer

## 📝 Campos Obrigatórios

### 1. **Name**
```
mundo-dos-bots
```

### 2. **Repository URL** ✅ (já preenchido)
```
https://github.com/Mundodosbots/site_mundodos
```

### 3. **Repository reference** ✅ (já preenchido)
```
refs/heads/main
```

### 4. **Compose path** ✅ (já preenchido)
```
docker-compose.yml
```

## 🔐 Variáveis de Ambiente (IMPORTANTE)

### Opção 1: Usar arquivo stack.env (Recomendado)

1. **Crie o arquivo `stack.env` no repositório Git** com estas variáveis:

```env
# BANCO DE DADOS - MySQL (OBRIGATÓRIO)
DB_HOST=104.254.130.194
DB_PORT=3306
DB_USER=mundodos_mundo_dos_bots
DB_PASSWORD=!mV8xuENT%X*
DB_NAME=mundodos_mundo_dos_bots

# JWT SECRET (OBRIGATÓRIO - gere uma chave segura)
JWT_SECRET=sua_chave_secreta_muito_segura_aqui
JWT_EXPIRE=7d

# CORS (OBRIGATÓRIO)
CORS_ORIGIN=https://mundodosbots.com.br

# FRONTEND API URL (OBRIGATÓRIO)
REACT_APP_API_URL=/api

# RATE LIMITING (opcional)
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=1000

# UPLOAD (opcional)
MAX_UPLOAD_SIZE=5242880

# PABBLY (opcional - deixe vazio se não usar)
PABBLY_API_KEY=
PABBLY_BASE_URL=https://api.pabbly.com/v1
PABBLY_WEBHOOK_URL=https://mundodosbots.com.br/api/pabbly/webhook
PABBLY_AUTO_SCHEDULE_ENABLED=false
PABBLY_FACEBOOK_ENABLED=false
PABBLY_INSTAGRAM_ENABLED=false
PABBLY_LINKEDIN_ENABLED=false
PABBLY_TWITTER_ENABLED=false
```

2. **Faça commit e push** do arquivo `stack.env` para o Git
3. O Portainer **automaticamente carregará** as variáveis deste arquivo

### Opção 2: Adicionar Manualmente no Portainer

Se preferir não usar o arquivo `stack.env`, clique em **"Add an environment variable"** e adicione:

| Nome | Valor | Obrigatório |
|------|-------|-------------|
| `DB_HOST` | `104.254.130.194` | ✅ Sim |
| `DB_PORT` | `3306` | ✅ Sim |
| `DB_USER` | `mundodos_mundo_dos_bots` | ✅ Sim |
| `DB_PASSWORD` | `!mV8xuENT%X*` | ✅ Sim |
| `DB_NAME` | `mundodos_mundo_dos_bots` | ✅ Sim |
| `JWT_SECRET` | `[gere uma chave segura]` | ✅ Sim |
| `JWT_EXPIRE` | `7d` | Não |
| `CORS_ORIGIN` | `https://mundodosbots.com.br` | ✅ Sim |
| `REACT_APP_API_URL` | `/api` | ✅ Sim |
| `RATE_LIMIT_WINDOW` | `15` | Não |
| `RATE_LIMIT_MAX` | `1000` | Não |
| `MAX_UPLOAD_SIZE` | `5242880` | Não |

## 🔑 Gerar JWT_SECRET

Execute este comando para gerar uma chave JWT segura:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Use o resultado como valor de `JWT_SECRET`.

## ✅ Checklist Antes de Deploy

- [ ] Name preenchido
- [ ] Repository URL correto
- [ ] Repository reference correto (main)
- [ ] Compose path correto (docker-compose.yml)
- [ ] Variáveis de ambiente configuradas (stack.env OU manualmente)
- [ ] JWT_SECRET gerado e configurado
- [ ] DB_HOST, DB_USER, DB_PASSWORD, DB_NAME configurados
- [ ] CORS_ORIGIN configurado com seu domínio
- [ ] REACT_APP_API_URL configurado como `/api`

## 🚀 Deploy

1. Revise todos os campos
2. Clique em **"Deploy the stack"**
3. Aguarde o build (pode levar alguns minutos)
4. Verifique os logs se houver erros

## ⚠️ Importante

- Se o repositório for **privado**, ative **Authentication** e configure usuário/senha
- **Skip TLS Verification** só deve ser ativado se usar certificado autoassinado
- O arquivo `stack.env` deve estar **commitado no Git** para funcionar
- Se usar variáveis sensíveis, considere usar **Secrets do Docker Swarm** no Portainer

