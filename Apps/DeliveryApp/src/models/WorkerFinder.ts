import { sleep } from '../../../CommonApp/src/utils/time';
import TimeDuration from '../../../CommonApp/src/models/units/TimeDuration';
import { TimeUnit } from '../../../CommonApp/src/types';

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

            // Random amount of time needed to find most suitable worker
            await sleep(new TimeDuration(5 * Math.random(), TimeUnit.Seconds));

            // 50/50 chance of worker accepting work
            if (Math.random() > 0.5) {
                worker = crypto.randomUUID();
            }
        }

        return worker;
    }
}

export default WorkerFinder.getInstance();