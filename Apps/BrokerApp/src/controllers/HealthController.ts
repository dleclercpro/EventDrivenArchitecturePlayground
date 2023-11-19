import { RequestHandler } from 'express';
import { HttpStatusCode, HttpStatusMessage } from '../../../CommonApp/src/types/HTTPTypes';
import { prettifyJSON } from '../../../CommonApp/src/utils/string';
import logger from '../logger';
import { HealthCheck, Service } from '../../../CommonApp/src/types/ServiceTypes';
import { SERVICES } from '../config';
import { EPOCH_TIME_INIT } from '../constants';
import { ServiceName } from '../../../CommonApp/src/constants/services';

const HealthController: RequestHandler = async (req, res) => {
    try {
        logger.debug(`Executing health check...`);

        // Execute health check on all services
        const check: HealthCheck = {
            [ServiceName.Broker]: {
                timestamp: EPOCH_TIME_INIT,
                result: -1,
            },
            [ServiceName.Order]: {
                timestamp: EPOCH_TIME_INIT,
                result: -1,
            },
            [ServiceName.Payment]: {
                timestamp: EPOCH_TIME_INIT,
                result: -1,
            },
            [ServiceName.Delivery]: {
                timestamp: EPOCH_TIME_INIT,
                result: -1,
            },
        };

        // Broker should be fine (it is the one querying the others)
        check[ServiceName.Broker] = {
            timestamp: new Date(),
            result: HttpStatusCode.OK,
        };

        await Promise.all(SERVICES.map(async (service: Service) => {
            const { name, uri } = service;

            const res = await fetch(`${uri}/health`);

            check[name] = {
                timestamp: new Date(),
                result: res.status,
            };
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