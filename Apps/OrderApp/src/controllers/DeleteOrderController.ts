import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../CommonApp/src/types/HTTPTypes';
import logger from '../logger';
import { DeleteOrderRequestData } from '../../../CommonApp/src/types/APITypes';
import { sleep } from '../../../CommonApp/src/utils/time';
import TimeDuration from '../../../CommonApp/src/models/units/TimeDuration';
import { TimeUnit } from '../../../CommonApp/src/types';

const DeleteOrderController: RequestHandler = async (req, res) => {
    try {
        const { userId, orderId } = req.body as DeleteOrderRequestData;

        logger.debug(`Deletion of order [ID=${orderId}] for user [ID=${userId}]...`);

        // Fake DB communication latency
        await sleep(new TimeDuration(500, TimeUnit.Milliseconds));

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

export default DeleteOrderController;