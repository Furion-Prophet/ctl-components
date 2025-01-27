import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';
import * as ora from 'ora';
import * as fse from 'fs-extra';
import { execSync } from 'child_process';
import { getCliRootPath, getAllCompFiles, type2FolderName } from '../util';

function toNodeModules({ componentPath, targetPath }) {
  execSync(`cp -r ${componentPath}/. ${targetPath}`);
}

function toRNRuntime({ componentPath, name }) {
  const demoPath = path.resolve(componentPath, 'rn/demo');
  const runtimeRnPath = path.resolve(
    getCliRootPath(),
    '../packages',
    'runtime-rn/src/components'
  );
  execSync(`cp -r ${demoPath}/. ${runtimeRnPath}`);
}

function toTaroRuntime({ componentPath, name }) {
  const demoPath = path.resolve(componentPath, 'taro/demo');
  const runtimeTaroPath = path.resolve(
    getCliRootPath(),
    '../packages',
    'runtime-taro/src/components',
    name
  );
  execSync(`cp -r ${demoPath}/. ${runtimeTaroPath}`);
}

function onRuntime({ componentPath, targetPath, name }) {
  toTaroRuntime({ componentPath, name });
  toNodeModules({ componentPath, targetPath });

  watches.push({ name, path: componentPath });
}

// 生成本地运行时的页面route config
function setRuntimeConfigOnTaro() {
  const configPath = path.resolve(
    getCliRootPath(),
    '../packages/runtime-taro/src/app.config.ts'
  );
  const pages = [
    'pages/index/index',
    ...watches.map((file) => `components/${file.name}/index`),
  ];
  const config = `export default {
    pages: ${JSON.stringify(pages)},
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
  };\n`;
  fs.writeFileSync(configPath, config, { flag: 'w+' });
}

const watches: any[] = [];
export function collect({ type, name }) {
  const isAll = name === 'all';

  const componentsPath = path.resolve(getCliRootPath(), '../packages/runtime-taro/src/components')
  const hasComponents = fs.existsSync(componentsPath);
  if (!hasComponents) fse.mkdirsSync(componentsPath);

  const spinner = ora(chalk.green('收集组件工作开始...\n')).start();

  const runtimePath = path.resolve(getCliRootPath(), '../node_modules', '@ctl');
  const hasPackage = fs.existsSync(runtimePath);
  if (!hasPackage) fse.mkdirsSync(runtimePath);

  if (isAll || !name) {
    const files = getAllCompFiles();
    files.forEach((filename) => {
      const componentPath = path.resolve(
        getCliRootPath(),
        '../packages',
        filename
      );

      const targetPath = path.resolve(
        getCliRootPath(),
        '../node_modules',
        '@ctl',
        filename
      );

      onRuntime({ componentPath, targetPath, name: filename });
    });
  } else {
    const filePath = path.resolve(getCliRootPath(), '../packages', name, type2FolderName(type));
    const hasCompPackage = fs.existsSync(filePath);
    if (!hasCompPackage) {
      return spinner.fail(chalk.red(`${name}组件不存在`));
    }
    const targetPath = path.resolve(
      getCliRootPath(),
      '../node_modules',
      '@ctl',
      name
    );
    const componentPath = path.resolve(getCliRootPath(), '../packages', name);
    onRuntime({ componentPath, targetPath, name });
  }

  spinner.succeed(chalk.green('demo收集完成'));

  setRuntimeConfigOnTaro();

  // const watcher = chokidar.watch(
  //   watches.map((watch) => `${watch.path}/${type}`),
  //   {
  //     persistent: true,
  //     ignoreInitial: true,
  //   }
  // );
}
