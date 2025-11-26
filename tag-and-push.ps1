# Script para fazer tag e push das imagens existentes
# Uso: .\tag-and-push.ps1

Write-Host "🏷️ Tag e Push das imagens para Docker Hub" -ForegroundColor Cyan
Write-Host ""

# Login no Docker Hub
Write-Host "🔐 Fazendo login no Docker Hub..." -ForegroundColor Yellow
docker login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer login no Docker Hub" -ForegroundColor Red
    exit 1
}

# Tag e Push do Backend
Write-Host ""
Write-Host "🏷️ Tagging backend image..." -ForegroundColor Yellow
docker tag mundodosbots/mundo-dos-bots-backend:latest mundodosbots/lp_mundodos:backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer tag do backend" -ForegroundColor Red
    exit 1
}

Write-Host "📤 Pushing backend image..." -ForegroundColor Yellow
docker push mundodosbots/lp_mundodos:backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push do backend" -ForegroundColor Red
    exit 1
}

# Tag e Push do Frontend
Write-Host ""
Write-Host "🏷️ Tagging frontend image..." -ForegroundColor Yellow
docker tag mundodosbots/mundo-dos-bots-frontend:latest mundodosbots/lp_mundodos:frontend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer tag do frontend" -ForegroundColor Red
    exit 1
}

Write-Host "📤 Pushing frontend image..." -ForegroundColor Yellow
docker push mundodosbots/lp_mundodos:frontend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push do frontend" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Tag e Push concluídos com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Imagens no Docker Hub:" -ForegroundColor Cyan
Write-Host "  - mundodosbots/lp_mundodos:backend" -ForegroundColor White
Write-Host "  - mundodosbots/lp_mundodos:frontend" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Agora você pode fazer deploy no Portainer!" -ForegroundColor Green

