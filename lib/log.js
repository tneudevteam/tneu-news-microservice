const winston = require('winston');
const bunyanToWinstonAdapter = require('bunyan-winston-adapter');

if (process.env.LOG_HOST) {
  require('winston-papertrail').Papertrail; // eslint-disable-line no-unused-expressions
  const winstonPapertrail = new winston.transports.Papertrail({
    host: process.env.LOG_HOST,
    port: process.env.LOG_PORT,
    hostname: 'news-microservice'
  });
  const log = new winston.Logger({
    transports: [winstonPapertrail]
  });

  module.exports = bunyanToWinstonAdapter.createAdapter(log);
} else {
  // Default to console if not remote destination provided
  module.exports = bunyanToWinstonAdapter.createAdapter(winston);
}
