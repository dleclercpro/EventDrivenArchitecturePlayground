import { Event } from '.';
import { EventName } from '../constants/events'
import { HttpStatusCode } from './HTTPTypes';
import { Service } from './ServiceTypes'

export type CallMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';

export type CallResponse<Data = void> = {
    code: HttpStatusCode,
    data: Data,
};

export type SubscribeData = {
    event: EventName,
    service: Service,
};

export type UnsubscribeData = SubscribeData;

export type PublishData = {
    event: Event,
};

export type NotifyData = PublishData;