import router from './routes';
import { ENV, SERVICE } from './config';
import logger from './logger';
import { generateBasicServer } from '../../CommonApp/src/utils/server';
import Subscriber from './models/Subscriber';



const server = generateBasicServer(router);

const execute = async () => {

    // Then start listening on given port
    server.listen(SERVICE.port, async () => {
        logger.info(`'${SERVICE.name}' app listening in ${ENV} mode at: ${SERVICE.uri}`);

        await Subscriber.createSubscriptions();
    });
}



execute()
    .catch((err) => {
        logger.fatal(err, `Uncaught error:`);
    });

export default execute;