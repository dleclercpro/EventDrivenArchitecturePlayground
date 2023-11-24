import { Level } from 'pino';
import { loadEnvironment } from '../../../Common/src/utils/env';
import { EventName } from '../../../Common/src/constants/events';

export const ENV = loadEnvironment();
export const LOGGING_LEVEL = (process.env.LOGGING_LEVEL ?? 'debug') as Level;
export const SUBSCRIBED_EVENTS = [EventName.PaymentFailure, EventName.DeliveryCompleted];