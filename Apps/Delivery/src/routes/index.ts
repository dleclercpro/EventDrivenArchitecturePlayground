import { Router } from 'express';
import HealthController from '../controllers/HealthController';
import ReadyController from '../controllers/ReadyController';
import NotifyController from '../controllers/NotifyController';



const router = Router();



// ROUTES
// Probes
router.get('/health', HealthController);
router.get('/ready', ReadyController);

// API
router.post(`/notify`, NotifyController);



export default router;