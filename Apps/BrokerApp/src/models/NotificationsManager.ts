import { Event } from '../../../CommonApp/src/types';
import logger from '../logger';
import SubscriptionsManager from './SubscriptionsManager';
import CallNotify from '../../../CommonApp/src/models/calls/CallNotify';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';

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
        const responses = await Promise.all(subscribers.map(async (service) => {
            logger.debug(`Sending event notification to '${service.name}' service: ${event.name}`);

            const response = await new CallNotify(service).execute({
                event,
            });

            return { service, response };
        }));

        // Ensure all services were notified successfully
        responses.forEach(({ service, response }) => {
            if (response.code === HttpStatusCode.OK) {
                logger.debug(`Service successfully notified of event '${event.name}': ${service}`);
            } else {
                logger.fatal(`Service could NOT be notified of event '${event.name}': ${service}`);
            }
        });
    }
}

export default NotificationsManager.getInstance();