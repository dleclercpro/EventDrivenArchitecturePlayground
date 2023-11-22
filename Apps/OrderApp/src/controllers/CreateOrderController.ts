import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { CreateOrderRequestData } from '../../../CommonApp/src/types/APITypes';
import { sleep } from '../../../CommonApp/src/utils/time';
import TimeDuration from '../../../CommonApp/src/models/units/TimeDuration';
import { TimeUnit } from '../../../CommonApp/src/types';
import CallPublish from '../../../CommonApp/src/models/calls/CallPublish';
import EventGenerator from '../../../CommonApp/src/models/EventGenerator';
import { BROKER_SERVICE, SERVICE } from '../config/services';

const CreateOrderController: RequestHandler = async (req, res) => {
    try {
        const { userId, productId } = req.body as CreateOrderRequestData;

        logger.info(`Creation of order for user [ID=${userId}] and product [ID=${productId}]...`);

        // Generate fake order
        const now = new Date();
        const orderId = `${userId}-${productId}-${now.getTime()}-${crypto.randomUUID()}`;

        // Fake DB communication latency
        await sleep(new TimeDuration(500, TimeUnit.Milliseconds));

        // Emit order creation event
        const event = EventGenerator.generateOrderCreatedEvent({
            id: orderId,
            userId,
            productId,
            startTime: now,
        });

        logger.info(`Publishing '${event.name}' event to broker...`);

        await new CallPublish(BROKER_SERVICE).execute({
            event,
            service: SERVICE.name,
        });

        // Success
        return res.json({
            code: HttpStatusCode.OK,
            data: { orderId },
        });

    } catch (err: any) {
        logger.error(err);

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default CreateOrderController;