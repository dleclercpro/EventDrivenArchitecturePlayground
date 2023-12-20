import { sleep } from '../../../Common/src/utils/time';
import TimeDuration from '../../../Common/src/models/units/TimeDuration';
import { Delivery, Event, TimeUnit } from '../../../Common/src/types';
import logger from '../logger';
import { BROKER_SERVICE, SERVICE } from '../config/services';
import CallPublish from '../../../Common/src/models/calls/CallPublish';
import EventGenerator from '../../../Common/src/models/EventGenerator';

class DeliveryManager {
    protected delivery: Delivery;

    public constructor(delivery: Delivery) {
        this.delivery = delivery;
    }

    public async attempt() {
        logger.info(`Attempting delivery... [Delivery ID: ${this.delivery.id}]`);

        const { userId } = this.delivery;
        
        await this.publishEvent({
            ...EventGenerator.generateDeliveryStartedEvent(this.delivery),
            userId,
        });

        // Wait random amount of time for delivery to be brought to customer
        const wait = new TimeDuration(5 * Math.random(), TimeUnit.Seconds);
        logger.info(`[Delivery will take: ${wait.format()}]`)
        await sleep(wait);

        // Worker has an 90% chance of completing work (e.g. might become sick,
        // and need to cancel their deliveries)
        if (Math.random() < 0.9) {
            this.delivery.endTime = new Date();

            logger.info(`Delivery successful. [Delivery ID: ${this.delivery.id}]`);
            await this.publishEvent({
                ...EventGenerator.generateDeliveryCompletedEvent(this.delivery),
                userId,
            });

            // Job is now finally done
            return true;
            
        } else {
            logger.info(`Delivery aborted. [Delivery ID: ${this.delivery.id}]`);
            await this.publishEvent({
                ...EventGenerator.generateDeliveryAbortedEvent(this.delivery),
                userId,
            });

            // Job was aborted
            logger.info(`Re-assigning job to different worker...`);
            return false;
        }
    }

    protected async publishEvent(event: Event) {
        const res = await new CallPublish(BROKER_SERVICE).execute({
            service: SERVICE.name,
            event: {
                ...event,
                userId: this.delivery.userId,
            },
        });

        return res;
    }
}

export default DeliveryManager;