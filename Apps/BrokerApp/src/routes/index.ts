import { Router } from 'express';
import HealthController from '../controllers/HealthController';
import SubscribeController from '../controllers/SubscribeController';
import UnsubscribeController from '../controllers/UnsubscribeController';
import PublishController from '../controllers/PublishController';



const router = Router();



// ROUTES
router.get('/health', HealthController);
router.put(`/subscribe`, SubscribeController);
router.delete(`/unsubscribe`, UnsubscribeController);
router.post(`/publish`, PublishController);



export default router;