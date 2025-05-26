export interface IBuildOptions {
  componentName: string;
  type: 'rn' | 'taro' | 'react';
  platform: 'weapp' | 'swan' | 'h5' | 'tt' | 'alipay' | 'rn' | 'qq' | 'jd' | 'quickapp';
  env: string;
}
