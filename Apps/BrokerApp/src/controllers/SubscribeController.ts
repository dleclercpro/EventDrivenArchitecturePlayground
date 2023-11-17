import { RequestHandler } from 'express';
import { HttpStatusCode, HttpStatusMessage } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';

const SubscribeController: RequestHandler = async (req, res) => {
    try {
        logger.debug(`Subscribing service to event...`);

        // Success
        return res.sendStatus(HttpStatusCode.OK);

    } catch (err: any) {

        // Unknown error
        return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
    }
}

export default SubscribeController;