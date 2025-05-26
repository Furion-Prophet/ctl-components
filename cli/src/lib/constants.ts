import * as path from 'path';

export const ROOT_DIR = path.resolve(__dirname, '../../../');

export const PACKAGES_DIR = path.join(ROOT_DIR, 'packages');

export let TARO_PLAYGROUND = path.join(PACKAGES_DIR, 'runtime-taro');