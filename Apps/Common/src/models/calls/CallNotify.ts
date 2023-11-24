import { CallMethod, NotifyRequestData } from '../../types/APITypes';
import { Service } from '../../types/ServiceTypes';
import Call from './Call';

class CallNotify extends Call<NotifyRequestData> {
    protected method: CallMethod = 'POST';

    public constructor(service: Service) {
        super(`${service.uri}/notify`);
    }
}

export default CallNotify;