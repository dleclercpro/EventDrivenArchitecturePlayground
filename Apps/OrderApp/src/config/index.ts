import { loadEnvironment } from '../../../CommonApp/src/utils/env';
import { EventName } from '../../../CommonApp/src/constants/events';

export const ENV = loadEnvironment();
export const SUBSCRIBED_EVENTS = [EventName.PaymentFailure, EventName.DeliveryCompleted];