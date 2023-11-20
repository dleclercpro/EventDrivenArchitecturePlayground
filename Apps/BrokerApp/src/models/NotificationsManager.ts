import { Event } from '../../../CommonApp/src/types';
import logger from '../logger';
import SubscriptionsManager from './SubscriptionsManager';

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
            logger.debug(`Notifying '${service.name}' service of '${event.name}' event...`);

            const url = `${service.uri}/notify`;
            const data = event;

            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            };
    
            await fetch(url, options);
        }));
    }
}

export default NotificationsManager.getInstance();