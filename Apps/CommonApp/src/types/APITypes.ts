import { Event } from '.';
import { EventName } from '../constants/events'
import { HttpStatusCode } from './HTTPTypes';
import { Service } from './ServiceTypes'

export type CallMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

export type CallResponse<Data = void> = {
    code: HttpStatusCode,
    data: Data,
};

export type SubscribeRequestData = {
    event: EventName,
    service: Service,
};

export type UnsubscribeRequestData = SubscribeRequestData;

export type PublishRequestData = {
    event: Event,
};

export type NotifyRequestData = PublishRequestData;

export type CreateOrderRequestData = {
    userId: string,
    productId: string,
}

export type DeleteOrderRequestData = {
    userId: string,
    orderId: string,
}