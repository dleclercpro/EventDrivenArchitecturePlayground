import { EventName } from '../../../Common/src/constants/events';
import { loadEnvironment } from '../../../Common/src/utils/env';

export const ENV = loadEnvironment();
export const SUBSCRIBED_EVENTS = [EventName.PaymentSuccess];