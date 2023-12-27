import { Router } from 'express';
import HealthController from '../controllers/HealthController';
import ReadyController from '../controllers/ReadyController';
import NotifyController from '../controllers/NotifyController';
import MetricsController from '../controllers/MetricsController';



const router = Router();



// ROUTES
// Probes
router.get('/health', HealthController);
router.get('/ready', ReadyController);
router.get('/metrics', MetricsController);

// API
router.post(`/notify`, NotifyController);



export default router;