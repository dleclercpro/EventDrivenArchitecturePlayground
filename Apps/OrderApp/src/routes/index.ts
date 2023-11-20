import { Router } from 'express';
import HealthController from '../controllers/HealthController';
import NotifyController from '../controllers/NotifyController';



const router = Router();



// ROUTES
router.get('/health', HealthController);
router.post(`/notify`, NotifyController);



export default router;