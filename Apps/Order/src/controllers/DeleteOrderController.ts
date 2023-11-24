import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../../Common/src/types/HTTPTypes';
import logger from '../logger';
import { DeleteOrderRequestData } from '../../../Common/src/types/APITypes';
import { sleep } from '../../../Common/src/utils/time';
import TimeDuration from '../../../Common/src/models/units/TimeDuration';
import { TimeUnit } from '../../../Common/src/types';

const DeleteOrderController: RequestHandler = async (req, res) => {
    try {
        const { userId, orderId } = req.body as DeleteOrderRequestData;

        logger.info(`Deletion of order [ID=${orderId}] for user [ID=${userId}]...`);

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