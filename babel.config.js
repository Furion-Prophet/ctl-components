// eslint-disable-next-line import/no-extraneous-dependencies
const taroApis = require('@tarojs/taro-h5/dist/taroApis');

const rnConfig = {
  presets: ['module:metro-react-native-babel-preset'],
};

const taroConfig = {
  presets: [
    [
      '@babel/preset-env',
      {
        spec: true,
        useBuiltIns: false,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'Nerv.createElement',
      },
    ],
    '@babel/plugin-proposal-object-rest-spread',
    [
      'babel-plugin-transform-taroapi',
      {
        apis: taroApis,
        packageName: '@tarojs/taro-h5',
      },
    ],
  ],
};

exports.rn = rnConfig;

exports.taroH5 = taroConfig;

module.exports = (api) => {
  if (api.env((envName) => envName.includes('rn'))) {
    return rnConfig;
  }
  return taroConfig;
};
