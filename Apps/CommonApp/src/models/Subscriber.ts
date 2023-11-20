import { EventName } from '../../../CommonApp/src/constants/events';
import { SubscribeData } from '../../../CommonApp/src/types/APITypes';
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
            const data = { service: this.service, event } as SubscribeData;

            await new CallSubscribe(this.broker).execute(data);
        }));

        this.done = true;
    }
}

export default Subscriber;