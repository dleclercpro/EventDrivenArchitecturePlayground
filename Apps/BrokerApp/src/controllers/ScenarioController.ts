import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import CallCreateOrder from '../models/calls/CallCreateOrder';
import HealthCheck from '../models/HealthCheck';
import { DELIVERY_SERVICE, ORDER_SERVICE, PAYMENT_SERVICE } from '../config/services';

/**
 * This controller is used to test the event-driven architecture: it connects requests
 * to various test scenarios (e.g. a customer passing an order).
 */
const ScenarioController: RequestHandler = async (req, res) => {
    try {
        const { scenarioId } = req.params;

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

        logger.info(`Executing scenario ${scenarioId}...`);

        // Scenario #1
        if (scenarioId === '1') {
            
            // Generate fake user and product IDs
            const userId = crypto.randomUUID();
            const productId = crypto.randomUUID();

            await new CallCreateOrder().execute({
                userId,
                productId,
            });
        }

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

export default ScenarioController;