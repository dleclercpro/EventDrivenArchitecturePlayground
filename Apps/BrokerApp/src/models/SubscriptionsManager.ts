import { EventName } from '../../../CommonApp/src/constants/events';
import { Service } from '../../../CommonApp/src/types/ServiceTypes';
import { EVENTS } from '../config';
import logger from '../logger';

type Subscriptions = Record<EventName, Service[]>;



class SubscriptionsManager {
    private static instance?: SubscriptionsManager;
    protected subscriptions: Subscriptions;

    private constructor() {
        this.subscriptions = {} as Subscriptions;

        // Initialize list of subscribers for each event
        EVENTS.forEach(event => {
            this.subscriptions[event] = [];
        });
    }

    public static getInstance() {
        if (!SubscriptionsManager.instance) {
            SubscriptionsManager.instance = new SubscriptionsManager();
        }

        return SubscriptionsManager.instance;
    }

    public has(event: EventName, service: Service) {
        const subscribers = this.subscriptions[event];

        return subscribers.findIndex(({ name }) => service.name === name) !== -1;
    }

    public add(event: EventName, service: Service) {
        const subscribers = this.subscriptions[event];

        if (this.has(event, service)) {
            logger.debug(`Service '${service.name}' is already a subscriber of event '${event}': no need to add them.`);
            return;
        }

        logger.debug(`Subscribing '${service.name}' service to '${event}' event...`);

        // Add service to event's list of subscribers
        subscribers.push(service);
    }

    public remove(event: EventName, service: Service) {
        const subscribers = this.subscriptions[event];

        if (!this.has(event, service)) {
            logger.debug(`Service '${service.name}' is not a subscriber of event '${event}': cannot remove them.`);
            return;
        }

        logger.debug(`Unsubscribing '${service.name}' service from '${event}' event...`);

        // Remove service from event's list of subscribers
        subscribers.splice(subscribers.findIndex(({ name }) => service.name === name), 1);
    }
}

export default SubscriptionsManager.getInstance();