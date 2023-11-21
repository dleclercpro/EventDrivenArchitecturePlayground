import { ServiceName } from '../../../CommonApp/src/constants/services';
import { Service } from '../../../CommonApp/src/types/ServiceTypes';
import { parseNumberText } from '../../../CommonApp/src/utils/string';



// Service
const APP_PROTOCOL = process.env.APP_PROTOCOL as 'http' | 'https';
const APP_HOST = process.env.APP_HOST as string;
const APP_PORT = parseNumberText(process.env.APP_PORT);

export const SERVICE: Service = {
    name: ServiceName.Broker,
    protocol: APP_PROTOCOL,
    host: APP_HOST,
    port: APP_PORT,
    uri: `${APP_PROTOCOL}://${APP_HOST}:${APP_PORT}`,
};



// Order service
const ORDER_APP_PROTOCOL = process.env.ORDER_APP_PROTOCOL as 'http' | 'https';
const ORDER_APP_HOST = process.env.ORDER_APP_HOST as string;
const ORDER_APP_PORT = parseNumberText(process.env.ORDER_APP_PORT);

export const ORDER_SERVICE: Service = {
    name: ServiceName.Order,
    protocol: ORDER_APP_PROTOCOL,
    host: ORDER_APP_HOST,
    port: ORDER_APP_PORT,
    uri: `${ORDER_APP_PROTOCOL}://${ORDER_APP_HOST}:${ORDER_APP_PORT}`,
};



// Payment service
const PAYMENT_APP_PROTOCOL = process.env.PAYMENT_APP_PROTOCOL as 'http' | 'https';
const PAYMENT_APP_HOST = process.env.PAYMENT_APP_HOST as string;
const PAYMENT_APP_PORT = parseNumberText(process.env.PAYMENT_APP_PORT);

export const PAYMENT_SERVICE: Service = {
    name: ServiceName.Payment,
    protocol: PAYMENT_APP_PROTOCOL,
    host: PAYMENT_APP_HOST,
    port: PAYMENT_APP_PORT,
    uri: `${PAYMENT_APP_PROTOCOL}://${PAYMENT_APP_HOST}:${PAYMENT_APP_PORT}`,
};



// Delivery service
const DELIVERY_APP_PROTOCOL = process.env.DELIVERY_APP_PROTOCOL as 'http' | 'https';
const DELIVERY_APP_HOST = process.env.DELIVERY_APP_HOST as string;
const DELIVERY_APP_PORT = parseNumberText(process.env.DELIVERY_APP_PORT);

export const DELIVERY_SERVICE: Service = {
    name: ServiceName.Delivery,
    protocol: DELIVERY_APP_PROTOCOL,
    host: DELIVERY_APP_HOST,
    port: DELIVERY_APP_PORT,
    uri: `${DELIVERY_APP_PROTOCOL}://${DELIVERY_APP_HOST}:${DELIVERY_APP_PORT}`,
};



export const SERVICES = new Map<ServiceName, Service>();

SERVICES.set(ServiceName.Broker, SERVICE);
SERVICES.set(ServiceName.Order, ORDER_SERVICE);
SERVICES.set(ServiceName.Payment, PAYMENT_SERVICE);
SERVICES.set(ServiceName.Delivery, DELIVERY_SERVICE);