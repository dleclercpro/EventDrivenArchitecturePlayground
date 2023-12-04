import EventGenerator from '../../../Common/src/models/EventGenerator';
import CallPublish from '../../../Common/src/models/calls/CallPublish';
import { Event, Order } from '../../../Common/src/types';
import { BROKER_SERVICE, SERVICE } from '../config/services';
import logger from '../logger';

class OrderManager {
    protected order: Order;

    public constructor(order: Order) {
        this.order = order;
    }

    public async completeOrder() {
        logger.trace(`Order was completed. [Order ID: ${this.order.id}]`);
        await this.publishEvent(EventGenerator.generateOrderCompletedEvent(this.order));
    }

    public async cancelOrder() {
        logger.trace(`Order was cancelled. [Order ID: ${this.order.id}]`);
        await this.publishEvent(EventGenerator.generateOrderCancelledEvent(this.order));
    }

    protected async publishEvent(event: Event) {
        await new CallPublish(BROKER_SERVICE).execute({
            service: SERVICE.name,
            event: {
                ...event,
                userId: event.userId,
            },
        });
    }
}

export default OrderManager;