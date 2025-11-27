# Script para rebuild e push das imagens atualizadas para Docker Hub
# Uso: .\rebuild-and-push.ps1

Write-Host "🐳 Rebuild e Push para Docker Hub" -ForegroundColor Cyan
Write-Host ""

# Verificar se está logado no Docker Hub
Write-Host "🔐 Verificando login no Docker Hub..." -ForegroundColor Yellow
docker info | Select-String -Pattern "Username" | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Não está logado no Docker Hub. Fazendo login..." -ForegroundColor Yellow
    docker login
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao fazer login no Docker Hub" -ForegroundColor Red
        exit 1
    }
}

# Rebuild e Push do Backend
Write-Host ""
Write-Host "🔨 Building backend image..." -ForegroundColor Yellow
docker build -t mundodosbots/lp_mundodos_site:backend -f backend/Dockerfile ./backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer build do backend" -ForegroundColor Red
    exit 1
}

Write-Host "📤 Pushing backend image..." -ForegroundColor Yellow
docker push mundodosbots/lp_mundodos_site:backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push do backend" -ForegroundColor Red
    exit 1
}

# Rebuild e Push do Frontend
Write-Host ""
Write-Host "🔨 Building frontend image..." -ForegroundColor Yellow
docker build -t mundodosbots/lp_mundodos_site:frontend .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer build do frontend" -ForegroundColor Red
    exit 1
}

Write-Host "📤 Pushing frontend image..." -ForegroundColor Yellow
docker push mundodosbots/lp_mundodos_site:frontend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push do frontend" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Rebuild e Push concluídos com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Imagens atualizadas no Docker Hub:" -ForegroundColor Cyan
Write-Host "  - mundodosbots/lp_mundodos_site:backend" -ForegroundColor White
Write-Host "  - mundodosbots/lp_mundodos_site:frontend" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Próximos passos:" -ForegroundColor Yellow
Write-Host "  1. Acesse o Portainer" -ForegroundColor White
Write-Host "  2. Vá na stack e clique em 'Editor'" -ForegroundColor White
Write-Host "  3. Clique em 'Pull and redeploy' para atualizar as imagens" -ForegroundColor White
Write-Host "  4. Ou atualize o docker-compose.yml e faça 'Update the stack'" -ForegroundColor White

