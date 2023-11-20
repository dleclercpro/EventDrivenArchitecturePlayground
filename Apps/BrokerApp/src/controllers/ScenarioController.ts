import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';

/**
 * This controller is used to test the event-driven architecture: it connects requests
 * to various test scenarios (e.g. a customer passing an order).
 */
const ScenarioController: RequestHandler = async (req, res) => {
    try {
        const { scenarioId } = req.params;

        logger.debug(`Executing scenario ${scenarioId}...`);

        // Success
        return res.sendStatus(HttpStatusCode.OK);

    } catch (err: any) {

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default ScenarioController;