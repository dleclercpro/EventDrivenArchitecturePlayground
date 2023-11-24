import { ENV } from './config'; // Do NOT remove!
import process from 'process';
import { SERVICE } from './config/services';
import router from './routes';
import logger from './logger';
import AppServer from '../../Common/src/models/AppServer';



export const APP_SERVER = new AppServer(SERVICE, logger);



const execute = async () => {
    logger.debug(`Environment: ${ENV}`);

    await APP_SERVER.setup(router);
    await APP_SERVER.start();
}



// Handle graceful shutdown
process.on('SIGTERM', async () => {
    logger.trace(`Received SIGTERM signal.`);
    await APP_SERVER.stop();
});
process.on('SIGINT', async () => {
    logger.trace(`Received SIGINT signal.`);
    await APP_SERVER.stop();
});



// Run server
execute()
    .catch((err) => {
        logger.fatal(err, `Uncaught error:`);
    });



export default execute;