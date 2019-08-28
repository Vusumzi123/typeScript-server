import * as winston from 'winston';
import * as appRoot from 'app-root-path';
import * as path from 'path';

const LEVEL = Symbol.for('level');

var options = {
    file: {
        level: 'info',
        filename: path.join(appRoot.path, '/logs/app.log'),
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        timestap: true,
        colorize: false,
    },
    console: {
        level: process.env.LEVEL || 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            winston.format.simple()
        ),
        handleExceptions: true,
        json: true,
        timestap: true,
        colorize: true,
    },
};


export var LOGGER = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});

export var stream = {
    write: function(meta: any){
        LOGGER.info(meta);
    }
}