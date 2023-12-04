import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import logger from '../logger';
import { NotifyRequestData } from '../../../Common/src/types/APITypes';
import { EventName } from '../../../Common/src/constants/events';
import WorkerFinder from '../models/WorkerFinder';
import { Delivery, Event } from '../../../Common/src/types';
import { SUBSCRIBED_EVENTS } from '../config';
import { EventPaymentAccepted } from '../../../Common/src/types/EventTypes';
import DeliveryManager from '../models/DeliveryManager';



const NotifyController: RequestHandler = async (req, res) => {
    try {
        const { event } = req.body as NotifyRequestData;

        // Ensure event is subscribed to
        if (!SUBSCRIBED_EVENTS.includes(event.name)) {
            throw new Error(`NOT_SUBSCRIBED_TO_EVENT`);
        }

        // Tell broker the event was well received
        res.json({
            code: HttpStatusCode.OK,
        });

        // Process expected event
        // FIXME: if this fails, the controller is going to try to send a 500,
        // but it already has replied with OK!
        await processEvent(event);

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}



const processEvent = async (event: Event) => {
    logger.debug(`Notification: ${event.name}`);

    if (event.name === EventName.PaymentAccepted) {
        const { data: order } = event as EventPaymentAccepted;

        const workerFinder = new WorkerFinder(order);

        let done = false;

        // Try and find worker that does the job until the end
        while (!done) {
            const worker = await workerFinder.find();

            const now = new Date();

            // Define delivery
            const delivery: Delivery = {
                id: `delivery-${worker}-${now.getTime()}-${crypto.randomUUID()}`,
                userId: order.userId,
                orderId: order.id,
                workerId: worker,
                startTime: now,
            };

            // Attempt it
            done = await new DeliveryManager(delivery).attempt();
        }
    }
}



export default NotifyController;