import renderer from 'react-test-renderer';
import cases from '../demo';

describe('正常渲染即可', () => {
  Object.keys(cases).forEach((caseName) =>
    it(caseName, () => {
      const testCase = cases[caseName];
      const instance = renderer.create(testCase);
      // 初始化默认注释，merge 前需要打开指定端的单测开关
      // expect(instance.toJSON()).toMatchSnapshot();
    }),
  );
});
