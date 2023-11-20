import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import { UnsubscribeData } from '../../../CommonApp/src/types/APITypes';
import SubscriptionsManager from '../models/SubscriptionsManager';

const UnsubscribeController: RequestHandler = async (req, res) => {
    try {
        const { service, event } = req.body as UnsubscribeData;

        SubscriptionsManager.remove(event, service);

        // Success
        return res.sendStatus(HttpStatusCode.OK);

    } catch (err: any) {

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default UnsubscribeController;