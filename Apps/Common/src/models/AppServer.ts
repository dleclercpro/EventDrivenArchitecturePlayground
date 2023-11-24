import { Server, createServer } from 'http';
import express, { Router } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { Logger } from 'pino';
import TimeDuration from './units/TimeDuration';
import { TimeUnit } from '../types';
import { sleep } from '../utils/time';

class AppServer {
    protected logger: Logger;
    protected server?: Server;
    protected app?: express.Express;

    public constructor(logger: Logger) {
        this.logger = logger;
    }

    public async setup(router: Router) {
        this.app = express();
        this.server = createServer(this.app);
    
        // Enable use of cookies
        this.app.use(cookieParser());
    
        // Enable use of JSON data
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    
        // Enable HTTP response compression
        this.app.use(compression());
    
        // Define server's API endpoints
        this.app.use('/', router);

        return {
            server: this.server,
            app: this.app,
        };
    }

    public getServer() {
        return this.server;
    }

    public getApp() {
        return this.app;
    }

    public async stop() {
        await Promise.race([this.shutdown(), this.kill()]);
    }

    protected async shutdown() {
        if (!this.server) {
            throw new Error('MISSING_SERVER');
        }

        return new Promise((resolve, reject) => {
            this.server!.close((err) => {
                if (err) {
                    this.logger.fatal(`Could not shut down server gracefully: ${err}`);
                    reject(err);
                }

                this.logger.info(`Server shut down gracefully. Exiting process...`);
                resolve(process.exit(0));
            });
        });
    }

    protected async kill() {
        if (!this.server) {
            throw new Error('MISSING_SERVER');
        }

        await sleep(new TimeDuration(5, TimeUnit.Seconds));

        this.logger.fatal(`Server did not shut down in time. Forcibly exiting process...`);
        return process.exit(1);
    }
}

export default AppServer;