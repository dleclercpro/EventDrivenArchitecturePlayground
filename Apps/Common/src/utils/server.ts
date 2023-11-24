import http, { Server } from 'http';
import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { Logger } from 'pino';
import TimeDuration from '../models/units/TimeDuration';
import { TimeUnit } from '../types';

export const generateBasicServer = (router: Router) => {
    const app = express();
    const server = http.createServer(app);

    // Enable use of cookies
    app.use(cookieParser());

    // Enable use of JSON data
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Enable HTTP response compression
    app.use(compression());

    // Define server's API endpoints
    app.use('/', router);

    return { server, app };
}

export const shutdownServer = (server: Server, logger: Logger) => {
    logger.info(`Shutting down server gracefully...`);
    
    server.close(() => {
        logger.info(`Server shut down. Exiting process...`);
        process.exit(0);
    });

    // If server doesn't close before given time, forcefully exit process
    setTimeout(() => {
        logger.fatal(`Server did not shut down in time. Forcibly exiting process...`);
        process.exit(1);
    }, new TimeDuration(5, TimeUnit.Seconds).toMs().getAmount()); // Time out after 5 seconds
}