import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { NotifyRequestData } from '../../../CommonApp/src/types/APITypes';
import { SUBSCRIBED_EVENTS } from '../config';
import { EventName } from '../../../CommonApp/src/constants/events';
import EventGenerator from '../../../CommonApp/src/models/EventGenerator';
import CallPublish from '../../../CommonApp/src/models/calls/CallPublish';
import { BROKER_SERVICE, SERVICE } from '../config/services';
import { EventOrderCreated } from '../../../CommonApp/src/types/EventTypes';
import { Event } from '../../../CommonApp/src/types';



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

        // Payment has an 80% chance of working
        if (Math.random() < 0.8) {
            await new CallPublish(BROKER_SERVICE).execute({
                service: SERVICE.name,
                event: EventGenerator.generatePaymentSuccessEvent(order),
            });
        } else {
            await new CallPublish(BROKER_SERVICE).execute({
                service: SERVICE.name,
                event: EventGenerator.generatePaymentFailureEvent(order),
            });
        }
    }
}



export default NotifyController;