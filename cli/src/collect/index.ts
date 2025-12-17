import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';
import * as fse from 'fs-extra';
import { execSync } from 'child_process';
import { getCliRootPath, getAllCompFiles, type2FolderName } from '../lib/util';
import log from '../lib/log';

const NodeModulesPath = path.resolve(getCliRootPath(), '../node_modules', '@ctl');

export function toNodeModules({ componentPath, targetPath }) {
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

export function updateComponentChange({ changePath }) {
  const [, folderPath] = changePath.split(/packages\//);
  const [type, ...other] = folderPath.split('/');
  // const filename = other[other.length - 1];
  const commonpath = other.slice(0, -1).join('/');

  const isDemoChange = changePath.includes('/demo');
  if (isDemoChange) {
    const runtimeTaroPath = path.resolve(
      getCliRootPath(),
      '../packages',
      `runtime-${type}/src/components`,
      `${commonpath}/`
    );
    execSync(`cp -r ${changePath} ${runtimeTaroPath}`);
  } else {
    const runtimePath = path.resolve(NodeModulesPath, `${type}/${commonpath}/`);
    execSync(`cp -r ${changePath} ${runtimePath}`);
  }
}

const watches: any[] = [];
export function collect({ type, name }) {
  const isAll = name === 'all';

  const folderTypeName = type2FolderName(type);
  const componentsPath = path.resolve(getCliRootPath(), `../packages/runtime-${folderTypeName}/src/components`);
  const hasComponents = fs.existsSync(componentsPath);
  if (!hasComponents) fse.mkdirsSync(componentsPath);

  log.info('收集组件工作开始...\n');

  const runtimePath = path.resolve(NodeModulesPath, folderTypeName);

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
      log.info(`${filename}组件收集完成`);
    });
  } else {
    const filePath = path.resolve(getCliRootPath(), '../packages', folderTypeName, name);
    const hasCompPackage = fs.existsSync(filePath);
    if (!hasCompPackage) {
      log.error(chalk.red(`${name}组件不存在`));
      return [];
    }
    const targetPath = path.resolve(runtimePath, name);

    onRuntime({ componentPath: filePath, targetPath, name });
    log.info(chalk.green(`${name}组件收集完成`));
  }

  log.success(chalk.green('demo收集完成'));

  setRuntimeConfigOnTaro();

  return watches;
}
