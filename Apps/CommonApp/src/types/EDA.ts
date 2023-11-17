export type Event<Data = any> = {
    id: string,
    name: string,
    data?: Data,
}

export enum ServiceName {
    Broker = 'Broker',
    Order = 'Order',
    Payment = 'Payment',
    Delivery = 'Delivery',
}

export type Service = {
    name: ServiceName,
    uri: string,
};

export type HealthCheck = {
    Broker: number,
    Order: number,
    Payment: number,
    Delivery: number,
}