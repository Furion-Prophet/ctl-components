import Taro from '@tarojs/taro-h5';
import Nerv from 'nervjs';
import { renderToString } from 'nerv-server';
import { renderIntoDocument } from 'nerv-test-utils';
import CLoadingPage from '../../../taro-playground/.temp/pages/loading';
import CLoading from '../../../taro-playground/.temp/components/loading/taro';

describe('loading:taro snap', () => {
  const page = renderIntoDocument(<CLoadingPage />);

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

describe('loading:taro behaviour', () => {})
