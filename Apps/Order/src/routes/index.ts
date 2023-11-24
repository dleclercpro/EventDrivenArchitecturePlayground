import { Router } from 'express';
import HealthController from '../controllers/HealthController';
import NotifyController from '../controllers/NotifyController';
import CreateOrderController from '../controllers/CreateOrderController';
import DeleteOrderController from '../controllers/DeleteOrderController';



const router = Router();



// ROUTES
router.get('/health', HealthController);
router.post(`/notify`, NotifyController);
router.post(`/order`, CreateOrderController);
router.delete(`/order`, DeleteOrderController);



export default router;