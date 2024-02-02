import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import logger from '../logger';
import { NotifyRequestData } from '../../../Common/src/types/APITypes';
import { SUBSCRIBED_EVENTS } from '../config';
import { EventName } from '../../../Common/src/constants/events';
import { EventDeliveryCompleted, EventPaymentDeclined } from '../../../Common/src/types/EventTypes';
import { Event, Order } from '../../../Common/src/types';
import { EPOCH_TIME_INIT } from '../../../Common/src/constants';
import OrderManager from '../models/OrderManager';



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

    if (event.name === EventName.PaymentDeclined) {
        const { data: order } = event as EventPaymentDeclined;

        await new OrderManager(order).cancelOrder();
    }

    if (event.name === EventName.DeliveryCompleted) {
        const { data: delivery } = event as EventDeliveryCompleted;
        const { userId } = delivery;

        const now = new Date();

        // FIXME: Fetch order from DB (fake an order for now)
        const order: Order = {
            id: delivery.orderId,
            userId,
            products: { 'DUMMY_PRODUCT': 1 },
            startTime: EPOCH_TIME_INIT,
            endTime: now,
        };

        await new OrderManager(order).completeOrder();
    }
}



export default NotifyController;