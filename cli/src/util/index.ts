import * as path from 'path';
import * as _ from 'lodash';
import * as pascalcase from 'pascalcase';
import { ROOT_DIR } from '../lib/constants';

export function getPkgVersion(): string {
  const lernaJSONPath = path.join(ROOT_DIR, 'lerna.json');
  const { version } = require(lernaJSONPath);
  return version;
}

export function printPkgVersion() {
  const version = getPkgVersion();
  return version;
}

export function getCliRootPath(): string {
  return path.resolve(__dirname, '../../');
}

export function buildComponentName(name) {
  return {
    PascalCase: pascalcase(name), // '大驼峰'
    kebabCase: _.kebabCase(name), // 'foo-bar-baz'
  };
}