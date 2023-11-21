import { EventName } from '../../../CommonApp/src/constants/events';
import CallSubscribe from '../../../CommonApp/src/models/calls/CallSubscribe';
import { Service } from '../types/ServiceTypes';
import { HttpStatusCode } from '../types/HTTPTypes';

abstract class Subscriber {
    protected abstract broker: Service;
    protected abstract service: Service;
    protected abstract events: EventName[];

    protected done: boolean;

    public constructor() {
        this.done = false;
    }

    public isDone() {
        return this.done;
    }

    public async createSubscriptions() {

        // Subscribe to relevant events via broker
        const statuses = await Promise.all(this.events.map(async (event: EventName) => {
            const { code } = await new CallSubscribe(this.broker).execute({
                service: this.service,
                event,
            });

            return code;
        }));

        this.done = statuses.every(s => s === HttpStatusCode.OK);
    }
}

export default Subscriber;