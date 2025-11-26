-- =====================================================
-- SCRIPT DE VERIFICAÇÃO DA INSTALAÇÃO
-- Mundo dos Bots - Database Verification
-- =====================================================
-- 
-- COMO USAR:
-- mysql -u root -p < verificar_instalacao.sql
-- Ou dentro do MySQL: source verificar_instalacao.sql
-- =====================================================

USE mundo_dos_bots;

SELECT '🔍 INICIANDO VERIFICAÇÃO DO BANCO DE DADOS...' as status;
SELECT '' as blank;

-- =====================================================
-- 1. VERIFICAR TABELAS
-- =====================================================
SELECT '📊 1. VERIFICANDO TABELAS' as step;
SELECT '' as blank;

SELECT 
    COUNT(*) as total_tabelas,
    CASE 
        WHEN COUNT(*) = 16 THEN '✅ CORRETO'
        ELSE '❌ ERRO: Esperado 16 tabelas'
    END as resultado
FROM information_schema.tables 
WHERE table_schema = 'mundo_dos_bots';

SELECT table_name as tabela_criada
FROM information_schema.tables 
WHERE table_schema = 'mundo_dos_bots'
ORDER BY table_name;

SELECT '' as blank;

-- =====================================================
-- 2. VERIFICAR USUÁRIO ADMIN
-- =====================================================
SELECT '👤 2. VERIFICANDO USUÁRIO ADMIN' as step;
SELECT '' as blank;

SELECT 
    CASE 
        WHEN COUNT(*) = 1 THEN '✅ Usuário admin criado com sucesso'
        ELSE '❌ ERRO: Usuário admin não encontrado'
    END as resultado,
    MAX(email) as email,
    MAX(name) as nome,
    MAX(role) as papel
FROM users 
WHERE role = 'admin';

SELECT '' as blank;

-- =====================================================
-- 3. VERIFICAR CATEGORIAS
-- =====================================================
SELECT '📁 3. VERIFICANDO CATEGORIAS DO BLOG' as step;
SELECT '' as blank;

SELECT 
    COUNT(*) as total_categorias,
    CASE 
        WHEN COUNT(*) >= 5 THEN '✅ CORRETO'
        ELSE '❌ ERRO: Esperado pelo menos 5 categorias'
    END as resultado
FROM categories;

SELECT name as categoria, slug, is_active 
FROM categories 
ORDER BY id;

SELECT '' as blank;

-- =====================================================
-- 4. VERIFICAR CONFIGURAÇÕES DO SITE
-- =====================================================
SELECT '⚙️ 4. VERIFICANDO CONFIGURAÇÕES DO SITE' as step;
SELECT '' as blank;

SELECT 
    COUNT(*) as total_configuracoes,
    CASE 
        WHEN COUNT(*) >= 20 THEN '✅ CORRETO'
        ELSE '❌ ERRO: Esperado pelo menos 20 configurações'
    END as resultado
FROM site_settings;

SELECT setting_key as config, setting_value as valor
FROM site_settings 
WHERE setting_key IN ('site_name', 'company_name', 'contact_email', 'contact_whatsapp', 'primary_color')
ORDER BY setting_key;

SELECT '' as blank;

-- =====================================================
-- 5. VERIFICAR SERVIÇOS
-- =====================================================
SELECT '🛠️ 5. VERIFICANDO SERVIÇOS' as step;
SELECT '' as blank;

SELECT 
    COUNT(*) as total_servicos,
    CASE 
        WHEN COUNT(*) >= 3 THEN '✅ CORRETO'
        ELSE '❌ ERRO: Esperado pelo menos 3 serviços'
    END as resultado
FROM services;

SELECT name as servico, slug, is_featured, is_active 
FROM services 
ORDER BY id;

SELECT '' as blank;

-- =====================================================
-- 6. VERIFICAR SOLUÇÕES POR OBJETIVO
-- =====================================================
SELECT '🎯 6. VERIFICANDO SOLUÇÕES POR OBJETIVO' as step;
SELECT '' as blank;

SELECT 
    COUNT(*) as total_solucoes,
    CASE 
        WHEN COUNT(*) >= 4 THEN '✅ CORRETO'
        ELSE '❌ ERRO: Esperado pelo menos 4 soluções'
    END as resultado
FROM solutions_by_objective;

SELECT name as solucao, slug, is_active 
FROM solutions_by_objective 
ORDER BY order_position;

SELECT '' as blank;

-- =====================================================
-- 7. VERIFICAR SOLUÇÕES POR SETOR
-- =====================================================
SELECT '🏢 7. VERIFICANDO SOLUÇÕES POR SETOR' as step;
SELECT '' as blank;

SELECT 
    COUNT(*) as total_setores,
    CASE 
        WHEN COUNT(*) >= 5 THEN '✅ CORRETO'
        ELSE '❌ ERRO: Esperado pelo menos 5 setores'
    END as resultado
FROM solutions_by_sector;

SELECT name as setor, slug, is_active 
FROM solutions_by_sector 
ORDER BY order_position;

SELECT '' as blank;

-- =====================================================
-- 8. VERIFICAR SOLUÇÕES POR PRODUTO
-- =====================================================
SELECT '📦 8. VERIFICANDO SOLUÇÕES POR PRODUTO' as step;
SELECT '' as blank;

SELECT 
    COUNT(*) as total_produtos,
    CASE 
        WHEN COUNT(*) >= 4 THEN '✅ CORRETO'
        ELSE '❌ ERRO: Esperado pelo menos 4 produtos'
    END as resultado
FROM solutions_by_product;

SELECT name as produto, slug, is_active 
FROM solutions_by_product 
ORDER BY order_position;

SELECT '' as blank;

-- =====================================================
-- 9. VERIFICAR CONTEÚDO DA HOME
-- =====================================================
SELECT '🏠 9. VERIFICANDO CONTEÚDO DA PÁGINA INICIAL' as step;
SELECT '' as blank;

SELECT 
    COUNT(*) as total_secoes,
    CASE 
        WHEN COUNT(*) >= 3 THEN '✅ CORRETO'
        ELSE '❌ ERRO: Esperado pelo menos 3 seções'
    END as resultado
FROM home_content;

SELECT section_name as secao, title as titulo, is_active 
FROM home_content 
ORDER BY order_position;

SELECT '' as blank;

-- =====================================================
-- 10. VERIFICAR ÍNDICES
-- =====================================================
SELECT '🔗 10. VERIFICANDO ÍNDICES' as step;
SELECT '' as blank;

SELECT 
    table_name as tabela,
    COUNT(DISTINCT index_name) as total_indices
FROM information_schema.statistics
WHERE table_schema = 'mundo_dos_bots'
GROUP BY table_name
ORDER BY total_indices DESC;

SELECT '' as blank;

-- =====================================================
-- 11. VERIFICAR FOREIGN KEYS
-- =====================================================
SELECT '🔐 11. VERIFICANDO CHAVES ESTRANGEIRAS (FOREIGN KEYS)' as step;
SELECT '' as blank;

SELECT 
    COUNT(DISTINCT constraint_name) as total_foreign_keys,
    CASE 
        WHEN COUNT(DISTINCT constraint_name) >= 5 THEN '✅ CORRETO'
        ELSE '❌ AVISO: Poucas foreign keys encontradas'
    END as resultado
FROM information_schema.key_column_usage
WHERE table_schema = 'mundo_dos_bots'
AND referenced_table_name IS NOT NULL;

SELECT 
    table_name as tabela,
    column_name as coluna,
    referenced_table_name as tabela_referenciada,
    referenced_column_name as coluna_referenciada
FROM information_schema.key_column_usage
WHERE table_schema = 'mundo_dos_bots'
AND referenced_table_name IS NOT NULL
ORDER BY table_name;

SELECT '' as blank;

-- =====================================================
-- 12. VERIFICAR VIEWS
-- =====================================================
SELECT '👁️ 12. VERIFICANDO VIEWS' as step;
SELECT '' as blank;

SELECT 
    COUNT(*) as total_views,
    CASE 
        WHEN COUNT(*) >= 3 THEN '✅ CORRETO'
        ELSE '❌ ERRO: Esperado pelo menos 3 views'
    END as resultado
FROM information_schema.views
WHERE table_schema = 'mundo_dos_bots';

SELECT table_name as view_criada
FROM information_schema.views
WHERE table_schema = 'mundo_dos_bots'
ORDER BY table_name;

SELECT '' as blank;

-- =====================================================
-- 13. VERIFICAR STORED PROCEDURES
-- =====================================================
SELECT '⚡ 13. VERIFICANDO STORED PROCEDURES' as step;
SELECT '' as blank;

SELECT 
    COUNT(*) as total_procedures,
    CASE 
        WHEN COUNT(*) >= 3 THEN '✅ CORRETO'
        ELSE '⚠️ AVISO: Menos de 3 procedures encontradas'
    END as resultado
FROM information_schema.routines
WHERE routine_schema = 'mundo_dos_bots'
AND routine_type = 'PROCEDURE';

SELECT routine_name as procedure_criada
FROM information_schema.routines
WHERE routine_schema = 'mundo_dos_bots'
AND routine_type = 'PROCEDURE'
ORDER BY routine_name;

SELECT '' as blank;

-- =====================================================
-- 14. VERIFICAR EVENTS (AGENDAMENTOS)
-- =====================================================
SELECT '⏰ 14. VERIFICANDO EVENTOS AGENDADOS' as step;
SELECT '' as blank;

SELECT 
    @@event_scheduler as scheduler_status,
    CASE 
        WHEN @@event_scheduler = 'ON' THEN '✅ Event Scheduler ATIVO'
        ELSE '⚠️ AVISO: Event Scheduler INATIVO - Execute: SET GLOBAL event_scheduler = ON;'
    END as resultado;

SELECT 
    COUNT(*) as total_events,
    CASE 
        WHEN COUNT(*) >= 2 THEN '✅ CORRETO'
        ELSE '⚠️ AVISO: Menos de 2 eventos encontrados'
    END as resultado
FROM information_schema.events
WHERE event_schema = 'mundo_dos_bots';

SELECT 
    event_name as evento,
    status,
    interval_value,
    interval_field,
    last_executed as ultima_execucao
FROM information_schema.events
WHERE event_schema = 'mundo_dos_bots'
ORDER BY event_name;

SELECT '' as blank;

-- =====================================================
-- 15. VERIFICAR TRIGGERS
-- =====================================================
SELECT '🎬 15. VERIFICANDO TRIGGERS' as step;
SELECT '' as blank;

SELECT 
    COUNT(*) as total_triggers,
    CASE 
        WHEN COUNT(*) >= 1 THEN '✅ CORRETO'
        ELSE '⚠️ AVISO: Nenhum trigger encontrado'
    END as resultado
FROM information_schema.triggers
WHERE trigger_schema = 'mundo_dos_bots';

SELECT 
    trigger_name as trigger,
    event_manipulation as evento,
    event_object_table as tabela,
    action_timing as momento
FROM information_schema.triggers
WHERE trigger_schema = 'mundo_dos_bots'
ORDER BY trigger_name;

SELECT '' as blank;

-- =====================================================
-- 16. VERIFICAR CHARSET E COLLATION
-- =====================================================
SELECT '🔤 16. VERIFICANDO CHARSET E COLLATION' as step;
SELECT '' as blank;

SELECT 
    default_character_set_name as charset,
    default_collation_name as collation,
    CASE 
        WHEN default_character_set_name = 'utf8mb4' THEN '✅ CORRETO'
        ELSE '⚠️ AVISO: Recomendado utf8mb4'
    END as resultado
FROM information_schema.schemata
WHERE schema_name = 'mundo_dos_bots';

SELECT '' as blank;

-- =====================================================
-- 17. VERIFICAR TAMANHO DO BANCO
-- =====================================================
SELECT '💾 17. VERIFICANDO TAMANHO DO BANCO DE DADOS' as step;
SELECT '' as blank;

SELECT 
    table_schema AS banco,
    ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS tamanho_mb,
    ROUND(SUM(data_length) / 1024 / 1024, 2) AS dados_mb,
    ROUND(SUM(index_length) / 1024 / 1024, 2) AS indices_mb,
    COUNT(*) as total_tabelas
FROM information_schema.tables
WHERE table_schema = 'mundo_dos_bots'
GROUP BY table_schema;

SELECT '' as blank;

-- =====================================================
-- 18. ESTATÍSTICAS GERAIS
-- =====================================================
SELECT '📈 18. ESTATÍSTICAS GERAIS DO SISTEMA' as step;
SELECT '' as blank;

SELECT 
    (SELECT COUNT(*) FROM users) as total_usuarios,
    (SELECT COUNT(*) FROM categories) as total_categorias,
    (SELECT COUNT(*) FROM blog_posts) as total_posts,
    (SELECT COUNT(*) FROM services) as total_servicos,
    (SELECT COUNT(*) FROM contacts) as total_contatos,
    (SELECT COUNT(*) FROM franchise_applications) as total_franquias,
    (SELECT COUNT(*) FROM job_applications) as total_candidaturas;

SELECT '' as blank;

-- =====================================================
-- RESUMO FINAL
-- =====================================================
SELECT '✅ RESUMO DA VERIFICAÇÃO' as titulo;
SELECT '' as blank;

SELECT 
    '✅ Database criado' as item,
    'mundo_dos_bots' as detalhes
UNION ALL
SELECT 
    '✅ Tabelas criadas',
    CONCAT(COUNT(*), ' tabelas')
FROM information_schema.tables 
WHERE table_schema = 'mundo_dos_bots'
UNION ALL
SELECT 
    '✅ Usuário admin',
    CONCAT('Email: ', email)
FROM users 
WHERE role = 'admin'
LIMIT 1
UNION ALL
SELECT 
    '✅ Dados iniciais',
    CONCAT(
        (SELECT COUNT(*) FROM categories), ' categorias, ',
        (SELECT COUNT(*) FROM services), ' serviços, ',
        (SELECT COUNT(*) FROM solutions_by_objective), ' soluções'
    )
UNION ALL
SELECT 
    '✅ Configurações',
    CONCAT((SELECT COUNT(*) FROM site_settings), ' configs do site')
UNION ALL
SELECT 
    '✅ Views',
    CONCAT(COUNT(*), ' views criadas')
FROM information_schema.views
WHERE table_schema = 'mundo_dos_bots'
UNION ALL
SELECT 
    '✅ Procedures',
    CONCAT(COUNT(*), ' procedures')
FROM information_schema.routines
WHERE routine_schema = 'mundo_dos_bots'
AND routine_type = 'PROCEDURE'
UNION ALL
SELECT 
    '✅ Eventos',
    CONCAT(COUNT(*), ' eventos agendados')
FROM information_schema.events
WHERE event_schema = 'mundo_dos_bots'
UNION ALL
SELECT 
    '✅ Charset',
    default_character_set_name
FROM information_schema.schemata
WHERE schema_name = 'mundo_dos_bots';

SELECT '' as blank;
SELECT '🎉 VERIFICAÇÃO CONCLUÍDA!' as status;
SELECT '📋 Revise os resultados acima para confirmar que tudo está correto.' as instrucao;
SELECT '' as blank;
SELECT '🔐 LEMBRE-SE: Altere a senha padrão do admin!' as aviso_importante;
SELECT '   Email: admin@mundodosbots.com.br' as credenciais;
SELECT '   Senha: admin123' as credenciais;
SELECT '' as blank;
SELECT '🚀 Sistema pronto para uso!' as final_message;

