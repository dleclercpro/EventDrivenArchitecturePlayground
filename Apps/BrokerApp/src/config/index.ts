import { Service } from '../../../CommonApp/src/types/EDA';
import { loadEnvironment } from '../../../CommonApp/src/utils/env';

export const ENV = loadEnvironment();

export const PROTOCOL = process.env.PROTOCOL;
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;

export const ROOT = `${PROTOCOL}://${HOST}:${PORT}`;

export const ORDER_SERVICE: Service = {
    uri: 'http://localhost:3001',
};

export const PAYMENT_SERVICE: Service = {
    uri: 'http://localhost:3002',
};

export const DELIVERY_SERVICE: Service = {
    uri: 'http://localhost:3003',
};

export const SERVICES = [ORDER_SERVICE, PAYMENT_SERVICE, DELIVERY_SERVICE];