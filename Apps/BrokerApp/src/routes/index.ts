import { Router } from 'express';
import HealthController from '../controllers/HealthController';
import SubscribeController from '../controllers/SubscribeController';
import UnsubscribeController from '../controllers/UnsubscribeController';
import PublishController from '../controllers/PublishController';
import ScenarioController from '../controllers/ScenarioController';



const router = Router();



// ROUTES
router.get('/health', HealthController);
router.get('/scenario/:scenarioId', ScenarioController);

router.put(`/subscribe`, SubscribeController);
router.delete(`/unsubscribe`, UnsubscribeController);
router.post(`/publish`, PublishController);



export default router;