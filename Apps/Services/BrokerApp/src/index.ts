import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import router from './routes';
import { ENV, PORT, ROOT, SERVICES } from './config';
import logger from './logger';
import { Service } from '../../../CommonApp/src/types/EDA';
import { SERVICE_NAME } from './constants';



/* -------------------------------------------------- INSTANCES -------------------------------------------------- */
// Server
const server = express();



/* -------------------------------------------------- MIDDLEWARE -------------------------------------------------- */

// Cookies
server.use(cookieParser());

// JSON
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// GZIP
server.use(compression());

// API
server.use('/', router);



/* -------------------------------------------------- MAIN -------------------------------------------------- */
const execute = async () => {

    // Then start listening on given port
    server.listen(PORT, () => {
        logger.info(`${SERVICE_NAME} service listening in ${ENV} mode at: ${ROOT}`);

        // Execute health check on all services
        SERVICES.forEach(async ({ uri }: Service) => {
            const res = await fetch(`${uri}/health`);

            logger.info(`HTTP health check [${uri}]: ${res.status}`);
        });
    });
}



// Run
execute()
    .catch((err) => {
        logger.fatal(err, `Uncaught error:`);
    });

export default execute;