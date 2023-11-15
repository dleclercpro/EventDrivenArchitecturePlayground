import pino, { TransportTargetOptions } from 'pino';
import pretty from 'pino-pretty';
import { Environment } from '../../CommonApp/src/types';
import { PACKAGE_VERSION } from './constants';
import { ENV } from './config';

const getBindings = (bindings: pino.Bindings) => {
    return {
        ...bindings,
        version: PACKAGE_VERSION,
    };
}

const FORMATTERS = {
    bindings: getBindings,
};

const CONSOLE_TRANSPORT: TransportTargetOptions = {
    level: 'debug',
    target: 'pino-pretty',
    options: {
        colorize: true,
        ignore: 'pid,hostname,version',
    },
};



const getLoggerByEnvironment = (env: Environment) => {
    switch (env) {
        case Environment.Test:
            return pino(pretty({ sync: true }));
        default:
            return getLoggerByUseCase();
    }
}

const getLoggerByUseCase = () => {
    return pino({
        level: 'debug',
        formatters: FORMATTERS,
        timestamp: pino.stdTimeFunctions.isoTime,
        transport: CONSOLE_TRANSPORT,
    });
}

export default getLoggerByEnvironment(ENV);