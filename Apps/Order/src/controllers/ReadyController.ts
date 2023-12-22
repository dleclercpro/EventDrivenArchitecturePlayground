import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import logger from '../logger';
import { SUBSCRIBER } from '..';

const ReadyController: RequestHandler = async (req, res) => {
    try {
        let status;

        // App is not ready until it has subscribed to all events it
        // has interest in
        if (SUBSCRIBER.isDone()) {
            status = HttpStatusCode.OK;
            logger.trace(`Readiness check: ${status}`);
        } else {
            status = HttpStatusCode.SERVICE_UNAVAILABLE;
            logger.warn(`Readiness check: ${status}`);
        }

        return res.sendStatus(status);

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default ReadyController;