import { loadEnvironment } from '../../../Common/src/utils/env';
import { EventName } from '../../../Common/src/constants/events';

export const ENV = loadEnvironment();
export const EVENTS = Object.values(EventName);