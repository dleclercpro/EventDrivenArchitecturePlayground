import { loadEnvironment } from '../../../../CommonApp/src/utils/env';

export const ENV = loadEnvironment();

export const PROTOCOL = process.env.PROTOCOL;
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;

export const ROOT = `${PROTOCOL}://${HOST}:${PORT}`;