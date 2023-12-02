import { Delivery, Order } from '.';
import { Event } from '../types/';
import { EventName } from '../constants/events';

export interface EventOrderCreated extends Event {
    id: string,
    name: EventName.OrderCreated,
    data: Order,
};

export interface EventOrderCancelled extends Event {
    id: string,
    name: EventName.OrderCancelled,
    data: Order,
};

export interface EventOrderCompleted extends Event {
    id: string,
    name: EventName.OrderCompleted,
    data: Order,
};

export interface EventPaymentSuccess extends Event {
    id: string,
    name: EventName.PaymentSuccess,
    data: Order,
};

export interface EventPaymentFailure extends Event {
    id: string,
    name: EventName.PaymentFailure,
    data: Order,
};

export interface EventWorkerSearchStarted extends Event {
    id: string,
    name: EventName.WorkerSearchStarted,
};

export interface EventWorkerSearchCompleted extends Event {
    id: string,
    name: EventName.WorkerSearchCompleted,
};

export interface EventWorkerAcceptedJob extends Event {
    id: string,
    name: EventName.WorkerAcceptedJob,
};

export interface EventWorkerRefusedJob extends Event {
    id: string,
    name: EventName.WorkerRefusedJob,
};

export interface EventDeliveryStarted extends Event {
    id: string,
    name: EventName.DeliveryStarted,
    data: Delivery,
};

export interface EventDeliveryAborted extends Event {
    id: string,
    name: EventName.DeliveryAborted,
    data: Delivery,
};

export interface EventDeliveryCompleted extends Event {
    id: string,
    name: EventName.DeliveryCompleted,
    data: Delivery,
};