import express, { Router } from 'express';
import HealthController from '../controllers/HealthController';
import SubscribeController from '../controllers/SubscribeController';
import UnsubscribeController from '../controllers/UnsubscribeController';
import PublishController from '../controllers/PublishController';
import OrderController from '../controllers/OrderController';
import ReadyController from '../controllers/ReadyController';



const router = Router();



// Public files
router.use('/', express.static('public'));



// ROUTES
// Probes
router.get('/health', HealthController);
router.get('/ready', ReadyController);

// API
router.put(`/subscribe`, SubscribeController);
router.delete(`/unsubscribe`, UnsubscribeController);
router.post(`/publish`, PublishController);
router.post('/order', OrderController);



export default router;