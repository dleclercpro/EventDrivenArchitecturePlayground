import { RequestHandler } from 'express';
import { HttpStatusCode, HttpStatusMessage } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { PublishData } from '../../../CommonApp/src/types/APITypes';
import NotificationsManager from '../models/NotificationsManager';
import SubscriptionsManager from '../models/SubscriptionsManager';

const PublishController: RequestHandler = async (req, res) => {
    try {
        const { event } = req.body as PublishData;
        const subscribers = SubscriptionsManager.getSubscribers(event.name);

        logger.debug(`Publishing '${event.name}' event to ${subscribers.length} subscribed services...`);

        await NotificationsManager.notify(event);
        
        // Success
        return res.sendStatus(HttpStatusCode.OK);

    } catch (err: any) {

        // Unknown error
        return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
    }
}

export default PublishController;