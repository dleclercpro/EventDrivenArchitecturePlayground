import { sleep } from '../../../Common/src/utils/time';
import TimeDuration from '../../../Common/src/models/units/TimeDuration';
import { Order, TimeUnit } from '../../../Common/src/types';
import logger from '../logger';
import { BROKER_SERVICE, SERVICE } from '../config/services';
import CallPublish from '../../../Common/src/models/calls/CallPublish';
import EventGenerator from '../../../Common/src/models/EventGenerator';

class WorkerFinder {
    private static instance?: WorkerFinder;

    private constructor() {

    }

    public static getInstance() {
        if (!WorkerFinder.instance) {
            WorkerFinder.instance = new WorkerFinder();
        }
        
        return WorkerFinder.instance;
    }

    public async find(order: Order) {
        let worker;

        // Look for worker until one accepts work
        while (!worker) {
            logger.info(`Searching for suitable worker for order: ${order.id}`);
            await new CallPublish(BROKER_SERVICE).execute({
                service: SERVICE.name,
                event: {
                    userId: order.userId,
                    ...EventGenerator.generateWorkerSearchStartedEvent(order),
                },
            });

            // Random amount of time needed to find most suitable worker
            const wait = new TimeDuration(5 * Math.random(), TimeUnit.Seconds);
            logger.info(`[Worker search will take: ${wait.format()}]`);
            await sleep(wait);

            logger.info(`Worker found.`);
            await new CallPublish(BROKER_SERVICE).execute({
                service: SERVICE.name,
                event: {
                    userId: order.userId,
                    ...EventGenerator.generateWorkerSearchCompletedEvent(order),
                },
            });

            // 50/50 chance of worker accepting job
            if (Math.random() > 0.5) {
                worker = crypto.randomUUID();

                logger.info(`Worker accepted job.`);
                await new CallPublish(BROKER_SERVICE).execute({
                    service: SERVICE.name,
                    event: {
                        userId: order.userId,
                        ...EventGenerator.generateWorkerAcceptedJobEvent(order),
                    },
                });
            } else {
                logger.info(`Worker refused job.`);
                await new CallPublish(BROKER_SERVICE).execute({
                    service: SERVICE.name,
                    event: {
                        userId: order.userId,
                        ...EventGenerator.generateWorkerRefusedJobEvent(order),
                    },
                });
            }
        }

        return worker;
    }
}

export default WorkerFinder.getInstance();