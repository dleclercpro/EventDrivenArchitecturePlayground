import { Service } from '../../../../CommonApp/src/types/EDA';
import { loadEnvironment } from '../../../../CommonApp/src/utils/env';

export const ENV = loadEnvironment();

export const PROTOCOL = process.env.PROTOCOL;
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const ROOT = `${PROTOCOL}://${HOST}:${PORT}`;

const { ORDER_APP_PROTOCOL, ORDER_APP_HOST, ORDER_APP_PORT } = process.env;
export const ORDER_SERVICE: Service = {
    uri: `${ORDER_APP_PROTOCOL}://${ORDER_APP_HOST}:${ORDER_APP_PORT}`,
};

const { PAYMENT_APP_PROTOCOL, PAYMENT_APP_HOST, PAYMENT_APP_PORT } = process.env;
export const PAYMENT_SERVICE: Service = {
    uri: `${PAYMENT_APP_PROTOCOL}://${PAYMENT_APP_HOST}:${PAYMENT_APP_PORT}`,
};

const { DELIVERY_APP_PROTOCOL, DELIVERY_APP_HOST, DELIVERY_APP_PORT } = process.env;
export const DELIVERY_SERVICE: Service = {
    uri: `${DELIVERY_APP_PROTOCOL}://${DELIVERY_APP_HOST}:${DELIVERY_APP_PORT}`,
};

export const SERVICES = [ORDER_SERVICE, PAYMENT_SERVICE, DELIVERY_SERVICE];