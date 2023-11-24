import pino, { TransportTargetOptions } from 'pino';
import pretty from 'pino-pretty';
import { Environment } from '../types';

const CONSOLE_TRANSPORT: TransportTargetOptions = {
    level: 'trace',
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
                level: 'trace',
                timestamp: pino.stdTimeFunctions.isoTime,
                transport: CONSOLE_TRANSPORT,
            });
    }
}