{
  "name": "@ctl/<%= kebabCaseComponentName %>",
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
    "@tarojs/components": "^3.5.6",
    "@tarojs/router": "^3.5.6",
    "@tarojs/taro": "^3.5.6",
    "@tarojs/taro-alipay": "2.1.0",
    "@tarojs/taro-h5": "2.1.0",
    "@tarojs/taro-weapp": "2.1.0",
    "nervjs": "^1.5.5",
    "react": "16.8.3",
    "@types/react": "^16.0.0",
    "@types/classnames": "^2.2.10"
  }
}
