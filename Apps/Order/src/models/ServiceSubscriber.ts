import Subscriber from '../../../Common/src/models/Subscriber';
import { SUBSCRIBED_EVENTS } from '../config';
import { BROKER_SERVICE, SERVICE } from '../config/services';

class ServiceSubscriber extends Subscriber {
    protected broker = BROKER_SERVICE;
    protected service = SERVICE;
    protected events = SUBSCRIBED_EVENTS;
}

export default ServiceSubscriber;