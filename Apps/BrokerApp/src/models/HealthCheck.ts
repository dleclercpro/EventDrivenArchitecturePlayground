import { ServiceName } from '../../../CommonApp/src/constants/services';
import CallHealth from '../../../CommonApp/src/models/calls/CallHealth';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import { Service, ServiceHealthCheck } from '../../../CommonApp/src/types/ServiceTypes';
import { prettifyJSON } from '../../../CommonApp/src/utils/string';
import { EPOCH_TIME_INIT } from '../constants';
import logger from '../logger';

class HealthCheck {
    protected services: Service[];

    public constructor(services: Service[]) {
        this.services = services;
    }

    public async execute() {
        logger.trace(`Executing health check...`);

        // Execute health check on all services
        const results: Record<ServiceName, ServiceHealthCheck> = {
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
        results[ServiceName.Broker] = {
            timestamp: new Date(),
            result: HttpStatusCode.OK,
        };

        await Promise.all(this.services.map(async (service: Service) => {
            logger.trace(`Requesting health check from '${service.name}' service...`);

            const { code } = await new CallHealth(service).execute();

            results[service.name] = {
                timestamp: new Date(),
                result: code,
            };
        }));
        
        logger.trace(`Health check results ${prettifyJSON(results)}`);

        return results;
    }
}

export default HealthCheck;