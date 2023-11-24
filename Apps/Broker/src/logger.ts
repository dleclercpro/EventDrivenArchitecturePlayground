import { getLoggerByEnvironment } from '../../Common/src/utils/logging';
import { ENV } from './config';

export default getLoggerByEnvironment(ENV);