{
  "name": "@local/<%= kebabCaseComponentName %>",
  "version": "<%= version %>",
  "homepage": "",
  "license": "MIT",
  "main": "index.js",
  "scripts": {
    "build": "tsc --project ./tsconfig.json",
    "clean": "rm -rf lib"
  },
  "dependencies": {
    "classnames": "^2.2.6"
  },
  "devDependencies": {
    "@tarojs/components": "2.1.0",
    "@tarojs/router": "2.1.0",
    "@tarojs/taro": "2.1.0",
    "@tarojs/taro-alipay": "2.1.0",
    "@tarojs/taro-h5": "2.1.0",
    "@tarojs/taro-weapp": "2.1.0",
    "nervjs": "^1.5.5",
    "react": "16.8.3",
    "react-native": "0.59.10",
    "react-test-renderer": "16.8.3",
    "@types/react": "17.0.2"
  }
}
