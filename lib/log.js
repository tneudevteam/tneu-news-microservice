const winston = require('winston');
const bunyanToWinstonAdapter = require('bunyan-winston-adapter');

// Default to console if not remote destination provided
if (!process.env.LOG_HOST) {
  return module.exports = bunyanToWinstonAdapter.createAdapter(winston);
}

const Papertrail = require('winston-papertrail').Papertrail;
const winstonPapertrail = new winston.transports.Papertrail({
  host: process.env.LOG_HOST,
  port: process.env.LOG_PORT,
  hostname: 'news-microservice'
});
const log = new winston.Logger({
  transports: [winstonPapertrail]
});

module.exports = bunyanToWinstonAdapter.createAdapter(log);
