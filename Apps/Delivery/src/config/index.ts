import { Level } from 'pino';
import { EventName } from '../../../Common/src/constants/events';
import { loadEnvironment } from '../../../Common/src/utils/env';

export const ENV = loadEnvironment();
export const LOGGING_LEVEL = (process.env.LOGGING_LEVEL ?? 'debug') as Level;
export const SUBSCRIBED_EVENTS = [EventName.PaymentSuccess];