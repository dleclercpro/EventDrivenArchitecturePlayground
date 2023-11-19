import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';

export const generateBasicServer = (router: Router) => {
    const server = express();

    // Enable use of cookies
    server.use(cookieParser());

    // Enable use of JSON data
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());

    // Enable HTTP response compression
    server.use(compression());

    // Define server's API endpoints
    server.use('/', router);

    return server;
}