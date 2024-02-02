import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import logger from '../logger';
import { CreateOrderRequestData } from '../../../Common/src/types/APITypes';
import { sleep } from '../../../Common/src/utils/time';
import TimeDuration from '../../../Common/src/models/units/TimeDuration';
import { TimeUnit } from '../../../Common/src/types';
import CallPublish from '../../../Common/src/models/calls/CallPublish';
import EventGenerator from '../../../Common/src/models/EventGenerator';
import { BROKER_SERVICE, SERVICE } from '../config/services';
import { EventOrderCreated } from '../../../Common/src/types/EventTypes';

const CreateOrderController: RequestHandler = async (req, res) => {
    try {
        const { userId, products } = req.body as CreateOrderRequestData;

        logger.info(`Order is being created. [UserID=${userId}]`);

        // Generate fake order
        const now = new Date();
        const orderId = `${userId}-${now.getTime()}-${crypto.randomUUID()}`;

        // Fake DB communication latency
        await sleep(new TimeDuration(500, TimeUnit.Milliseconds));

        // Emit order creation event
        const event: EventOrderCreated = {
            userId,
            ...EventGenerator.generateOrderCreatedEvent({
                id: orderId,
                userId,
                products,
                startTime: now,
            }),
        };

        logger.trace(`Sending event publication to broker: ${event.name}`);

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