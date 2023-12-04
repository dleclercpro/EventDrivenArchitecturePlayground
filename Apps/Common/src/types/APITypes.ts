import { Event } from '.';
import { EventName } from '../constants/events'
import { ServiceName } from '../constants/services';
import { HttpStatusCode } from './HTTPTypes';

export type CallMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

export type CallResponse<Data = void> = {
    code: HttpStatusCode,
    data: Data,
};

export type SubscribeRequestData = {
    eventName: EventName,
    service: ServiceName,
};

export type UnsubscribeRequestData = SubscribeRequestData;

export type PublishRequestData = {
    event: Event,
    service: ServiceName,
};

export type NotifyRequestData = {
    event: Event,
};

export type CreateOrderRequestData = {
    userId: string,
    productId: string,
}

export type DeleteOrderRequestData = {
    userId: string,
    orderId: string,
}