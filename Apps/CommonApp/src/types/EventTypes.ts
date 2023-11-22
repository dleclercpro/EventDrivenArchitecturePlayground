import { Delivery, Order } from '.';
import { EventName } from '../constants/events';

export type EventOrderCreated = {
    id: string,
    name: EventName.OrderCreated,
    data: Order,
};

export type EventOrderCancelled = {
    id: string,
    name: EventName.OrderCancelled,
    data: Order,
};

export type EventOrderCompleted = {
    id: string,
    name: EventName.OrderCompleted,
    data: Order,
};

export type EventPaymentSuccess = {
    id: string,
    name: EventName.PaymentSuccess,
    data: Order,
};

export type EventPaymentFailure = {
    id: string,
    name: EventName.PaymentFailure,
    data: Order,
};

export type EventDeliveryStarted = {
    id: string,
    name: EventName.DeliveryStarted,
    data: Delivery,
};

export type EventDeliveryCompleted = {
    id: string,
    name: EventName.DeliveryCompleted,
    data: Delivery,
};

export type Events = 
    EventOrderCreated |
    EventOrderCancelled |
    EventOrderCompleted;