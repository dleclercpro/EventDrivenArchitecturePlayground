import { ENV } from './config'; // Do NOT remove!
import process from 'process';
import { SERVICE } from './config/services';
import router from './routes';
import logger from './logger';
import AppServer from '../../Common/src/models/AppServer';
import TimeDuration from '../../Common/src/models/units/TimeDuration';
import { killAfterTimeout } from '../../Common/src/utils/process';
import { TimeUnit } from '../../Common/src/types';



export const APP_SERVER = new AppServer(SERVICE, logger);



const execute = async () => {
    logger.debug(`Environment: ${ENV}`);

    await APP_SERVER.setup(router);
    await APP_SERVER.start();
}



// Shut down gracefully
const TIMEOUT = new TimeDuration(2, TimeUnit.Seconds);
const stopAppServer = async () => {
    await APP_SERVER.stop();
    process.exit(0);
};

process.on('SIGTERM', async () => {
    logger.trace(`Received SIGTERM signal.`);
    await Promise.race([stopAppServer(), killAfterTimeout(TIMEOUT)]);
});
process.on('SIGINT', async () => {
    logger.trace(`Received SIGINT signal.`);
    await Promise.race([stopAppServer(), killAfterTimeout(TIMEOUT)]);
});



// Run server
execute()
    .catch((err) => {
        logger.fatal(err, `Uncaught error:`);
    });



export default execute;