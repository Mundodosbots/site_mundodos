# Script para fazer push das imagens para Docker Hub
# Uso: .\push-images.ps1

Write-Host "🐳 Push das imagens para Docker Hub" -ForegroundColor Cyan
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

# Push do Backend
Write-Host ""
Write-Host "📤 Pushing backend image (lp_mundodos_site:backend)..." -ForegroundColor Yellow
docker push lp_mundodos_site:backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push do backend" -ForegroundColor Red
    Write-Host "💡 Dica: Certifique-se de que a imagem foi criada com: docker build -t lp_mundodos_site:backend -f backend/Dockerfile ./backend" -ForegroundColor Yellow
    exit 1
}

# Push do Frontend
Write-Host ""
Write-Host "📤 Pushing frontend image (lp_mundodos_site:frontend)..." -ForegroundColor Yellow
docker push lp_mundodos_site:frontend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push do frontend" -ForegroundColor Red
    Write-Host "💡 Dica: Certifique-se de que a imagem foi criada com: docker build -t lp_mundodos_site:frontend ." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "✅ Push concluído com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Imagens no Docker Hub:" -ForegroundColor Cyan
Write-Host "  - lp_mundodos_site:backend" -ForegroundColor White
Write-Host "  - lp_mundodos_site:frontend" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Agora você pode usar o docker-compose.yml no Portainer!" -ForegroundColor Green

