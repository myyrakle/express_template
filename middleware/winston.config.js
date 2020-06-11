const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const { combine, timestamp, printf } = winston.format;

const customFormat = printf(
  (info) => `${info.timestamp} ${info.level}: ${info.message}`
);

const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winstonDaily({
      level: "debug",
      datePattern: "YYYYMMDD",
      dirname: "./logs",
      filename: `template_debug_%DATE%.log`,
      maxSize: null,
      maxFiles: 14,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYYMMDD",
      dirname: "./logs",
      filename: `template_error_%DATE%.log`,
      maxSize: null,
      maxFiles: 14,
    }),
  ],
});

const stream = {
  write: (message) => {
    logger.info(message);
  },
  error: (message) => {
    logger.error(message);
  },
};

module.exports = { stream };
