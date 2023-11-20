import { EventName } from '../constants/events'
import { Service } from './ServiceTypes'

export type SubscriptionData = {
    event: EventName,
    service: Service,
};