import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import logger from '../logger';

const MetricsController: RequestHandler = async (req, res) => {
    try {
        logger.trace(`Metrics: NONE`);
        
        return res.send(`# No metrics available.`);

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default MetricsController;