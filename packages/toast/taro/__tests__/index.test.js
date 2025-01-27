import Taro from '@tarojs/taro-h5';
import Nerv from 'nervjs';
import { renderToString } from 'nerv-server';
import { renderIntoDocument } from 'nerv-test-utils';
import ToastPage from '../../../taro-playground/.temp/pages/toast';
import Toast from '../../../taro-playground/.temp/components/toast/taro';

describe('toast:taro snap', () => {
  const page = renderIntoDocument(<ToastPage />);

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

describe('toast:taro behaviour', () => {})
