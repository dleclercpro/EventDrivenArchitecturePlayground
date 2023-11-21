import { EventName } from '../../../CommonApp/src/constants/events';
import Subscriber from '../../../CommonApp/src/models/Subscriber';
import { BROKER_SERVICE, SERVICE } from '../config/services';

class ServiceSubscriber extends Subscriber {
    protected broker = BROKER_SERVICE;
    protected service = SERVICE;
    protected events = [EventName.OrderCancelled, EventName.PaymentSuccess];
}

export default ServiceSubscriber;