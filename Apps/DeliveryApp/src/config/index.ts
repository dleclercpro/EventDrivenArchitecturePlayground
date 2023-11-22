import { EventName } from '../../../CommonApp/src/constants/events';
import { loadEnvironment } from '../../../CommonApp/src/utils/env';

export const ENV = loadEnvironment();
export const SUBSCRIBED_EVENTS = [EventName.PaymentSuccess];