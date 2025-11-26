#!/bin/bash

# Script de backup
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/mundodosbots"

mkdir -p $BACKUP_DIR

# Backup do banco
mysqldump -u mundo_dos_bots_user -p mundo_dos_bots > $BACKUP_DIR/db_$DATE.sql

# Backup dos uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /var/www/mundodosbots/uploads

# Backup dos logs
tar -czf $BACKUP_DIR/logs_$DATE.tar.gz /var/log/mundodosbots/

# Manter apenas os últimos 7 backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup concluído: $DATE"
