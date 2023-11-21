import { CallMethod, SubscribeRequestData } from '../types/APITypes';
import { Service } from '../types/ServiceTypes';
import Call from './Call';

class CallSubscribe extends Call<SubscribeRequestData> {
    protected method: CallMethod = 'PUT';

    public constructor(service: Service) {
        super(`${service.uri}/subscribe`);
    }
}

export default CallSubscribe;