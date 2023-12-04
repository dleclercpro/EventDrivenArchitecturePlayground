import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import logger from '../logger';
import { NotifyRequestData } from '../../../Common/src/types/APITypes';
import { SUBSCRIBED_EVENTS } from '../config';
import { EventName } from '../../../Common/src/constants/events';
import { EventOrderCreated } from '../../../Common/src/types/EventTypes';
import { Event } from '../../../Common/src/types';
import PaymentHandler from '../models/PaymentHandler';



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
        await processEvent(event);

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}



const processEvent = async (event: Event) => {
    logger.debug(`Notification: ${event.name}`);

    if (event.name === EventName.OrderCreated) {
        const { data: order } = event as EventOrderCreated;

        const paymentHandler = new PaymentHandler(order);

        // Payment has an 80% chance of working
        if (Math.random() < 0.8) {
            await paymentHandler.approvePayment();
        } else {
            await paymentHandler.declinePayment();
        }
    }
}



export default NotifyController;