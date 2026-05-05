'use strict';

const Logger = {
    DEBUG_MODE: true,
    LEVELS: {
        DEBUG: 'debug',
        INFO: 'info',
        WARN: 'warn',
        ERROR: 'error'
    },

    _formatMessage(level, message, data) {
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
        let logMessage = `${prefix} ${message}`;
        if (data !== undefined) {
            logMessage += ` ${JSON.stringify(data)}`;
        }
        return logMessage;
    },

    debug(message, data) {
        if (this.DEBUG_MODE) {
            console.debug(this._formatMessage(this.LEVELS.DEBUG, message, data));
        }
    },

    info(message, data) {
        if (this.DEBUG_MODE) {
            console.info(this._formatMessage(this.LEVELS.INFO, message, data));
        }
    },

    warn(message, data) {
        if (this.DEBUG_MODE) {
            console.warn(this._formatMessage(this.LEVELS.WARN, message, data));
        }
    },

    error(message, error) {
        if (this.DEBUG_MODE) {
            if (error instanceof Error) {
                console.error(this._formatMessage(this.LEVELS.ERROR, message), error);
            } else {
                console.error(this._formatMessage(this.LEVELS.ERROR, message, error));
            }
        }
    }
};

window.Logger = Logger;
