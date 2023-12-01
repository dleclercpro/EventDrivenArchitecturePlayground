import { EventName } from '../../../Common/src/constants/events';
import { Service } from '../../../Common/src/types/ServiceTypes';
import { EVENTS } from '../config';
import logger from '../logger';

type Subscriptions = Record<EventName, Service[]>;



class SubscriptionsManager {
    private static instance?: SubscriptionsManager;
    protected subscriptions: Subscriptions;

    private constructor() {
        this.subscriptions = {} as Subscriptions;

        // Initialize list of subscribers for each event
        EVENTS.forEach(eventName => {
            this.subscriptions[eventName] = [];
        });
    }

    public static getInstance() {
        if (!SubscriptionsManager.instance) {
            SubscriptionsManager.instance = new SubscriptionsManager();
        }

        return SubscriptionsManager.instance;
    }

    public getSubscribers(eventName: EventName) {
        return this.subscriptions[eventName];
    }

    public has(eventName: EventName, service: Service) {
        const subscribers = this.getSubscribers(eventName);

        return subscribers.findIndex(({ name }) => service.name === name) !== -1;
    }

    public add(eventName: EventName, service: Service) {
        const subscribers = this.getSubscribers(eventName);

        if (this.has(eventName, service)) {
            logger.debug(`Service '${service.name}' is already a subscriber of event '${eventName}': no need to add them.`);
            return;
        }

        logger.debug(`Subscribing '${service.name}' service to '${eventName}' event...`);

        // Add service to event's list of subscribers
        subscribers.push(service);
    }

    public remove(eventName: EventName, service: Service) {
        const subscribers = this.getSubscribers(eventName);

        if (!this.has(eventName, service)) {
            logger.debug(`Service '${service.name}' is not a subscriber of event '${eventName}': cannot remove them.`);
            return;
        }

        logger.debug(`Unsubscribing '${service.name}' service from '${eventName}' event...`);

        // Remove service from event's list of subscribers
        subscribers.splice(subscribers.findIndex(({ name }) => service.name === name), 1);
    }
}

export default SubscriptionsManager.getInstance();