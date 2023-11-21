import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
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

        // Success
        return res.json({
            code: HttpStatusCode.OK,
            data: results,
        });

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default HealthController;