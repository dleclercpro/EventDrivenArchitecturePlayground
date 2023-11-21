import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { subscriber } from '..';

const HealthController: RequestHandler = async (req, res) => {
    try {
        let status;

        if (subscriber.isDone()) {
            status = HttpStatusCode.OK;
            logger.debug(`Health check: ${status}`);
        } else {
            status = HttpStatusCode.SERVICE_UNAVAILABLE;
            logger.warn(`Health check: ${status}`);
        }

        // Success
        return res.json({
            code: status,
        });

    } catch (err: any) {

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default HealthController;