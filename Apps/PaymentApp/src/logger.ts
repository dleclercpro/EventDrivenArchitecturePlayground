import { getLoggerByEnvironment } from '../../CommonApp/src/utils/logging';
import { ENV } from './config';

export default getLoggerByEnvironment(ENV);