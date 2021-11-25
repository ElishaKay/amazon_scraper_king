module.exports = {
  apps : [{
    name: 'Backend',
    script: 'server.js',
    instances: 1,
    max_memory_restart: '300M',
    out_file: "/dev/null",
    error_file: "/dev/null",
    cron_restart: "0 0 * * *"
  }]
}