var winston = require("winston");
var expressWinston = require("express-winston");
require("winston-syslog");

var winstonPapertrail = new winston.transports.Syslog({
  host: process.env.SYSLOG_HOST,
  port: process.env.SYSLOG_PORT,
  localhost: "httpz.app",
  app_name: "api",
});

module.exports = expressWinston.logger({
  transports: [new winston.transports.Console(), winstonPapertrail],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
});
