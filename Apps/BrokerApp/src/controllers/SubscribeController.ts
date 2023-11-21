import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import SubscriptionsManager from '../models/SubscriptionsManager';
import { SubscribeRequestData } from '../../../CommonApp/src/types/APITypes';
import logger from '../logger';
import { SERVICES } from '../config/services';

const SubscribeController: RequestHandler = async (req, res) => {
    try {
        const { service, event } = req.body as SubscribeRequestData;

        SubscriptionsManager.add(event, SERVICES.get(service)!);

        // Success
        return res.json({
            code: HttpStatusCode.OK,
        });

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default SubscribeController;