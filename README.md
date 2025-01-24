# 组件库实践

## 本地启动
* 1.安装依赖
```
yarn install
```
* 2.初始化命令行工具
```
cd cli
yarn build
yarn link
cd ..
```
* 3.新建组件
根目录执行==ctl create==，根据提示输入组件信息
```
**/ctl-components % ctl create

? 请输入组件名: buttons
? 请选择组件类型 rn
? 组件中文名 按钮
```
会在packages生成对应的组件目录。
==这里如果报错了(Error: certificate has expired), 已经创建成功，install失败，进入组件目录重新install==

**生成组件的目录结构**
```
buttons
├── rn
│   ├── __tests__
│   │   └── index.tsx
│   ├── demo
│   │   └── index.tsx
│   |── typings
│   │   └── component-rn.d.ts
│   |── package.json
│   |── README.json
│   |── tsconfig.json
│   └── index.tsx
├── taro
│   ├── __tests__
│   │   └── index.test.js
│   ├── demo
│   │   └── index.tsx
│   |── typings
│   │   └── component-taro.d.ts
│   |── package.json
│   |── README.json
│   |── tsconfig.json
│   └── index.tsx
```

### 包管理工具
yarn + lerna

### 代码规范
**ESLint**
一款插件化的JavaScript代码静态检查工具，其核心是通过对代码解析得到的AST进行模式匹配，定位不符合规范的代码，用于定义写涉及代码质量方面的规则。目前开源社区已有针对各种场景、框架的插件，也有各种ESLint规则的配置方案，基本可以涵盖前端现有的大部分场景。

**Prettier**
一个代码格式化工具，用以统一团队中的书写风格，包括是否加分号以及尾逗号等格式化规则，只能用于对格式上的约束，无法对代码质量进行检查，需要配合ESLint使用。

**stylelint**
用于样式文件的规范约束及格式化

**git husky**
将Lint放在本地仅靠开发者的自觉去遵守是不够的的，很难避免因一些疏漏导致规范执行不到位，因此需要在将本地代码commit前就要进行静态检查，阻断不符合规范的代码提交。

通过husky可以注册git hooks, 在pre-commit这个hook中增加Lint的校验规则，拦截一些错误的提交。

当然仅仅husky依靠保障代码质量并不完全可靠，因为开发者可以主动跳过检查。若为了严格执行代码检测，还需要再代码交付前通过检测平台再进行检测。

**lint-staged**
通过husky注册的git hook会对仓库中的所有文件都执行检查，通过结合lint-staged可以做到仅仅对提交到git暂存区的文件进行检查从而减少校验时间。

**tslint类型检查**
为了编写出更高质量的代码，减少类型错误的bug，使用TypeScript进行类型约束。
