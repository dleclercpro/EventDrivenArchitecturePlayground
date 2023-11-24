import { EventName } from '../../../Common/src/constants/events';
import CallSubscribe from '../../../Common/src/models/calls/CallSubscribe';
import { Service } from '../types/ServiceTypes';
import { HttpStatusCode } from '../types/HTTPTypes';
import { sleep } from '../utils/time';
import TimeDuration from './units/TimeDuration';
import { TimeUnit } from '../types';

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

    protected async subscribe(event: EventName) {
        const { code } = await new CallSubscribe(this.broker).execute({
            service: this.service.name,
            event,
        });

        return code;
    }

    protected async createSubscription(event: EventName, maxRetries: number = 3) {
        let status: HttpStatusCode | -1 = -1;
        let retries: number = 0;

        while (status !== HttpStatusCode.OK && retries < maxRetries) {
            try {
                status = await this.subscribe(event);
            } catch (err: any) {
                retries += 1;

                // Back off exponentially with each failed attempt
                // Attempt 0: 1s
                // Attempt 1: 2s
                // Attempt 2: 4s
                await sleep(new TimeDuration(Math.pow(2, retries), TimeUnit.Seconds))
            }
        }

        if (status !== HttpStatusCode.OK) {
            throw new Error('CANNOT_SUBSCRIBE_EVENT');
        }
    }

    public async createSubscriptions() {

        // Subscribe to relevant events via broker
        const results = await Promise.all(this.events.map(async (event: EventName) => {
            return this.createSubscription(event)
                .then(() => true)
                .catch(() => false);
        }));

        // Subscriber's job is considered done if all subscriptions
        // were successful
        this.done = results.every(r => r);
    }
}

export default Subscriber;