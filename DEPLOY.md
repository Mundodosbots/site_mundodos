# 🚀 Guia de Deploy - Mundo dos Bots no Portainer Swarm

Este guia explica como fazer o deploy da aplicação Mundo dos Bots no Portainer usando Docker Swarm via repositório Git.

## 📋 Pré-requisitos

- Portainer instalado e configurado com Docker Swarm
- Acesso ao Portainer com permissões de administrador
- Repositório Git configurado (GitHub, GitLab, etc.)
- Banco de dados MySQL acessível do servidor
- Domínio configurado (opcional, mas recomendado)

## 🔧 Preparação

### 1. Configurar Variáveis de Ambiente

1. Copie o arquivo `stack.env.example` para `stack.env`:
   ```bash
   cp stack.env.example stack.env
   ```

2. Edite o arquivo `stack.env` e configure todas as variáveis necessárias:
   - **DB_HOST**: Endereço do servidor MySQL
   - **DB_USER**: Usuário do banco de dados
   - **DB_PASSWORD**: Senha do banco de dados
   - **DB_NAME**: Nome do banco de dados
   - **JWT_SECRET**: Chave secreta para JWT (gere uma chave segura)
   - **CORS_ORIGIN**: URL do seu domínio
   - **REACT_APP_API_URL**: URL da API (use `/api` se usar proxy do Nginx)

3. **IMPORTANTE**: O arquivo `stack.env` deve ser commitado no repositório Git para o Portainer poder usá-lo.

### 2. Gerar Chave JWT Segura

Execute o seguinte comando para gerar uma chave JWT segura:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Use o resultado como valor de `JWT_SECRET` no arquivo `stack.env`.

## 📦 Deploy no Portainer

### Passo 1: Acessar Portainer

1. Acesse a interface do Portainer
2. Navegue até **Stacks** no menu lateral
3. Clique em **Add stack**

### Passo 2: Configurar Deploy via Git

1. **Build method**: Selecione **Repository** (ícone Git)

2. **Repository URL**: 
   - Cole a URL do seu repositório Git
   - Exemplo: `https://github.com/seu-usuario/mundo-dos-bots.git`
   - Se o repositório for privado, ative a autenticação e configure as credenciais

3. **Repository reference**:
   - Branch: `refs/heads/main` (ou sua branch principal)
   - Tag: `refs/tags/v1.0.0` (se usar tags)

4. **Compose path**:
   - Caminho para o arquivo docker-compose.yml
   - Geralmente: `docker-compose.yml`

### Passo 3: Configurar Variáveis de Ambiente

No Portainer, você tem duas opções:

#### Opção A: Usar arquivo stack.env (Recomendado)

1. Certifique-se de que o arquivo `stack.env` está no repositório Git
2. O Portainer automaticamente carregará as variáveis deste arquivo
3. Você pode adicionar variáveis adicionais na interface se necessário

#### Opção B: Configurar manualmente

1. Clique em **"Add an environment variable"**
2. Adicione cada variável uma por uma:
   - `DB_HOST=seu_host`
   - `DB_USER=seu_usuario`
   - `DB_PASSWORD=sua_senha`
   - `DB_NAME=mundo_dos_bots`
   - `JWT_SECRET=sua_chave_secreta`
   - `CORS_ORIGIN=https://seu-dominio.com.br`
   - `REACT_APP_API_URL=/api`
   - etc.

### Passo 4: Configurar Rede e Portas

O `docker-compose.yml` já está configurado, mas você pode ajustar:

- **Frontend**: Porta 80 (HTTP)
- **Backend**: Porta 5000 (interno, não precisa expor externamente)

Se precisar usar HTTPS, configure um proxy reverso (Nginx/Traefik) na frente do Portainer.

### Passo 5: Deploy

1. Revise todas as configurações
2. Dê um nome para a stack (ex: `mundo-dos-bots`)
3. Clique em **"Deploy the stack"**
4. Aguarde o build e deploy dos containers

## 🔍 Verificação

### Verificar Status dos Containers

1. No Portainer, vá em **Containers**
2. Verifique se os containers estão rodando:
   - `mundo-dos-bots-backend`
   - `mundo-dos-bots-frontend`

### Verificar Logs

1. Clique no container
2. Vá na aba **Logs**
3. Verifique se não há erros

### Testar Aplicação

1. Acesse o frontend: `http://seu-servidor` ou `https://seu-dominio.com.br`
2. Teste o login admin
3. Verifique se a API está respondendo: `http://seu-servidor/api/health`

## 🔄 Atualização

Para atualizar a aplicação:

1. Faça commit das alterações no Git
2. No Portainer, vá em **Stacks**
3. Clique na stack `mundo-dos-bots`
4. Clique em **Editor**
5. Clique em **Update the stack**
6. O Portainer fará pull das alterações e reconstruirá os containers

Ou use o botão **Pull and redeploy** se disponível.

## 🗄️ Banco de Dados

### Primeira Instalação

1. Acesse o servidor MySQL
2. Execute o schema inicial:
   ```bash
   mysql -u seu_usuario -p mundo_dos_bots < database/schema.sql
   ```

### Criar Usuário Admin

Após o primeiro deploy, você pode criar um usuário admin executando:

```bash
docker exec -it mundo-dos-bots-backend node scripts/create-admin.js
```

## 🔒 Segurança

### Recomendações

1. **JWT_SECRET**: Use uma chave forte e única
2. **DB_PASSWORD**: Use senhas fortes para o banco
3. **CORS_ORIGIN**: Configure apenas seu domínio
4. **HTTPS**: Configure SSL/TLS (use Traefik ou Nginx como proxy)
5. **Firewall**: Restrinja acesso às portas necessárias

### Variáveis Sensíveis

Para variáveis muito sensíveis, considere usar:
- **Secrets do Docker Swarm** (via Portainer)
- **Variáveis de ambiente do Portainer** (não commitadas no Git)

## 🐛 Troubleshooting

### Container não inicia

1. Verifique os logs: `docker logs mundo-dos-bots-backend`
2. Verifique as variáveis de ambiente
3. Verifique a conexão com o banco de dados

### Erro de conexão com banco

1. Verifique se o MySQL está acessível do container
2. Verifique credenciais no `stack.env`
3. Teste a conexão: `mysql -h DB_HOST -u DB_USER -p`

### Frontend não carrega

1. Verifique se o backend está rodando
2. Verifique a variável `REACT_APP_API_URL`
3. Verifique os logs do Nginx: `docker logs mundo-dos-bots-frontend`

### Build falha

1. Verifique se todos os arquivos estão no Git
2. Verifique se o Dockerfile está correto
3. Verifique os logs de build no Portainer

## 📊 Monitoramento

### Health Checks

Os containers têm health checks configurados:
- **Backend**: `/health` endpoint
- **Frontend**: Verificação HTTP na raiz

### Logs

Acesse os logs via Portainer:
- **Stacks** → Sua stack → **Logs**
- Ou via CLI: `docker logs mundo-dos-bots-backend`

### Recursos

Os containers têm limites de recursos configurados:
- **Backend**: Máximo 512MB RAM, 1 CPU
- **Frontend**: Máximo 256MB RAM, 0.5 CPU

## 📝 Estrutura de Arquivos

```
mundo-dos-bots/
├── docker-compose.yml      # Configuração Swarm
├── Dockerfile              # Frontend (React + Nginx)
├── nginx.conf              # Config Nginx
├── stack.env.example       # Template de variáveis
├── stack.env               # Variáveis (commitado no Git)
├── .dockerignore           # Arquivos ignorados no build
├── backend/
│   ├── Dockerfile          # Backend Node.js
│   └── .dockerignore
└── database/
    └── schema.sql          # Schema do banco
```

## 🆘 Suporte

Para problemas ou dúvidas:
1. Verifique os logs dos containers
2. Verifique a documentação do Portainer
3. Verifique a configuração do Docker Swarm

## 📚 Referências

- [Documentação Portainer](https://docs.portainer.io/)
- [Docker Swarm](https://docs.docker.com/engine/swarm/)
- [Docker Compose](https://docs.docker.com/compose/)

