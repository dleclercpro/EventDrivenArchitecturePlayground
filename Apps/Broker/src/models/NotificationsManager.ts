import { Event } from '../../../Common/src/types';
import logger from '../logger';
import SubscriptionsManager from './SubscriptionsManager';
import CallNotify from '../../../Common/src/models/calls/CallNotify';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';

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
                logger.debug(`Successfully notified '${service.name}' service of event: ${event.name}`);
            } else {
                logger.fatal(`Failed to notify '${service.name}' service of event: ${event.name}`);
            }
        });
    }
}

export default NotificationsManager.getInstance();