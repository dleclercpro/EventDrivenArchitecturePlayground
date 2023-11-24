import { ServiceName } from '../constants/services';
import { HttpStatusCode } from './HTTPTypes';

export type Service = {
    name: ServiceName,
    protocol: 'http' | 'https',
    host: string,
    port: number,
    uri: string,
};

export type ServiceHealthCheck = {
    timestamp: Date,
    result: HttpStatusCode | -1, // HTTP status code
};