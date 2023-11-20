import { RequestHandler } from 'express';
import { HttpStatusCode, HttpStatusMessage } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { NotifyData } from '../../../CommonApp/src/types/APITypes';

const NotifyController: RequestHandler = async (req, res) => {
    try {
        const { event } = req.body as NotifyData;

        logger.debug(`Event notification: ${event.name} [ID=$${event.id}]`);

        // Success
        return res.sendStatus(HttpStatusCode.OK);

    } catch (err: any) {

        // Unknown error
        return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
    }
}

export default NotifyController;