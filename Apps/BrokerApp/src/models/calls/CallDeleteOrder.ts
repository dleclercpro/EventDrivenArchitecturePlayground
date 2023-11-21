import Call from '../../../../CommonApp/src/models/calls/Call';
import { CallMethod, DeleteOrderRequestData } from '../../../../CommonApp/src/types/APITypes';
import { ORDER_SERVICE } from '../../config';

class CallDeleteOrder extends Call<DeleteOrderRequestData> {
    protected method: CallMethod = `DELETE`;

    public constructor() {
        super(`${ORDER_SERVICE.uri}/order`);
    }
}

export default CallDeleteOrder;