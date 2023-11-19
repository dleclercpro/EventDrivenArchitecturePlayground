import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import router from './routes';
import { APP_PORT, APP_URI, BROKER_SERVICE, ENV } from './config';
import logger from './logger';
import { APP_NAME } from './constants';
import { EventName } from '../../CommonApp/src/constants/events';



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
    server.listen(APP_PORT, async () => {
        logger.info(`'${APP_NAME}' app listening in ${ENV} mode at: ${APP_URI}`);

        // Subscribe to relevant events via broker
        const url = `${BROKER_SERVICE.uri}/subscribe`;
        const events = [EventName.PaymentUnsuccessful, EventName.OrderCompleted];

        await Promise.all(events.map(async (event: EventName) => {
            const data = { event };

            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            };
    
            await fetch(url, options);
        }));
    });
}



// Run
execute()
    .catch((err) => {
        logger.fatal(err, `Uncaught error:`);
    });

export default execute;