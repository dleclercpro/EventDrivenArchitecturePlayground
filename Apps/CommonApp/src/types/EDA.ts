export type Event<Data = any> = {
    id: string,
    name: string,
    data?: Data,
};

export enum ServiceName {
    Broker = 'Broker',
    Order = 'Order',
    Payment = 'Payment',
    Delivery = 'Delivery',
};

export type Service = {
    name: ServiceName,
    uri: string,
};

export type ServiceHealthCheck = {
    timestamp: Date,
    result: number, // HTTP status code
};

export type HealthCheck = {
    Broker: ServiceHealthCheck,
    Order: ServiceHealthCheck,
    Payment: ServiceHealthCheck,
    Delivery: ServiceHealthCheck,
};