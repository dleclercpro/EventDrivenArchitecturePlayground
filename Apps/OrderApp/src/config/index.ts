import { loadEnvironment } from '../../../CommonApp/src/utils/env';
import { ServiceName } from '../../../CommonApp/src/constants/services'
import { Service } from '../../../CommonApp/src/types/ServiceTypes'

export const ENV = loadEnvironment();

export const { APP_PROTOCOL, APP_HOST, APP_PORT } = process.env;
export const APP_URI = `${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`;

// Service
export const SELF_SERVICE: Service = {
    name: ServiceName.Order,
    uri: APP_URI,
};

// Broker service
const { BROKER_APP_PROTOCOL, BROKER_APP_HOST, BROKER_APP_PORT } = process.env;
export const BROKER_SERVICE: Service = {
    name: ServiceName.Broker,
    uri: `${BROKER_APP_PROTOCOL}://${BROKER_APP_HOST}:${BROKER_APP_PORT}`,
};