export enum TaroPlatform {
  weapp = 'weapp',
  swan = 'swan',
  h5 = 'h5',
  tt = 'tt',
  alipay = 'alipay',
  rn = 'rn',
  qq = 'qq',
  jd = 'jd',
}

export interface IBuildOptions {
  componentName: string;
  type: 'rn' | 'taro' | 'react';
  platform: TaroPlatform;
  env: string;
}

export interface TemplateInfo {
  // 组件类型
  componentType: 'basic' | 'form' | 'view' | 'feedback' | 'navigation' | 'others';
}
