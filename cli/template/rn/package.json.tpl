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
  "templateInfo": {
    "name": "<%= name %>",
    "name_CH": "<%= name_CH %>",
    "platform": "rn"
  },
  "dependencies": {
    "classnames": "^2.2.6"
  },
  "devDependencies": {
    "nervjs": "^1.5.5",
    "react": "16.8.3",
    "react-native": "0.59.10",
    "react-test-renderer": "16.8.3",
    "@types/react": "16.0.0",
    "@types/react-native": "0.60.0",
    "@types/react-test-renderer": "17.0.0"
  },
  "resolutions": {
    "@types/react": "16.0.0"
  }
}
