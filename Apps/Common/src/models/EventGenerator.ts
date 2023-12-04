import os from 'os';
import { Delivery, Event, Order } from '../types';
import { EventName } from '../constants/events';
import { EventDeliveryAborted, EventDeliveryCompleted, EventDeliveryStarted, EventOrderCancelled, EventOrderCompleted, EventOrderCreated, EventPaymentFailure, EventPaymentSuccess, EventWorkerAcceptedJob, EventWorkerSearchCompleted, EventWorkerRefusedJob } from '../types/EventTypes';

class EventGenerator {
    private static instance?: EventGenerator;

    private constructor() {

    }

    public static getInstance() {
        if (!EventGenerator.instance) {
            EventGenerator.instance = new EventGenerator();
        }
        
        return EventGenerator.instance;
    }

    protected generateEventId(name: EventName): string {
        return `${name}-${os.hostname}-${new Date().getTime()}`;
    }

    protected generateEvent<Data>(name: EventName, data: Data): Event<Data> {
        return {
            id: this.generateEventId(name),
            time: new Date(),
            name,
            data,
        };
    }

    public generateOrderCreatedEvent(data: Order) {
        return this.generateEvent(EventName.OrderCreated, data) as EventOrderCreated;
    }

    public generateOrderCancelledEvent(data: Order) {
        return this.generateEvent(EventName.OrderCancelled, data) as EventOrderCancelled;
    }

    public generateOrderCompletedEvent(data: Order) {
        return this.generateEvent(EventName.OrderCompleted, data) as EventOrderCompleted;
    }

    public generatePaymentSuccessEvent(data: Order) {
        return this.generateEvent(EventName.PaymentSuccess, data) as EventPaymentSuccess;
    }

    public generatePaymentFailureEvent(data: Order) {
        return this.generateEvent(EventName.PaymentFailure, data) as EventPaymentFailure;
    }

    public generateWorkerSearchStartedEvent(data: Order) {
        return this.generateEvent(EventName.WorkerSearchStarted, data) as EventWorkerSearchCompleted;
    }

    public generateWorkerSearchCompletedEvent(data: Order) {
        return this.generateEvent(EventName.WorkerSearchCompleted, data) as EventWorkerSearchCompleted;
    }

    public generateWorkerAcceptedJobEvent(data: Order) {
        return this.generateEvent(EventName.WorkerAcceptedJob, data) as EventWorkerAcceptedJob;
    }

    public generateWorkerRefusedJobEvent(data: Order) {
        return this.generateEvent(EventName.WorkerRefusedJob, data) as EventWorkerRefusedJob;
    }

    public generateDeliveryStartedEvent(data: Delivery) {
        return this.generateEvent(EventName.DeliveryStarted, data) as EventDeliveryStarted;
    }

    public generateDeliveryAbortedEvent(data: Delivery) {
        return this.generateEvent(EventName.DeliveryAborted, data) as EventDeliveryAborted;
    }

    public generateDeliveryCompletedEvent(data: Delivery) {
        return this.generateEvent(EventName.DeliveryCompleted, data) as EventDeliveryCompleted;
    }
}

export default EventGenerator.getInstance();