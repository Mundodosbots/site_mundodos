module.exports = {
  apps: [{
    name: 'mundodosbots-api',
    script: 'server.js',
    cwd: '/var/www/mundodosbots/backend',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    log_file: '/var/log/mundodosbots/combined.log',
    out_file: '/var/log/mundodosbots/out.log',
    error_file: '/var/log/mundodosbots/error.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    max_memory_restart: '1G',
    restart_delay: 4000,
    max_restarts: 10,
    min_uptime: '10s'
  }]
};
