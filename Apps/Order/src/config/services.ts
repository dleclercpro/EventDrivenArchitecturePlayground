import { parseNumberText } from '../../../Common/src/utils/string';
import { ServiceName } from '../../../Common/src/constants/services';
import { Service } from '../../../Common/src/types/ServiceTypes';



// Service
const APP_PROTOCOL = process.env.APP_PROTOCOL as 'http' | 'https';
const APP_HOST = process.env.APP_HOST as string;
const APP_PORT = parseNumberText(process.env.APP_PORT);

export const SERVICE: Service = {
    name: ServiceName.Order,
    protocol: APP_PROTOCOL,
    host: APP_HOST,
    port: APP_PORT,
    uri: `${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`,
};



// Broker service
const BROKER_APP_PROTOCOL = process.env.BROKER_APP_PROTOCOL as 'http' | 'https';
const BROKER_APP_HOST = process.env.BROKER_APP_HOST as string;
const BROKER_APP_PORT = parseNumberText(process.env.BROKER_APP_PORT);

export const BROKER_SERVICE: Service = {
    name: ServiceName.Broker,
    protocol: BROKER_APP_PROTOCOL,
    host: BROKER_APP_HOST,
    port: BROKER_APP_PORT,
    uri: `${BROKER_APP_PROTOCOL}://${BROKER_APP_HOST}:${BROKER_APP_PORT}`,
};