import { ServiceName, Service } from '../../../CommonApp/src/types/EDA';
import { loadEnvironment } from '../../../CommonApp/src/utils/env';

export const ENV = loadEnvironment();

export const { APP_PROTOCOL, APP_HOST, APP_PORT } = process.env;
export const APP_URI = `${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`;

// Order service
const { ORDER_APP_PROTOCOL, ORDER_APP_HOST, ORDER_APP_PORT } = process.env;
export const ORDER_SERVICE: Service = {
    name: ServiceName.Order,
    uri: `${ORDER_APP_PROTOCOL}://${ORDER_APP_HOST}:${ORDER_APP_PORT}`,
};

// Payment service
const { PAYMENT_APP_PROTOCOL, PAYMENT_APP_HOST, PAYMENT_APP_PORT } = process.env;
export const PAYMENT_SERVICE: Service = {
    name: ServiceName.Payment,
    uri: `${PAYMENT_APP_PROTOCOL}://${PAYMENT_APP_HOST}:${PAYMENT_APP_PORT}`,
};

// Delivery service
const { DELIVERY_APP_PROTOCOL, DELIVERY_APP_HOST, DELIVERY_APP_PORT } = process.env;
export const DELIVERY_SERVICE: Service = {
    name: ServiceName.Delivery,
    uri: `${DELIVERY_APP_PROTOCOL}://${DELIVERY_APP_HOST}:${DELIVERY_APP_PORT}`,
};

export const SERVICES = [ORDER_SERVICE, PAYMENT_SERVICE, DELIVERY_SERVICE];