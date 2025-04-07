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
  const demoPath = path.resolve(componentPath, 'demo');
  const runtimeRnPath = path.resolve(
    getCliRootPath(),
    '../packages',
    'runtime-rn/src/components'
  );
  execSync(`cp -r ${demoPath}/. ${runtimeRnPath}`);
}

function toTaroRuntime({ componentPath, name }) {
  const demoPath = path.resolve(componentPath, 'demo');
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

  const folderTypeName = type2FolderName(type);
  const componentsPath = path.resolve(getCliRootPath(), `../packages/runtime-${folderTypeName}/src/components`);
  const hasComponents = fs.existsSync(componentsPath);
  if (!hasComponents) fse.mkdirsSync(componentsPath);

  const spinner = ora(chalk.green('收集组件工作开始...\n')).start();

  const runtimePath = path.resolve(getCliRootPath(), '../node_modules', '@ctl', folderTypeName);

  fse.mkdirsSync(runtimePath);

  if (isAll || !name) {
    const files = getAllCompFiles(folderTypeName);
    files.forEach((filename) => {
      const componentPath = path.resolve(
        getCliRootPath(),
        `../packages`,
        `${folderTypeName}/${filename}`
      );

      const targetPath = path.resolve(runtimePath, filename);

      onRuntime({ componentPath, targetPath, name: filename });
      spinner.info(chalk.green(`${filename}组件收集完成`));
    });
  } else {
    const filePath = path.resolve(getCliRootPath(), '../packages', name, folderTypeName);
    const hasCompPackage = fs.existsSync(filePath);
    if (!hasCompPackage) {
      spinner.fail(chalk.red(`${name}组件不存在`));
      return [];
    }
    const targetPath = path.resolve(runtimePath, name);

    const componentPath = path.resolve(getCliRootPath(), '../packages', name);
    onRuntime({ componentPath, targetPath, name });
    spinner.info(chalk.green(`${name}组件收集完成`));
  }

  spinner.succeed(chalk.green('demo收集完成'));

  setRuntimeConfigOnTaro();

  return watches;
}
