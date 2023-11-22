import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { NotifyRequestData } from '../../../CommonApp/src/types/APITypes';
import { EventName } from '../../../CommonApp/src/constants/events';
import WorkerFinder from '../models/WorkerFinder';
import { BROKER_SERVICE, SERVICE } from '../config/services';
import CallPublish from '../../../CommonApp/src/models/calls/CallPublish';
import EventGenerator from '../../../CommonApp/src/models/EventGenerator';
import { Order } from '../../../CommonApp/src/types';
import { SUBSCRIBED_EVENTS } from '../config';

const NotifyController: RequestHandler = async (req, res) => {
    try {
        const { event } = req.body as NotifyRequestData;

        logger.info(`Event notification: ${event.id}`);

        // Ensure event is subscribed to
        if (!SUBSCRIBED_EVENTS.includes(event.name)) {
            throw new Error(`NOT_SUBSCRIBED_TO_EVENT`);
        }

        if (event.name === EventName.PaymentSuccess) {
            let done = false;

            // Type cast
            const order = event.data as Order;

            // Try and find worker that does the job until the end
            while (!done) {
                const worker = await WorkerFinder.find();

                logger.debug(`Found worker: ${worker}`);
    
                // Worker has an 90% chance of completing work (e.g. might become sick,
                // and need to cancel their deliveries)
                if (Math.random() > 0.9) {
                    await new CallPublish(BROKER_SERVICE).execute({
                        service: SERVICE.name,
                        event: EventGenerator.generateDeliveryCompletedEvent(order),
                    });
    
                    // Job is now finally done
                    done = true;
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