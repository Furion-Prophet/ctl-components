import Taro from '@tarojs/taro-h5';
import Nerv from 'nervjs';
import { renderToString } from 'nerv-server';
import { renderIntoDocument } from 'nerv-test-utils';
import TestPage from '../../../taro-playground/.temp/pages/test';
import Test from '../../../taro-playground/.temp/components/test/taro';

describe('test:taro snap', () => {
  const page = renderIntoDocument(<TestPage />);

  const { cases } = page;
  const names = Object.keys(cases);

  names.forEach((name) => {
    it(name, () => {
      const comp = renderToString(cases[name]);
      // 初始化默认注释，merge 前需要打开指定端的单测开关
      // expect(comp).toMatchSnapshot();
    });
  });
});

describe('test:taro behaviour', () => {})
