import { Event } from '.';
import { EventName } from '../constants/events'
import { Service } from './ServiceTypes'

export type SubscribeData = {
    event: EventName,
    service: Service,
};

export type UnsubscribeData = SubscribeData;

export type PublishData = {
    event: Event,
};

export type NotifyData = PublishData;