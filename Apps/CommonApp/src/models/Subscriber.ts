import { EventName } from '../../../CommonApp/src/constants/events';
import CallSubscribe from '../../../CommonApp/src/calls/CallSubscribe';
import { Service } from '../types/ServiceTypes';

abstract class Subscriber {
    protected abstract broker: Service;
    protected abstract service: Service;
    protected abstract events: EventName[];

    protected done: boolean;

    public constructor() {
        this.done = false;
    }

    public hasSubscribed() {
        return this.done;
    }

    public async createSubscriptions() {

        // Subscribe to relevant events via broker
        await Promise.all(this.events.map(async (event: EventName) => {
            const { code, data } = await new CallSubscribe(this.broker).execute({
                service: this.service,
                event,
            });
        }));

        this.done = true;
    }
}

export default Subscriber;