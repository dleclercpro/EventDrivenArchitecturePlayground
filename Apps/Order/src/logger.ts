import { getLoggerByEnvironment } from '../../Common/src/utils/logging';
import { ENV, LOGGING_LEVEL } from './config';

export default getLoggerByEnvironment(ENV, LOGGING_LEVEL);