export const SCOPE_NAME = ''
export const AllowTypes = [{ name: 'rn', value: 'rn' }, { name: 'taro', value: 'taro' }, { name: 'react(未支持)', value: 'react' }];

export const TaroPlatform = {
  weapp: 'weapp',
  swan: 'swan',
  h5: 'h5',
  tt: 'tt',
  alipay: 'alipay',
  rn: 'rn',
  qq: 'qq',
  jd: 'jd',
}

export const CollectType = {
  name: 'type',
  type: 'rawlist',
  message: '请选择组件类型',
  choices: AllowTypes,
  default: 'rn',
};

export const ENV_SHORT = {
  dev: 'dev',
  test: 'test',
  prod: 'prod',
};

export const TaroPlatformCollect = {
  name: 'platform',
  type: 'rawlist',
  message: '请选择运行环境',
  choices: Object.values(TaroPlatform),
  default: TaroPlatform.h5,
}
