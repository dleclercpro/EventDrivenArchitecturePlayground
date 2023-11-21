import { loadEnvironment } from '../../../CommonApp/src/utils/env';
import { EventName } from '../../../CommonApp/src/constants/events';

export const ENV = loadEnvironment();
export const EVENTS = Object.values(EventName);