import { RequestHandler } from 'express';
import { HttpStatusCode, HttpStatusMessage } from '../../../CommonApp/src/types/HTTPTypes';
import { prettifyJSON } from '../../../CommonApp/src/utils/string';
import logger from '../logger';
import { ServiceName, HealthCheck, Service } from '../../../CommonApp/src/types/EDA';
import { SERVICES } from '../config';

const HealthController: RequestHandler = async (req, res) => {
    try {
        logger.debug(`Executing health check...`);

        // Execute health check on all services
        const check: HealthCheck = {
            [ServiceName.Broker]: -1,
            [ServiceName.Order]: -1,
            [ServiceName.Payment]: -1,
            [ServiceName.Delivery]: -1,
        };

        // Broker should be fine
        check[ServiceName.Broker] = HttpStatusCode.OK;

        await Promise.all(SERVICES.map(async (service: Service) => {
            const { name, uri } = service;

            const res = await fetch(`${uri}/health`);

            check[name] = res.status;
        }));
        
        logger.debug(`Health check results ${prettifyJSON(check)}`);

        // Success
        return res.send(check);

    } catch (err: any) {

        // Unknown error
        return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
    }
}

export default HealthController;