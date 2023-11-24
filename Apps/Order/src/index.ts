import process from 'process';
import { ENV } from './config';
import { SERVICE } from './config/services';
import router from './routes';
import logger from './logger';
import { generateBasicServer, shutdownServer } from '../../Common/src/utils/server';
import ServiceSubscriber from './models/ServiceSubscriber';



const { server, app } = generateBasicServer(router);
export const subscriber = new ServiceSubscriber();



const execute = async () => {
    server.listen(SERVICE.port, async () => {
        logger.debug(`'${SERVICE.name}' app listening in ${ENV} mode at: ${SERVICE.uri}`);

        await subscriber.createSubscriptions();
    });
}



// Handle graceful shutdown
process.on('SIGTERM', () => {
    logger.trace(`Received SIGTERM signal.`);
    shutdownServer(server, logger);
});
process.on('SIGINT', () => {
    logger.trace(`Received SIGINT signal.`);
    shutdownServer(server, logger);
});



// Run server
execute()
    .catch((err) => {
        logger.fatal(err, `Uncaught error:`);
    });



export default execute;