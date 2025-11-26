# 🔧 Solução: Erro de Conexão MySQL (ETIMEDOUT)

## ❌ Problema
O container não consegue conectar no MySQL externo: `connect ETIMEDOUT`

## 🔍 Possíveis Causas

1. **Network do Docker Swarm não permite acesso externo**
2. **MySQL não permite conexões remotas**
3. **Firewall bloqueando a conexão**
4. **IP do MySQL incorreto ou inacessível**

## ✅ Soluções

### Solução 1: Verificar se MySQL permite conexões remotas

No servidor MySQL (`104.254.130.194`), verifique:

```sql
-- Verificar usuário e host permitidos
SELECT user, host FROM mysql.user WHERE user = 'mundodos_mundo_dos_bots';

-- Se não permitir '%' (qualquer host), adicione:
GRANT ALL PRIVILEGES ON mundodos_mundo_dos_bots.* TO 'mundodos_mundo_dos_bots'@'%' IDENTIFIED BY '!mV8xuENT%X*';
FLUSH PRIVILEGES;
```

### Solução 2: Usar MySQL dentro do Docker Swarm

Se o MySQL estiver no mesmo servidor, crie um serviço MySQL no docker-compose:

```yaml
mysql:
  image: mysql:8.0
  environment:
    - MYSQL_ROOT_PASSWORD=senha_root
    - MYSQL_DATABASE=mundodos_mundo_dos_bots
    - MYSQL_USER=mundodos_mundo_dos_bots
    - MYSQL_PASSWORD=!mV8xuENT%X*
  networks:
    - InconectNet
  volumes:
    - mysql_data:/var/lib/mysql
```

E altere o `DB_HOST` para `mysql` (nome do serviço).

### Solução 3: Configurar Network para Acesso Externo

No Portainer:
1. Vá em **Networks**
2. Clique em `InconectNet`
3. Verifique se está configurada como `overlay` (para Swarm)
4. Se necessário, recrie a network com acesso externo

### Solução 4: Testar Conexão Manualmente

No servidor onde o Portainer está rodando, teste:

```bash
# Testar se consegue acessar o MySQL
telnet 104.254.130.194 3306

# Ou
nc -zv 104.254.130.194 3306
```

Se não conseguir, o problema é de rede/firewall.

### Solução 5: Usar Host Network (não recomendado para Swarm)

Se nada funcionar, pode tentar usar `network_mode: host`, mas isso não funciona bem no Swarm mode.

## 🔍 Debug

Para verificar o que está acontecendo:

1. **No Portainer**, vá em **Containers**
2. Encontre um container do backend que falhou
3. Clique nele → **Console**
4. Execute: `ping 104.254.130.194`
5. Execute: `telnet 104.254.130.194 3306`

Se o ping funcionar mas o telnet não, o MySQL está bloqueando conexões remotas.

## ⚠️ Importante

- Certifique-se de que o MySQL permite conexões do IP do servidor Docker
- Verifique firewall do servidor MySQL
- Verifique se a porta 3306 está aberta

