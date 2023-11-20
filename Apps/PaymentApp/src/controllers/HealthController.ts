import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { subscriber } from '..';

const HealthController: RequestHandler = async (req, res) => {
    try {
        logger.debug(`Health check: OK`);

        const status = subscriber.hasSubscribed() ? HttpStatusCode.OK : HttpStatusCode.SERVICE_UNAVAILABLE;

        // Success
        return res.sendStatus(status);

    } catch (err: any) {

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default HealthController;