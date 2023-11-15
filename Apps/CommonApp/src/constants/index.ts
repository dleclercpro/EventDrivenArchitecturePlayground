import { name, version } from '../../package.json';
import Release from '../models/Release';
import { Environment } from '../types';

export const ENVIRONMENTS = Object.values(Environment);

export const NEW_LINE_REGEXP = /[\r\n]+/;
export const NEW_LINE = '\n';

export const RELEASE_ZERO = new Release(0, 0, 0);

export const PACKAGE_NAME = name;
export const PACKAGE_VERSION = version;