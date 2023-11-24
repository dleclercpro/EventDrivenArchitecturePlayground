import Call from '../../../../Common/src/models/calls/Call';
import { CallMethod, DeleteOrderRequestData } from '../../../../Common/src/types/APITypes';
import { ORDER_SERVICE } from '../../config/services';

class CallDeleteOrder extends Call<DeleteOrderRequestData> {
    protected method: CallMethod = `DELETE`;

    public constructor() {
        super(`${ORDER_SERVICE.uri}/order`);
    }
}

export default CallDeleteOrder;