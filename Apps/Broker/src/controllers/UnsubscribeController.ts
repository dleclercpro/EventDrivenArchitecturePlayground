import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import { UnsubscribeRequestData } from '../../../Common/src/types/APITypes';
import SubscriptionsManager from '../models/SubscriptionsManager';
import logger from '../logger';
import { SERVICES } from '../config/services';

const UnsubscribeController: RequestHandler = async (req, res) => {
    try {
        const { service, event } = req.body as UnsubscribeRequestData;

        SubscriptionsManager.remove(event, SERVICES.get(service)!);

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

export default UnsubscribeController;