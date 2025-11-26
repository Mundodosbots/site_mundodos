# Script para build e push das imagens para Docker Hub
# Uso: .\build-and-push.ps1

Write-Host "🐳 Build e Push para Docker Hub" -ForegroundColor Cyan
Write-Host ""

# Login no Docker Hub
Write-Host "🔐 Fazendo login no Docker Hub..." -ForegroundColor Yellow
docker login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer login no Docker Hub" -ForegroundColor Red
    exit 1
}

# Build e Push do Backend
Write-Host ""
Write-Host "🔨 Building backend image..." -ForegroundColor Yellow
docker build -t mundodosbots/lp_mundodos:backend -f backend/Dockerfile ./backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer build do backend" -ForegroundColor Red
    exit 1
}

Write-Host "📤 Pushing backend image..." -ForegroundColor Yellow
docker push mundodosbots/lp_mundodos:backend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push do backend" -ForegroundColor Red
    exit 1
}

# Build e Push do Frontend
Write-Host ""
Write-Host "🔨 Building frontend image..." -ForegroundColor Yellow
docker build -t mundodosbots/lp_mundodos:frontend `
  --build-arg REACT_APP_API_URL=https://api.mundodosbots.com.br/api .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer build do frontend" -ForegroundColor Red
    exit 1
}

Write-Host "📤 Pushing frontend image..." -ForegroundColor Yellow
docker push mundodosbots/lp_mundodos:frontend

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer push do frontend" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build e Push concluídos com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Imagens criadas no Docker Hub:" -ForegroundColor Cyan
Write-Host "  - mundodosbots/lp_mundodos:backend" -ForegroundColor White
Write-Host "  - mundodosbots/lp_mundodos:frontend" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Agora você pode fazer deploy no Portainer!" -ForegroundColor Green

