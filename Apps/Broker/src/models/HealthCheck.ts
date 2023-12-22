import { ServiceName } from '../../../Common/src/constants/services';
import CallHealth from '../../../Common/src/models/calls/CallHealth';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import { Service, ServiceHealthCheck } from '../../../Common/src/types/ServiceTypes';
import { prettifyJSON } from '../../../Common/src/utils/string';
import { EPOCH_TIME_INIT } from '../../../Common/src/constants';
import logger from '../logger';

class HealthCheck {
    protected services: Service[];

    public constructor(services: Service[]) {
        this.services = services;
    }

    public async execute() {
        logger.trace(`Executing health check...`);

        // Execute health check on all services
        // Broker should be fine (it is the one querying the others)
        const results: Record<ServiceName, ServiceHealthCheck> = {
            [ServiceName.Broker]: {
                timestamp: new Date(),
                status: HttpStatusCode.OK,
            },
            [ServiceName.Order]: {
                timestamp: EPOCH_TIME_INIT,
                status: -1,
            },
            [ServiceName.Payment]: {
                timestamp: EPOCH_TIME_INIT,
                status: -1,
            },
            [ServiceName.Delivery]: {
                timestamp: EPOCH_TIME_INIT,
                status: -1,
            },
        };

        await Promise.all(this.services.map(async (service: Service) => {
            logger.trace(`Requesting health check from '${service.name}' service...`);

            const { status } = await new CallHealth(service).execute();

            results[service.name] = {
                timestamp: new Date(),
                status,
            };
        }));
        
        logger.trace(`Health check results ${prettifyJSON(results)}`);

        return results;
    }
}

export default HealthCheck;