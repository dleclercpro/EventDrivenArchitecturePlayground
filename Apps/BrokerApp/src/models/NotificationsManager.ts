import { Event } from '../../../CommonApp/src/types';
import logger from '../logger';
import SubscriptionsManager from './SubscriptionsManager';
import CallNotify from '../../../CommonApp/src/models/calls/CallNotify';

class NotificationsManager {
    private static instance?: NotificationsManager;

    private constructor() {

    }

    public static getInstance() {
        if (!NotificationsManager.instance) {
            NotificationsManager.instance = new NotificationsManager();
        }

        return NotificationsManager.instance;
    }

    public async notify(event: Event) {
        const subscribers = SubscriptionsManager.getSubscribers(event.name);

        // Push event to all subscribed services
        await Promise.all(subscribers.map(async (service) => {
            logger.debug(`Sending event notification to '${service.name}' service: ${event.name}`);

            const { code, data } = await new CallNotify(service).execute({
                event,
            });
        }));
    }
}

export default NotificationsManager.getInstance();