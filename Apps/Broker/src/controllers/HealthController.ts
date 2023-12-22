import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import { DELIVERY_SERVICE, ORDER_SERVICE, PAYMENT_SERVICE } from '../config/services';
import HealthCheck from '../models/HealthCheck';
import logger from '../logger';

const HealthController: RequestHandler = async (req, res) => {
    try {
        // Execute health check on all services
        const results = await new HealthCheck([
            ORDER_SERVICE,
            PAYMENT_SERVICE,
            DELIVERY_SERVICE,
        ]).execute();

        const statuses = Object.values(results)
            .map(({ status }) => status);

        // Every dependent service must be healthy for broker service
        // to be considered healthy itself
        if (statuses.every(code => code === HttpStatusCode.OK)) {
            return res.sendStatus(HttpStatusCode.OK);
        }
        
        return res.sendStatus(HttpStatusCode.SERVICE_UNAVAILABLE);

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default HealthController;