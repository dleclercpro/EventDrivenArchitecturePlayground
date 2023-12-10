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

    protected async subscribe(eventName: EventName) {
        const { code } = await new CallSubscribe(this.broker).execute({
            service: this.service.name,
            eventName: eventName,
        });

        return code;
    }

    protected async createSubscription(eventName: EventName, maxAttempts: number = 3) {
        let status: HttpStatusCode | -1 = -1;
        let attempts: number = 0;

        while (status !== HttpStatusCode.OK && attempts < maxAttempts) {
            try {
                if (attempts) {
                    // Back off exponentially with each failed attempt,
                    // with a max waiting time of 30s
                    const wait = new TimeDuration(Math.min(Math.pow(2, attempts), 30), TimeUnit.Seconds);
                    await sleep(wait);
                }

                status = await this.subscribe(eventName);
            } catch (err: any) {
                attempts += 1;
            }
        }

        if (status !== HttpStatusCode.OK) {
            throw new Error('CANNOT_SUBSCRIBE_EVENT');
        }
    }

    public async createSubscriptions() {

        // Subscribe to relevant events via broker
        const results = await Promise.all(this.events.map(async (eventName: EventName) => {
            return this.createSubscription(eventName)
                .then(() => true)
                .catch(() => false);
        }));

        // Subscriber's job is considered done if all subscriptions
        // were successful
        this.done = results.every(r => r);
    }
}

export default Subscriber;