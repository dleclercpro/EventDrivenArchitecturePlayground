import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import logger from '../logger';
import CallCreateOrder from '../models/calls/CallCreateOrder';
import HealthCheck from '../models/HealthCheck';
import { DELIVERY_SERVICE, ORDER_SERVICE, PAYMENT_SERVICE } from '../config/services';

const OrderController: RequestHandler = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // Before running any scenario, ensure services are ready
        const health = await new HealthCheck([
            ORDER_SERVICE,
            PAYMENT_SERVICE,
            DELIVERY_SERVICE,
        ]).execute();

        const servicesReady = Object.values(health).every(h => h.result === HttpStatusCode.OK);

        // Tell client services aren't ready yet
        if (!servicesReady) {
            return res.sendStatus(HttpStatusCode.SERVICE_UNAVAILABLE);
        }

        // Verify data validity
        if (!userId || !productId) {
            res.sendStatus(HttpStatusCode.BAD_REQUEST);
        }

        logger.info(`User '${userId}' ordered product: ${productId}...`);

        const { code, data } = await new CallCreateOrder().execute({
            userId,
            productId,
        });

        // Success
        return res.json({
            code,
            data,
        });

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default OrderController;