import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import { PublishRequestData } from '../../../CommonApp/src/types/APITypes';
import NotificationsManager from '../models/NotificationsManager';
import logger from '../logger';

const PublishController: RequestHandler = async (req, res) => {
    try {
        const { event, service } = req.body as PublishRequestData;

        logger.debug(`Received event publication from '${service}' service: '${event.name}'`);

        await NotificationsManager.notify(event);
        
        // Success
        return res.json({
            code: HttpStatusCode.OK,
        });

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default PublishController;