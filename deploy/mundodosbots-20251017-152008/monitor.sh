#!/bin/bash

# Script de monitoramento
echo "=== Status do Sistema ==="
echo "Data: $(date)"
echo

echo "=== PM2 Status ==="
pm2 status
echo

echo "=== Nginx Status ==="
sudo systemctl status nginx --no-pager
echo

echo "=== MySQL Status ==="
sudo systemctl status mysql --no-pager
echo

echo "=== Espaço em Disco ==="
df -h
echo

echo "=== Memória ==="
free -h
echo

echo "=== Logs Recentes ==="
tail -n 10 /var/log/mundodosbots/error.log
