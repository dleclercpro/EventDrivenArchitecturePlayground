import { ENV } from './config';
import { SERVICE } from './config/services';
import router from './routes';
import logger from './logger';
import { generateBasicServer } from '../../CommonApp/src/utils/server';



const server = generateBasicServer(router);

const execute = async () => {
    server.listen(SERVICE.port, () => {
        logger.debug(`'${SERVICE.name}' app listening in ${ENV} mode at: ${SERVICE.uri}`);
    });
}



execute()
    .catch((err) => {
        logger.fatal(err, `Uncaught error:`);
    });

export default execute;