# 🔧 Solução Completa: Erro MySQL ETIMEDOUT

## ❌ Problema
```
❌ Erro ao conectar com MySQL: connect ETIMEDOUT
```

## ✅ O que foi feito

1. ✅ Adicionado DNS (8.8.8.8, 8.8.4.4) no docker-compose.yml
2. ✅ Adicionado timeout maior (30 segundos) na conexão MySQL
3. ✅ Adicionado retry automático (5 tentativas com 5 segundos entre cada)
4. ✅ Melhorado tratamento de erros

## 🔨 Próximos Passos

### 1. Rebuild do Backend

Execute:

```powershell
.\rebuild-backend.ps1
```

Isso vai rebuildar o backend com as novas configurações de retry e timeout.

### 2. Verificar MySQL (CRÍTICO)

O MySQL precisa permitir conexões remotas. Execute no MySQL:

```sql
-- Conectar como root
mysql -u root -p

-- Verificar usuário atual
SELECT user, host FROM mysql.user WHERE user = 'mundodos_mundo_dos_bots';

-- Se o host não for '%', adicione:
CREATE USER IF NOT EXISTS 'mundodos_mundo_dos_bots'@'%' IDENTIFIED BY '!mV8xuENT%X*';
GRANT ALL PRIVILEGES ON mundodos_mundo_dos_bots.* TO 'mundodos_mundo_dos_bots'@'%';
FLUSH PRIVILEGES;
```

### 3. Verificar Firewall

No servidor MySQL (`104.254.130.194`):

```bash
# Verificar se porta 3306 está aberta
sudo ufw status
# Ou
sudo iptables -L -n | grep 3306

# Se não estiver aberta, abra:
sudo ufw allow 3306/tcp
```

### 4. Verificar MySQL bind-address

No servidor MySQL, verifique `/etc/mysql/mysql.conf.d/mysqld.cnf`:

```ini
bind-address = 0.0.0.0  # Deve ser 0.0.0.0, não 127.0.0.1
```

Depois reinicie o MySQL:
```bash
sudo systemctl restart mysql
```

### 5. Testar Conectividade

No servidor onde o Portainer está rodando:

```bash
# Testar se consegue alcançar o MySQL
telnet 104.254.130.194 3306
# Ou
nc -zv 104.254.130.194 3306
```

Se não conseguir, o problema é de rede/firewall, não do Docker.

## 🚀 Após Rebuild

1. Faça rebuild: `.\rebuild-backend.ps1`
2. No Portainer: **Pull and redeploy**
3. O backend vai tentar conectar 5 vezes com intervalo de 5 segundos
4. Se ainda falhar, verifique MySQL e firewall

## 🔍 Debug Avançado

Se ainda não funcionar, teste dentro do container:

1. No Portainer: **Containers** → backend → **Console**
2. Execute:
   ```bash
   ping 104.254.130.194
   telnet 104.254.130.194 3306
   ```

Se o ping funcionar mas telnet não, o MySQL está bloqueando.


