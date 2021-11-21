module.exports = {
  apps : [{
    name: 'Scraper King Backend',
    script: 'server.js',
    instances: 1,
    out_file: "/dev/null",
    error_file: "/dev/null",
    cron_restart: "0 0 * * *"
  }]
}