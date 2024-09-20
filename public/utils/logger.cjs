const winston = require('winston');
require('winston-daily-rotate-file');

const infoTransport = new winston.transports.DailyRotateFile({
    level: 'info',
    filename: 'infolog-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    compressionLevel: 9,
    dirname: "serverlogs"
});

const errorTransport = new winston.transports.DailyRotateFile({
    level: 'error',
    filename: 'errorlog-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    compressionLevel: 9,
    dirname: "serverlogs"
  });

module.exports =  getLogger = () => {
    try {
        return winston.createLogger({
            transports: [
                infoTransport,
                errorTransport
            ]
        })
    } catch (e) {
        console.log("Exception while creating logger" + e);
    }
}