const winston = require('winston');
const Papertrail = require('winston-papertrail').Papertrail;
const winstonPapertrail = new winston.transports.Papertrail({
  host: process.env.LOG_HOST,
  port: process.env.LOG_PORT,
  hostname: 'news-microservice'
});
const bunyanToWinstonAdapter = require('bunyan-winston-adapter');
const log = new winston.Logger({
  transports: [winstonPapertrail]
});

module.exports = bunyanToWinstonAdapter.createAdapter(log);
