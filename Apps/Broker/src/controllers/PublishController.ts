import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import { PublishRequestData } from '../../../Common/src/types/APITypes';
import NotificationsManager from '../models/NotificationsManager';
import logger from '../logger';
import { Event } from '../../../Common/src/types';
import { WEB_SOCKET_SERVER } from '..';

const PublishController: RequestHandler = async (req, res) => {
    try {
        const { event, service } = req.body as PublishRequestData;

        logger.trace(`Received event publication from '${service}' service: ${event.name}`);

        // Tell publisher the event was well received
        res.json({
            code: HttpStatusCode.OK,
        });

        await processEvent(event);

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

const processEvent = async (event: Event) => {

    // Event is attached to user: try and notify them
    if (event.userId) {
        const ws = WEB_SOCKET_SERVER.findOpenWebSocketByUserId(event.userId);

        if (ws) {
            logger.trace(`Sending event to client app: ${event.name}`);
            ws.send(JSON.stringify(event));
        } else {
            logger.warn(`Could not find user to send event '${event.name}' to!`);
        }
    }

    // Notify services subscribed to event
    await NotificationsManager.notify(event);
}

export default PublishController;