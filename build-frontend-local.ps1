# Script para build do frontend para uso local
Write-Host "🔨 Building frontend image for local use..." -ForegroundColor Yellow

docker build -t mundodosbots/lp_mundodos:frontend-local `
  --build-arg REACT_APP_API_URL=http://localhost:6010/api .

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer build do frontend" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Frontend local build concluído!" -ForegroundColor Green
Write-Host ""
Write-Host "📦 Imagem criada: mundodosbots/lp_mundodos:frontend-local" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Agora você pode rodar: docker-compose -f docker-compose.local.yml up" -ForegroundColor Green

