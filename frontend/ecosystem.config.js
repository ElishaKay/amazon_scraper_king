module.exports = {
  apps : [{
    name: 'Frontend',
    script: "npm",
    args : "start",
    max_memory_restart: '300M',
    instances: 1,
    out_file: "/dev/null",
    error_file: "/dev/null",
    cron_restart: "0 0 * * *"
  }]
}