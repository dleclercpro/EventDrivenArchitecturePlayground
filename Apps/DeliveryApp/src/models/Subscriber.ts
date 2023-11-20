import { EventName } from '../../../CommonApp/src/constants/events';
import { SubscribeData } from '../../../CommonApp/src/types/APITypes';
import { BROKER_SERVICE, SERVICE } from '../config';
import CallSubscribe from '../../../CommonApp/src/calls/CallSubscribe';

class Subscriber {
    private static instance?: Subscriber;
    protected subscriptionsDone: boolean;

    private constructor() {
        this.subscriptionsDone = false;
    }

    public static getInstance() {
        if (!Subscriber.instance) {
            Subscriber.instance = new Subscriber();
        }

        return Subscriber.instance;
    }

    public hasSubscribed() {
        return this.subscriptionsDone;
    }

    public async createSubscriptions() {
        const events = [EventName.OrderCanceled, EventName.PaymentSuccessful];

        // Subscribe to relevant events via broker
        await Promise.all(events.map(async (event: EventName) => {
            const data = { service: SERVICE, event } as SubscribeData;

            await new CallSubscribe(BROKER_SERVICE).execute(data);
        }));
    }
}

export default Subscriber.getInstance();