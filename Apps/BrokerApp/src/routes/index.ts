import { Router } from 'express';
import logger from '../logger';
import HealthController from '../controllers/HealthController';



const router = Router();



// ROUTES
router.get('/health', HealthController);

router.put(`/subscribe`, (req, res, next) => {

});

router.delete(`/unsubscribe`, (req, res, next) => {

});

router.post(`/publish`, (req, res, next) => {

});



export default router;