import * as path from 'path';
import * as fs from 'fs';
import * as pascalcase from 'pascalcase';
import { ROOT_DIR } from './constants';

type CollectType = 'rn' | 'taro' | 'react';

const kebabCase = str =>
  str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .join('-')
    .toLowerCase();

export function getPkgVersion(): string {
  const lernaJSONPath = path.join(ROOT_DIR, 'lerna.json');
  // eslint-disable-next-line import/no-dynamic-require
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
    kebabCase: kebabCase(name), // 'foo-bar-baz'
  };
}

export const getAllCompFiles = (type: CollectType) => {
  const packagePath = path.resolve(getCliRootPath(), '../packages', type);
  return fs.readdirSync(packagePath);
};

export function collectAllComponentsName(type: CollectType) {
  const files = getAllCompFiles(type);
  return ['all'].concat(files);
}

export function type2FolderName(type): CollectType {
  if (type === 'rn') return 'rn';
  if (type === 'react') return 'react';
  return 'taro';
}

export function getCollectComponent(type: CollectType) {
  const folderTypeName = type2FolderName(type);
  const comps = collectAllComponentsName(folderTypeName);
  return {
    name: 'name',
    type: 'rawlist',
    message: '请选择组件',
    choices: comps,
    default: 'all',
  }
}