import { CallMethod } from '../../types/APITypes';
import { Service } from '../../types/ServiceTypes';
import Call from './Call';

class CallHealth extends Call {
    protected method: CallMethod = 'GET';

    public constructor(service: Service) {
        super(`${service.uri}/health`);
    }
}

export default CallHealth;