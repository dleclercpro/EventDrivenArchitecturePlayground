import router from './routes';
import { ENV, SERVICE } from './config';
import logger from './logger';
import { generateBasicServer } from '../../CommonApp/src/utils/server';
import ServiceSubscriber from './models/ServiceSubscriber';



const server = generateBasicServer(router);

const execute = async () => {
    server.listen(SERVICE.port, async () => {
        logger.info(`'${SERVICE.name}' app listening in ${ENV} mode at: ${SERVICE.uri}`);

        await new ServiceSubscriber().createSubscriptions();
    });
}



execute()
    .catch((err) => {
        logger.fatal(err, `Uncaught error:`);
    });

export default execute;