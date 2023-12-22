import CallReady from '../../../Common/src/models/calls/CallReady';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import { Service, ProbeCheck } from '../../../Common/src/types/ServiceTypes';
import logger from '../logger';

class ReadinessCheck {
    protected services: Service[];

    public constructor(services: Service[] = []) {
        this.services = services;
    }

    public async execute() {
        logger.trace(`Executing readiness checks...`);

        // Execute readiness check on all necessary services
        const checks: Record<string, ProbeCheck> = {};

        await Promise.all(this.services.map(async (service: Service) => {
            logger.trace(`Requesting readiness check from '${service.name}' app...`);

            const { status } = await new CallReady(service).execute();

            checks[service.name] = {
                timestamp: new Date(),
                status,
            };
        }));
        
        logger.trace(checks, `Readiness checks:`);

        return Object.values(checks)
            .every(h => h.status === HttpStatusCode.OK);
    }
}

export default ReadinessCheck;