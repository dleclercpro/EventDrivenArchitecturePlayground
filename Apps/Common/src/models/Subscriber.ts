import { EventName } from '../../../Common/src/constants/events';
import CallSubscribe from '../../../Common/src/models/calls/CallSubscribe';
import { Service } from '../types/ServiceTypes';
import { HttpStatusCode } from '../types/HTTPTypes';
import { sleep } from '../utils/time';
import TimeDuration from './units/TimeDuration';
import { TimeUnit } from '../types';
import { Logger } from 'pino';

abstract class Subscriber {
    protected abstract broker: Service;
    protected abstract service: Service;
    protected abstract events: EventName[];

    protected logger: Logger;
    protected done: boolean;
    protected success: boolean;

    public constructor(logger: Logger) {
        this.logger = logger;
        this.done = false;
        this.success = false;
    }

    public isDone() {
        return this.done;
    }

    public isSuccess() {
        return this.success;
    }

    protected async subscribe(eventName: EventName) {
        const { code } = await new CallSubscribe(this.broker).execute({
            service: this.service.name,
            eventName: eventName,
        });

        this.logger.debug(`Subscribed to '${eventName}' event.`);
        return code;
    }

    protected async createSubscription(eventName: EventName, maxAttempts: number = 5) {
        const { logger } = this;

        let status: HttpStatusCode | -1 = -1;
        let attempts: number = 0;

        while (status !== HttpStatusCode.OK && attempts < maxAttempts) {
            try {
                if (attempts) {
                    // Back off exponentially with each failed attempt,
                    // with a max waiting time of 30s
                    // After 1 attempt:  5s
                    // After 2 attempts: 10s
                    // After 3 attempts: 20s
                    // After 4 attempts: 40s
                    const wait = new TimeDuration(Math.min(5 * Math.pow(2, attempts - 1), 60), TimeUnit.Seconds);
                    
                    logger.trace(`Wait before next attempt... (${wait.format()})`);
                    await sleep(wait);
                }

                logger.debug(`Trying to subscribe to '${eventName}' event... [${attempts + 1}/${maxAttempts}]`);
                status = await this.subscribe(eventName);

            } catch (err: any) {
                attempts += 1;
            }
        }

        if (status !== HttpStatusCode.OK) {
            logger.fatal(`Could not subscribe to '${eventName}' event.`);
            throw new Error('CANNOT_SUBSCRIBE_EVENT');
        }
    }

    public async createSubscriptions() {

        // Reset booleans
        this.done = false;
        this.success = false;

        // Subscribe to relevant events via broker
        const results = await Promise.all(this.events.map(async (eventName: EventName) => {
            return this.createSubscription(eventName)
                .then(() => true)
                .catch(() => false);
        }));

        // Subscriber's job is considered successful if all subscriptions
        // were correctly created
        this.done = true;
        this.success = results.every(r => r);
    }
}

export default Subscriber;