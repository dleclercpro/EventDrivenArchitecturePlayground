import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { CreateOrderRequestData } from '../../../CommonApp/src/types/APITypes';
import { sleep } from '../../../CommonApp/src/utils/time';
import TimeDuration from '../../../CommonApp/src/models/units/TimeDuration';
import { TimeUnit } from '../../../CommonApp/src/types';

const CreateOrderController: RequestHandler = async (req, res) => {
    try {
        const { userId, productId } = req.body as CreateOrderRequestData;

        logger.debug(`Creation of order for user [ID=${userId}] and product [ID=${productId}]...`);

        // Generate fake order
        const now = new Date().getTime();
        const orderId = `${userId}-${productId}-${now}-${crypto.randomUUID()}`;

        // Fake DB communication latency
        await sleep(new TimeDuration(500, TimeUnit.Milliseconds));

        // Success
        return res.json({
            code: HttpStatusCode.OK,
            data: {
                orderId,
            },
        });

    } catch (err: any) {

        // Unknown error
        return res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

export default CreateOrderController;