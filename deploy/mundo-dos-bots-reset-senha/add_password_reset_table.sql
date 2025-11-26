-- =====================================================
-- TABELA DE TOKENS DE RESET DE SENHA
-- =====================================================

USE mundo_dos_bots;

CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_expires (expires_at)
);

-- =====================================================
-- INSTRUÇÕES DE INSTALAÇÃO
-- =====================================================
-- Execute este script no MySQL para adicionar a tabela de reset de senha:
-- mysql -u root -p mundo_dos_bots < add_password_reset_table.sql

