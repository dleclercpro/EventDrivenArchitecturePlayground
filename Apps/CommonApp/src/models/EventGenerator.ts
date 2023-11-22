import os from 'os';
import { Event, Order } from '../types';
import { EventName } from '../constants/events';

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
            name,
            data,
        };
    }

    public generateOrderCreatedEvent(data: { orderId: string, userId: string, productId: string }) {
        return this.generateEvent(EventName.OrderCreated, data);
    }

    public generateOrderCancelledEvent(data: any) {
        return this.generateEvent(EventName.OrderCancelled, data);
    }

    public generateOrderCompletedEvent(data: any) {
        return this.generateEvent(EventName.OrderCompleted, data);
    }

    public generatePaymentSuccessEvent(data: any) {
        return this.generateEvent(EventName.PaymentSuccess, data);
    }

    public generatePaymentFailureEvent(data: any) {
        return this.generateEvent(EventName.PaymentFailure, data);
    }

    public generateDeliveryStartedEvent(data: Order) {
        return this.generateEvent(EventName.DeliveryStarted, data);
    }

    public generateDeliveryCompletedEvent(data: Order) {
        return this.generateEvent(EventName.DeliveryCompleted, data);
    }
}

export default EventGenerator.getInstance();