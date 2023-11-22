import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { NotifyRequestData } from '../../../CommonApp/src/types/APITypes';
import { EventName } from '../../../CommonApp/src/constants/events';
import WorkerFinder from '../models/WorkerFinder';
import { BROKER_SERVICE, SERVICE } from '../config/services';
import CallPublish from '../../../CommonApp/src/models/calls/CallPublish';
import EventGenerator from '../../../CommonApp/src/models/EventGenerator';
import { Delivery, Order, TimeUnit } from '../../../CommonApp/src/types';
import { SUBSCRIBED_EVENTS } from '../config';
import { EventPaymentSuccess, EventPaymentFailure } from '../../../CommonApp/src/types/EventTypes';
import { sleep } from '../../../CommonApp/src/utils/time';
import TimeDuration from '../../../CommonApp/src/models/units/TimeDuration';

const NotifyController: RequestHandler = async (req, res) => {
    try {
        const { event } = req.body as NotifyRequestData;

        logger.info(`Event notification: ${event.id}`);

        // Ensure event is subscribed to
        if (!SUBSCRIBED_EVENTS.includes(event.name)) {
            throw new Error(`NOT_SUBSCRIBED_TO_EVENT`);
        }

        if (event.name === EventName.PaymentSuccess) {
            const { data: order } = event as EventPaymentSuccess;

            let done = false;

            // Try and find worker that does the job until the end
            while (!done) {
                const worker = await WorkerFinder.find();

                const now = new Date();

                // Delivery started
                const delivery: Delivery = {
                    id: `Delivery-${worker}-${now.getTime()}-${crypto.randomUUID()}`,
                    orderId: order.id,
                    workerId: worker,
                    startTime: now,
                };

                logger.debug(`Attempting delivery...`);

                // Wait random amount of time for delivery to be brought to customer
                const wait = new TimeDuration(5 * Math.random(), TimeUnit.Seconds);
                logger.debug(`[Delivery will take: ${wait.format()}]`)
                await sleep(wait);
    
                // Worker has an 90% chance of completing work (e.g. might become sick,
                // and need to cancel their deliveries)
                if (Math.random() < 0.9) {
                    logger.debug(`Success!`);

                    // Delivery done
                    delivery.endTime = new Date();

                    await new CallPublish(BROKER_SERVICE).execute({
                        service: SERVICE.name,
                        event: EventGenerator.generateDeliveryCompletedEvent(delivery),
                    });
    
                    // Job is now finally done
                    done = true;
                } else {
                    logger.debug(`Failure.`);
                }
            }
        }

        // Success
        return res.json({
            code: HttpStatusCode.OK,
        });

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default NotifyController;