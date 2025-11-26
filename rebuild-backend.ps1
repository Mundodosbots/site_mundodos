# Script para rebuild e push do backend
Write-Host "🔨 Rebuilding backend image..." -ForegroundColor Yellow

docker build -t mundodosbots/mundo-dos-bots-backend:latest -f backend/Dockerfile ./backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer build do backend" -ForegroundColor Red
    exit 1
}

Write-Host "🏷️ Tagging backend image..." -ForegroundColor Yellow
docker tag mundodosbots/mundo-dos-bots-backend:latest mundodosbots/lp_mundodos:backend

Write-Host "📤 Pushing backend image..." -ForegroundColor Yellow
docker push mundodosbots/lp_mundodos:backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push do backend" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Backend rebuild e push concluídos!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Agora faça 'Pull and redeploy' no Portainer" -ForegroundColor Cyan

