import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import logger from '../logger';
import { SUBSCRIBER } from '..';

const HealthController: RequestHandler = async (req, res) => {
    try {
        let status;

        if (SUBSCRIBER.isDone()) {
            status = HttpStatusCode.OK;
            logger.trace(`Health check: ${status}`);
        } else {
            status = HttpStatusCode.SERVICE_UNAVAILABLE;
            logger.warn(`Health check: ${status}`);
        }

        // Success
        return res.json({
            code: status,
        });

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default HealthController;