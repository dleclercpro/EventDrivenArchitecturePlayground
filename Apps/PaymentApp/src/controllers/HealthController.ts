import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { subscriber } from '..';

const HealthController: RequestHandler = async (req, res) => {
    try {
        let status;

        if (subscriber.hasSubscribed()) {
            logger.debug(`Health check: ${HttpStatusCode}`);
            status = HttpStatusCode.OK;
        } else {
            logger.warn(`Health check: ${HttpStatusCode}`);
            status = HttpStatusCode.SERVICE_UNAVAILABLE;
        }

        // Success
        return res.sendStatus(status);

    } catch (err: any) {

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default HealthController;