import { CallMethod, PublishData } from '../types/APITypes';
import { Service } from '../types/ServiceTypes';
import Call from './Call';

class CallPublish extends Call<PublishData> {
    protected method: CallMethod = 'POST';

    public constructor(service: Service) {
        super(`${service.uri}/publish`);
    }
}

export default CallPublish;