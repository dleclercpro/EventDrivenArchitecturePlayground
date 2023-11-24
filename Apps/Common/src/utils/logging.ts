import pino, { TransportTargetOptions } from 'pino';
import pretty from 'pino-pretty';
import { Environment } from '../types';
import { LOGGING_LEVEL } from '../config';

const CONSOLE_TRANSPORT: TransportTargetOptions = {
    level: LOGGING_LEVEL,
    target: 'pino-pretty',
    options: {
        colorize: true,
        ignore: 'pid,hostname,version',
    },
};

export const getLoggerByEnvironment = (env: Environment) => {
    switch (env) {
        case Environment.Test:
            return pino(pretty({ sync: true }));
        default:
            return pino({
                level: LOGGING_LEVEL,
                timestamp: pino.stdTimeFunctions.isoTime,
                transport: CONSOLE_TRANSPORT,
            });
    }
}