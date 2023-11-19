import router from './routes';
import { ENV, APP_PORT, APP_URI } from './config';
import logger from './logger';
import { APP_NAME } from './constants';
import { generateBasicServer } from '../../CommonApp/src/utils/server';



const server = generateBasicServer(router);

const execute = async () => {

    // Then start listening on given port
    server.listen(APP_PORT, () => {
        logger.info(`'${APP_NAME}' app listening in ${ENV} mode at: ${APP_URI}`);
    });
}



execute()
    .catch((err) => {
        logger.fatal(err, `Uncaught error:`);
    });

export default execute;