import express, { Router } from 'express';
import HealthController from '../controllers/HealthController';
import SubscribeController from '../controllers/SubscribeController';
import UnsubscribeController from '../controllers/UnsubscribeController';
import PublishController from '../controllers/PublishController';
import OrderController from '../controllers/OrderController';



const router = Router();



// Public files
router.use('/', express.static('public'));



// ROUTES
router.get('/health', HealthController);
router.post('/order', OrderController);

router.put(`/subscribe`, SubscribeController);
router.delete(`/unsubscribe`, UnsubscribeController);
router.post(`/publish`, PublishController);



export default router;