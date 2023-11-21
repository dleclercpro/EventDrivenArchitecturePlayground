import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { NotifyData } from '../../../CommonApp/src/types/APITypes';

const NotifyController: RequestHandler = async (req, res) => {
    try {
        const { event } = req.body as NotifyData;

        logger.debug(`Event notification: ${event.name} [ID=$${event.id}]`);

        // Success
        return res.json({
            code: HttpStatusCode.OK,
        });

    } catch (err: any) {

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default NotifyController;