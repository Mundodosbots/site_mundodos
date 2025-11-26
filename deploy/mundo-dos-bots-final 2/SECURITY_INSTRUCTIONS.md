# 🔐 Instruções de Segurança - Mundo dos Bots

## ⚠️ IMPORTANTE - Configuração Inicial

### 1. **Alterar Credenciais Padrão**

Após o primeiro deploy, você DEVE:

1. **Acessar o painel administrativo**
2. **Alterar a senha do usuário admin**
3. **Criar usuários adicionais conforme necessário**
4. **Remover ou desativar usuários desnecessários**

### 2. **Credenciais do Sistema**

#### **Super Admin (Principal)**
- **Email:** `gfpandolfo@mundodosbots.com.br`
- **Senha:** `Hits#4546`
- **Nome:** Gelson Pandolfo
- **Role:** admin

#### **Admin Padrão (Secundário)**
- **Email:** `admin@mundodosbots.com.br`
- **Senha:** `admin123`
- **Nome:** Administrador
- **Role:** admin

⚠️ **Recomenda-se alterar a senha do admin padrão após configuração inicial!**

### 3. **Como Alterar a Senha**

#### **Opção 1: Via Painel Administrativo**
1. Faça login com as credenciais padrão
2. Vá para "Usuários" no menu lateral
3. Clique em "Editar" no usuário admin
4. Digite uma nova senha segura
5. Salve as alterações

#### **Opção 2: Via Banco de Dados**
```sql
-- Conecte ao banco MySQL e execute:
UPDATE users 
SET password = '$2b$10$[NOVA_SENHA_CRIPTOGRAFADA]' 
WHERE email = 'admin@mundodosbots.com.br';
```

#### **Opção 3: Via Script**
```bash
cd /api/
node scripts/create-admin.js
```

### 4. **Recomendações de Segurança**

#### **Senhas Fortes**
- Mínimo 12 caracteres
- Combine letras maiúsculas, minúsculas, números e símbolos
- Evite palavras comuns ou informações pessoais
- Use um gerenciador de senhas

#### **Exemplos de Senhas Seguras**
- `MundoBots2024!@#`
- `Admin@Seguro#123`
- `MdB_2024_Super!`

#### **Gerenciamento de Usuários**
- Crie usuários específicos para cada pessoa
- Use roles apropriados (admin/editor)
- Desative usuários que não precisam mais de acesso
- Monitore logs de acesso regularmente

### 5. **Configurações Adicionais de Segurança**

#### **Variáveis de Ambiente**
```env
# Altere estas configurações no arquivo .env
JWT_SECRET=sua_chave_secreta_muito_segura_e_aleatoria_aqui
JWT_EXPIRES_IN=24h

# Use uma chave JWT forte e única
# Exemplo: JWT_SECRET=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

#### **Backup de Segurança**
- Faça backup regular do banco de dados
- Mantenha cópias seguras das configurações
- Documente todas as alterações de segurança

### 6. **Monitoramento**

#### **Verificar Acessos**
- Monitore logs de login
- Verifique usuários ativos regularmente
- Alerte sobre tentativas de login suspeitas

#### **Atualizações**
- Mantenha o sistema atualizado
- Aplique patches de segurança
- Monitore vulnerabilidades conhecidas

### 7. **Em Caso de Comprometimento**

Se suspeitar que a segurança foi comprometida:

1. **Altere todas as senhas imediatamente**
2. **Revogue todos os tokens JWT**
3. **Verifique logs de acesso**
4. **Desative usuários suspeitos**
5. **Contate o suporte técnico**

### 8. **Contatos de Emergência**

- **Suporte Técnico:** [seu-email@exemplo.com]
- **Administrador do Sistema:** [admin@mundodosbots.com.br]

---

## ✅ Checklist de Segurança

- [ ] Alterar senha padrão do admin
- [ ] Configurar JWT_SECRET único
- [ ] Criar usuários específicos
- [ ] Configurar backup automático
- [ ] Implementar monitoramento
- [ ] Documentar procedimentos
- [ ] Treinar equipe em segurança
- [ ] Testar procedimentos de recuperação

---

**🔒 Lembre-se: A segurança é responsabilidade de todos!**

Mantenha este documento atualizado e compartilhe apenas com pessoas autorizadas.
