import { sleep } from '../../../Common/src/utils/time';
import TimeDuration from '../../../Common/src/models/units/TimeDuration';
import { Event, Order, TimeUnit } from '../../../Common/src/types';
import logger from '../logger';
import { BROKER_SERVICE, SERVICE } from '../config/services';
import CallPublish from '../../../Common/src/models/calls/CallPublish';
import EventGenerator from '../../../Common/src/models/EventGenerator';

class WorkerFinder {
    protected order: Order;

    public constructor(order: Order) {
        this.order = order;
    }

    public async find() {
        let workerId;

        // Look for worker until one accepts work
        while (!workerId) {
            logger.info(`Searching for suitable worker... [Order ID: ${this.order.id}]`);
            await this.publishEvent(EventGenerator.generateWorkerSearchStartedEvent(this.order));

            // Random amount of time needed to find most suitable worker
            const wait = new TimeDuration(5 * Math.random(), TimeUnit.Seconds);
            logger.info(`[Worker search will take: ${wait.format()}]`);
            await sleep(wait);
            workerId = crypto.randomUUID();

            logger.info(`Worker found. [Worker ID: ${workerId}]`);
            await this.publishEvent(EventGenerator.generateWorkerSearchCompletedEvent(this.order));

            // 50/50 chance of worker accepting job
            if (Math.random() > 0.5) {
                logger.info(`Worker accepted job.`);
                await this.publishEvent(EventGenerator.generateWorkerAcceptedJobEvent(this.order));
            } else {
                workerId = undefined;

                logger.info(`Worker refused job.`);
                await this.publishEvent(EventGenerator.generateWorkerDeclinedJobEvent(this.order));
            }
        }

        return workerId;
    }

    protected async publishEvent(event: Event) {
        const res = await new CallPublish(BROKER_SERVICE).execute({
            service: SERVICE.name,
            event: {
                ...event,
                userId: this.order.userId,
            },
        });

        return res;
    }
}

export default WorkerFinder;