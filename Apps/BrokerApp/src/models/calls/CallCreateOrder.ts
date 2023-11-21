import Call from '../../../../CommonApp/src/models/calls/Call';
import { CallMethod, CreateOrderRequestData } from '../../../../CommonApp/src/types/APITypes';
import { ORDER_SERVICE } from '../../config/services';

class CallCreateOrder extends Call<CreateOrderRequestData> {
    protected method: CallMethod = `POST`;

    public constructor() {
        super(`${ORDER_SERVICE.uri}/order`);
    }
}

export default CallCreateOrder;