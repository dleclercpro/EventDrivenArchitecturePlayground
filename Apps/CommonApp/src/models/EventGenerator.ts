import os from 'os';
import { Event } from '../types';
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

    public generateUserLoggedInEvent(data: any) {
        return this.generateEvent(EventName.UserLoggedIn, data);
    }

    public generateUserLoggedOutEvent(data: any) {
        return this.generateEvent(EventName.UserLoggedOut, data);
    }

    public generateOrderCreatedEvent(data: any) {
        return this.generateEvent(EventName.OrderCreated, data);
    }

    public generateOrderCancelledEvent(data: any) {
        return this.generateEvent(EventName.OrderCancelled, data);
    }

    public generateOrderCompletedEvent(data: any) {
        return this.generateEvent(EventName.OrderCompleted, data);
    }

    public generatePaymentSuccessfulEvent(data: any) {
        return this.generateEvent(EventName.PaymentSuccessful, data);
    }

    public generatePaymentUnsuccessfulEvent(data: any) {
        return this.generateEvent(EventName.PaymentUnsuccessful, data);
    }

    public generateDeliveryStartedEvent(data: any) {
        return this.generateEvent(EventName.DeliveryStarted, data);
    }

    public generateDeliveryAbortedEvent(data: any) {
        return this.generateEvent(EventName.DeliveryAborted, data);
    }

    public generateDeliveryCompletedEvent(data: any) {
        return this.generateEvent(EventName.DeliveryCompleted, data);
    }
}

export default EventGenerator.getInstance();