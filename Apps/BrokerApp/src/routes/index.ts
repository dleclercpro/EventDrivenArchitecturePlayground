import { Router } from 'express';
import logger from '../logger';



const router = Router();



// ROUTES
router.get('/health', (req, res, next) => {
    logger.debug(`Heath check: OK`);

    res.sendStatus(200);
});



export default router;