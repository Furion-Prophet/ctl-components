import { collectAllComponentsName } from './index';

export const SCOPE_NAME = ''

export const CollectType = {
  name: 'type',
  type: 'rawlist',
  message: '请选择组件类型',
  choices: ['rn', 'taro'],
  default: 'rn',
};

const comps = collectAllComponentsName();
export const CollectComponent = {
  name: 'name',
  type: 'rawlist',
  message: '请选择组件',
  choices: comps,
  default: 'all',
};