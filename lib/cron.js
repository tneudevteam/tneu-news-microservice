const CronJob = require('cron').CronJob;
const http = require('http');

const cronEvery5minutes = '*/5 * * * *';
const requestOptions = {
  host: 'localhost',
  port: 9191,
  path: '/snippets-update'
};

const job = new CronJob(cronEvery5minutes, () => {
  http.request(requestOptions).end();
});

job.start();
