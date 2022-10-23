const { createLogger, transports, format } = require("winston");

const printLogFormat = format.combine(
  format.colorize(),
  //   format.timestamp({
  //     format: "YYYY-MM-DD HH:mm:dd",
  //   }),
  format.simple()
);

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: printLogFormat,
    }),
  ],
});

module.exports = logger;
