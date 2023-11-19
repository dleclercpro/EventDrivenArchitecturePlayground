import { ServiceName } from '../constants/services';
import { HttpStatusCode } from './HTTPTypes';

export type Service = {
    name: ServiceName,
    uri: string,
};

export type ServiceHealthCheck = {
    timestamp: Date,
    result: HttpStatusCode | -1, // HTTP status code
};

export type HealthCheck = {
    Broker: ServiceHealthCheck,
    Order: ServiceHealthCheck,
    Payment: ServiceHealthCheck,
    Delivery: ServiceHealthCheck,
};