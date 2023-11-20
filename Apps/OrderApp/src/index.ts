import router from './routes';
import { ENV, APP_PORT, APP_URI, BROKER_SERVICE, SELF_SERVICE } from './config';
import logger from './logger';
import { APP_NAME } from './constants';
import { generateBasicServer } from '../../CommonApp/src/utils/server';
import { EventName } from '../../CommonApp/src/constants/events';
import { SubscribeData } from '../../CommonApp/src/types/APITypes';



const server = generateBasicServer(router);

const url = `${BROKER_SERVICE.uri}/subscribe`;
const events = [EventName.PaymentUnsuccessful, EventName.DeliveryAborted, EventName.DeliveryCompleted];

const execute = async () => {

    // Then start listening on given port
    server.listen(APP_PORT, async () => {
        logger.info(`'${APP_NAME}' app listening in ${ENV} mode at: ${APP_URI}`);

        // Subscribe to relevant events via broker
        await Promise.all(events.map(async (event: EventName) => {
            const data = {
                service: SELF_SERVICE,
                event,
            } as SubscribeData;

            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            };
    
            await fetch(url, options);
        }));
    });
}



execute()
    .catch((err) => {
        logger.fatal(err, `Uncaught error:`);
    });

export default execute;