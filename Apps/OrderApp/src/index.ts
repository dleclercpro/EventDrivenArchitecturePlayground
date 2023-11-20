import router from './routes';
import { ENV, SERVICE, BROKER_SERVICE } from './config';
import logger from './logger';
import { generateBasicServer } from '../../CommonApp/src/utils/server';
import { EventName } from '../../CommonApp/src/constants/events';
import { SubscribeData } from '../../CommonApp/src/types/APITypes';



const server = generateBasicServer(router);

const url = `${BROKER_SERVICE.uri}/subscribe`;
const events = [EventName.PaymentUnsuccessful, EventName.DeliveryAborted, EventName.DeliveryCompleted];

const execute = async () => {

    // Then start listening on given port
    server.listen(SERVICE.port, async () => {
        logger.info(`'${SERVICE.name}' app listening in ${ENV} mode at: ${SERVICE.uri}`);

        // Subscribe to relevant events via broker
        await Promise.all(events.map(async (event: EventName) => {
            const data = {
                service: SERVICE,
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