import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import logger from '../logger';
import { NotifyRequestData } from '../../../Common/src/types/APITypes';
import { SUBSCRIBED_EVENTS } from '../config';
import { EventName } from '../../../Common/src/constants/events';
import { EventDeliveryCompleted, EventPaymentFailure } from '../../../Common/src/types/EventTypes';
import CallPublish from '../../../Common/src/models/calls/CallPublish';
import { BROKER_SERVICE, SERVICE } from '../config/services';
import EventGenerator from '../../../Common/src/models/EventGenerator';
import { Event, Order } from '../../../Common/src/types';
import { EPOCH_TIME_INIT } from '../../../Common/src/constants';
import { WEB_SOCKET_SERVER } from '..';



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

    if (event.name === EventName.PaymentFailure) {
        const { data: order } = event as EventPaymentFailure;

        await new CallPublish(BROKER_SERVICE).execute({
            service: SERVICE.name,
            event: EventGenerator.generateOrderCancelledEvent(order),
        });
    }

    if (event.name === EventName.DeliveryCompleted) {
        const { data: delivery } = event as EventDeliveryCompleted;

        const now = new Date();

        // FIXME: Fetch order from DB (fake an order for now)
        const order: Order = {
            id: delivery.orderId,
            userId: 'DUMMY_USER',
            productId: 'DUMMY_PRODUCT',
            startTime: EPOCH_TIME_INIT,
            endTime: now,
        };

        await new CallPublish(BROKER_SERVICE).execute({
            service: SERVICE.name,
            event: EventGenerator.generateOrderCompletedEvent(order),
        });

        // Notify client of order completion
        const ws = WEB_SOCKET_SERVER.findWebSocketByUserId(order.userId);

        if (ws) {
            ws.send(JSON.stringify(order));
        }
    }
}



export default NotifyController;