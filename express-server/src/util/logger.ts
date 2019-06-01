import * as log4js from 'log4js';
export class Logger {
    private static systemLogger;
    private static accessLogger;

    static init() {
        const config = require('../config/log4js_setting.json');
        log4js.configure(config);
        Logger.systemLogger = log4js.getLogger();
        Logger.accessLogger = log4js.getLogger('web');
    }

    static getSystemLogger(): log4js.Logger {
        return Logger.systemLogger;
    }

    static getAccessLogger(): log4js.Logger {
        return Logger.accessLogger;
    }

    static info(log: string) {
        Logger.systemLogger.info(log);
    }

    static log(log: string) {
        Logger.systemLogger.log(log);
    }

    static err(log: string) {
        Logger.systemLogger.err(log);
    }
}
