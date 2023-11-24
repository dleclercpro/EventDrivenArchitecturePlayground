import process from 'process';
import { ENV } from './config';
import { SERVICE } from './config/services';
import router from './routes';
import logger from './logger';
import AppServer from '../../Common/src/models/AppServer';
import ServiceSubscriber from './models/ServiceSubscriber';



export const Server = new AppServer(logger);
export const Subscriber = new ServiceSubscriber();



const execute = async () => {
    const { server } = await Server.setup(router);

    server.listen(SERVICE.port, async () => {
        logger.debug(`'${SERVICE.name}' app listening in ${ENV} mode at: ${SERVICE.uri}`);

        await Subscriber.createSubscriptions();
    });
}



// Handle graceful shutdown
process.on('SIGTERM', async () => {
    logger.trace(`Received SIGTERM signal.`);
    await Server.stop();
});
process.on('SIGINT', async () => {
    logger.trace(`Received SIGINT signal.`);
    await Server.stop();
});



// Run server
execute()
    .catch((err) => {
        logger.fatal(err, `Uncaught error:`);
    });



export default execute;