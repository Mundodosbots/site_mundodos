# 📊 Informações do Sistema

## 🚀 Deploy Info
- **Data:** Fri Oct 17 15:20:13 -04 2025
- **Versão:** 1.0.0
- **Domínio:** mundodosbots.com.br
- **Ambiente:** Produção

## 📁 Estrutura de Arquivos
```
/var/www/mundodosbots/
├── frontend/          # Build do React
├── backend/           # API Node.js
├── uploads/           # Arquivos enviados
└── logs/              # Logs do sistema
```

## 🔧 Serviços
- **Frontend:** Nginx (porta 80/443)
- **Backend:** PM2 + Node.js (porta 5000)
- **Banco:** MySQL (porta 3306)

## 📊 Monitoramento
- **PM2:** `pm2 status`
- **Nginx:** `sudo systemctl status nginx`
- **MySQL:** `sudo systemctl status mysql`

## 🔐 Segurança
- **SSL:** Let's Encrypt
- **Firewall:** UFW (se configurado)
- **Backup:** Automático diário

## 📞 Suporte
- **Logs:** /var/log/mundodosbots/
- **Config:** /var/www/mundodosbots/backend/.env.production
- **Nginx:** /etc/nginx/sites-available/mundodosbots.conf
