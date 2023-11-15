import { Router } from 'express';
import logger from '../logger';
import { Event } from '../../../../CommonApp/src/types/EDA'
import HealthController from '../controllers/HealthController';



const router = Router();



// ROUTES
router.get('/health', HealthController);

router.post(`/notify`, (req, res, next) => {
    const { event } = req.body as { event: Event };

    logger.debug(`Event notification: ${event.name} [ID=$${event.id}]`);
});



export default router;