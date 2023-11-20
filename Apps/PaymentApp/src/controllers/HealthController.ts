import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';

const HealthController: RequestHandler = async (req, res) => {
    try {
        logger.debug(`Health check: OK`);

        // Success
        return res.sendStatus(HttpStatusCode.OK);

    } catch (err: any) {

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default HealthController;