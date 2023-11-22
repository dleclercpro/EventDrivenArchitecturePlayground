import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { NotifyRequestData } from '../../../CommonApp/src/types/APITypes';
import { SUBSCRIBED_EVENTS } from '../config';
import { EventName } from '../../../CommonApp/src/constants/events';
import { EventDeliveryCompleted, EventPaymentFailure } from '../../../CommonApp/src/types/EventTypes';
import CallPublish from '../../../CommonApp/src/models/calls/CallPublish';
import { BROKER_SERVICE, SERVICE } from '../config/services';
import EventGenerator from '../../../CommonApp/src/models/EventGenerator';
import { Order } from '../../../CommonApp/src/types';
import { EPOCH_TIME_INIT } from '../../../CommonApp/src/constants';

const NotifyController: RequestHandler = async (req, res) => {
    try {
        const { event } = req.body as NotifyRequestData;

        logger.info(`Event notification: ${event.id}`);

        // Ensure event is subscribed to
        if (!SUBSCRIBED_EVENTS.includes(event.name)) {
            throw new Error(`NOT_SUBSCRIBED_TO_EVENT`);
        }

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

            // FIXME: Fetch order from DB
            const order: Order = {
                id: delivery.orderId,
                userId: '',
                productId: '',
                startTime: EPOCH_TIME_INIT,
                endTime: now,
            };

            await new CallPublish(BROKER_SERVICE).execute({
                service: SERVICE.name,
                event: EventGenerator.generateOrderCompletedEvent(order),
            });
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