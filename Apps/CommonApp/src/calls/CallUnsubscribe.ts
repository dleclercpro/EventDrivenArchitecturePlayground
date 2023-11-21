import { CallMethod, UnsubscribeData } from '../types/APITypes';
import { Service } from '../types/ServiceTypes';
import Call from './Call';

class CallUnsubscribe extends Call<UnsubscribeData> {
    protected method: CallMethod = 'DELETE';

    public constructor(service: Service) {
        super(`${service.uri}/unsubscribe`);
    }
}

export default CallUnsubscribe;