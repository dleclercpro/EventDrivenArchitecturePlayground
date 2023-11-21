import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import CallCreateOrder from '../models/calls/CallCreateOrder';

/**
 * This controller is used to test the event-driven architecture: it connects requests
 * to various test scenarios (e.g. a customer passing an order).
 */
const ScenarioController: RequestHandler = async (req, res) => {
    try {
        const { scenarioId } = req.params;

        logger.debug(`Executing scenario ${scenarioId}...`);

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

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default ScenarioController;