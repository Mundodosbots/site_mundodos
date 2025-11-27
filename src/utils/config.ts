// Utilitário para obter configuração em runtime ou build time
declare global {
  interface Window {
    __RUNTIME_CONFIG__?: {
      REACT_APP_API_URL?: string;
    };
  }
}

// Função para obter a URL da API
export const getApiUrl = (): string => {
  // Prioridade 1: Configuração em runtime (via window.__RUNTIME_CONFIG__)
  // Verificar se window está disponível (não está no SSR)
  if (typeof window !== 'undefined') {
    // Aguardar um pouco para garantir que o script foi carregado
    if (window.__RUNTIME_CONFIG__?.REACT_APP_API_URL) {
      const runtimeUrl = window.__RUNTIME_CONFIG__.REACT_APP_API_URL;
      if (runtimeUrl && runtimeUrl !== 'REACT_APP_API_URL_PLACEHOLDER') {
        console.log('🔧 Usando URL da API do runtime-config:', runtimeUrl);
        return runtimeUrl;
      }
    }
    
    // Log para debug
    console.log('⚠️ Runtime config:', window.__RUNTIME_CONFIG__);
  }
  
  // Prioridade 2: Variável de ambiente do build time
  if (process.env.REACT_APP_API_URL) {
    console.log('🔧 Usando URL da API do build time:', process.env.REACT_APP_API_URL);
    return process.env.REACT_APP_API_URL;
  }
  
  // Fallback: URL padrão
  console.log('⚠️ Usando URL padrão da API:', 'http://localhost:5000/api');
  return 'http://localhost:5000/api';
};

// Exportar função e valor inicial
export const API_BASE_URL = getApiUrl();

// Re-exportar função para uso dinâmico se necessário
export const getApiBaseUrl = getApiUrl;

