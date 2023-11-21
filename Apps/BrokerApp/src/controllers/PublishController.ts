import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { PublishRequestData } from '../../../CommonApp/src/types/APITypes';
import NotificationsManager from '../models/NotificationsManager';
import SubscriptionsManager from '../models/SubscriptionsManager';

const PublishController: RequestHandler = async (req, res) => {
    try {
        const { event } = req.body as PublishRequestData;
        const subscribers = SubscriptionsManager.getSubscribers(event.name);

        logger.debug(`Publishing '${event.name}' event to ${subscribers.length} subscribed services...`);

        await NotificationsManager.notify(event);
        
        // Success
        return res.json({
            code: HttpStatusCode.OK,
        });

    } catch (err: any) {

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default PublishController;