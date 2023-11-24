import { sleep } from '../../../Common/src/utils/time';
import TimeDuration from '../../../Common/src/models/units/TimeDuration';
import { TimeUnit } from '../../../Common/src/types';
import logger from '../logger';

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

    public async find() {
        let worker;

        // Look for worker until one accepts work
        while (!worker) {
            logger.info(`Searching for suitable worker...`);

            // Random amount of time needed to find most suitable worker
            const wait = new TimeDuration(5 * Math.random(), TimeUnit.Seconds);
            logger.info(`[Worker search will take: ${wait.format()}]`);
            await sleep(wait);

            logger.info(`Worker found.`);

            // 50/50 chance of worker accepting work
            if (Math.random() > 0.5) {
                worker = crypto.randomUUID();
                logger.info(`Worker accepted job.`);
            } else {
                logger.info(`Worker declined job.`);
            }
        }

        return worker;
    }
}

export default WorkerFinder.getInstance();