import { Environment } from './types';
import { ENV } from './config';
import logger from './logger';



const execute = async () => {
    logger.debug('Boilerplate.');
}



if ([Environment.Development, Environment.Production].includes(ENV)) {
    execute()
        .catch((err) => {
            logger.fatal(err, `Stopped everything. Uncaught error:`);
        });
}



export default execute;