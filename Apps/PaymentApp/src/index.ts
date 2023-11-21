import router from './routes';
import { ENV } from './config';
import logger from './logger';
import { generateBasicServer } from '../../CommonApp/src/utils/server';
import ServiceSubscriber from './models/ServiceSubscriber';
import { SERVICE } from './config/services';



export const server = generateBasicServer(router);
export const subscriber = new ServiceSubscriber();

const execute = async () => {
    server.listen(SERVICE.port, async () => {
        logger.info(`'${SERVICE.name}' app listening in ${ENV} mode at: ${SERVICE.uri}`);

        await subscriber.createSubscriptions();
    });
}



execute()
    .catch((err) => {
        logger.fatal(err, `Uncaught error:`);
    });

export default execute;