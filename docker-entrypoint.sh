#!/bin/sh
# Script de inicialização para substituir variáveis de ambiente em runtime

set -e

# Substituir REACT_APP_API_URL no arquivo de configuração runtime se a variável estiver definida
if [ -n "$REACT_APP_API_URL" ]; then
  echo "🔧 Configurando REACT_APP_API_URL para: $REACT_APP_API_URL"
  
  # Substituir no arquivo runtime-config.js
  if [ -f /usr/share/nginx/html/runtime-config.js ]; then
    sed -i "s|REACT_APP_API_URL_PLACEHOLDER|$REACT_APP_API_URL|g" /usr/share/nginx/html/runtime-config.js
    echo "✅ REACT_APP_API_URL configurado com sucesso em runtime-config.js"
    # Verificar se a substituição funcionou
    grep -q "$REACT_APP_API_URL" /usr/share/nginx/html/runtime-config.js && echo "✅ Verificação: URL encontrada no arquivo" || echo "⚠️  Aviso: URL não encontrada após substituição"
  else
    echo "⚠️  Arquivo runtime-config.js não encontrado em /usr/share/nginx/html/"
    ls -la /usr/share/nginx/html/ | head -10
  fi
else
  echo "⚠️  REACT_APP_API_URL não definido, usando valor padrão do build"
fi

# Iniciar Nginx
exec nginx -g "daemon off;"

