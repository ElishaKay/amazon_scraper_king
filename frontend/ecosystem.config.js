module.exports = {
  apps : [{
    name: 'Scraper King Frontend',
    script: "npm",
    args : "start",
    instances: 1,
    out_file: "/dev/null",
    error_file: "/dev/null",
    cron_restart: "0 0 * * *"
  }]
}