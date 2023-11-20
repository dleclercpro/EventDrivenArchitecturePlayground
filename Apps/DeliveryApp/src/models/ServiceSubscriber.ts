import { EventName } from '../../../CommonApp/src/constants/events';
import { BROKER_SERVICE, SERVICE } from '../config';
import Subscriber from '../../../CommonApp/src/models/Subscriber';

class ServiceSubscriber extends Subscriber {
    protected broker = BROKER_SERVICE;
    protected service = SERVICE;
    protected events = [EventName.OrderCancelled, EventName.PaymentSuccessful];
}

export default ServiceSubscriber;