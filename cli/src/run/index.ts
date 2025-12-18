import { spawn } from 'child_process';
import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';
import * as chokidar from 'chokidar';

import { getCliRootPath, type2FolderName, getSpecifiedValOfPkg } from '../lib/util';
import { collect, updateComponentChange,  } from '../collect';
import log from '../lib/log';
import { IBuildOptions, TemplateInfo } from '../lib/types';
import { ENV_SHORT, COMP_TYPES } from '../lib/const';
import { TARO_PLAYGROUND, PACKAGES_DIR } from '../lib/constants';
import { writeFileTaroHomeConstants } from './writeFile';

class Builder {
  options: IBuildOptions;

  constructor(options: IBuildOptions) {
    this.options = options;
  }

  get isRN() {
    return this.options.type === 'rn';
  }

  getCompInfo(compName): TemplateInfo {
    const { type } = this.options;
    const compPackageJsonPath = path.join(PACKAGES_DIR, type, compName, 'package.json');

    const templateInfo = getSpecifiedValOfPkg('templateInfo', compPackageJsonPath);
    return templateInfo;
  }

  // 生成本地运行时的页面route config
  setRuntimeConfigOnTaro(watches: any[]) {
    const { type } = this.options;

    if (type === 'taro') {
      const pagesRoute = ['pages/index/index'];
      const templateInfos: TemplateInfo[] = [];
      watches.forEach((file) => {
        const templateInfo = this.getCompInfo(file.name);
        templateInfos.push(templateInfo);
        pagesRoute.push(`components/${file.name}/index`);
      });

      writeFileTaroHomeConstants(templateInfos, pagesRoute);
    }
  }

  spawnTaroProcess() {
    const { env, platform } = this.options;
    const scriptsName = `${ENV_SHORT[env]}:${platform}`;
    const taroProcess = spawn('yarn', [scriptsName], {
      cwd: TARO_PLAYGROUND,
      stdio: 'inherit',
      env: {
        ...process.env,
        env,
        platform,
      },
    });

    taroProcess.on('exit', () => {
      log.info(`Taro构建任务完成`);
      process.exit(0);
    });

    taroProcess.on('error', (err) => {
      log.error(`Taro子进程出现错误，请检查: ${err}`);
      process.exit(1);
    });
  }

  copyDependenciesToProject() {
    const { type, componentName } = this.options;
    log.info('收集目标包复制至集成开发环境');
    return collect({ name: componentName, type });
  }
  
  build() {
    const { type, componentName } = this.options;
    let hasCompPackage = true;
    let watches:string[] = [];
    const folderTypeName = type2FolderName(type);
    const isAll = componentName === 'all';
    if (!isAll) {
      const filePath = path.resolve(getCliRootPath(), '../packages', folderTypeName, componentName);
      hasCompPackage = fs.existsSync(filePath);
    }

    if (!hasCompPackage) console.log(chalk.red(`组件${componentName}不存在`));
    const watchesFile = this.copyDependenciesToProject();
    watches = watchesFile.map((file) => file.path);
    chokidar.watch(watches, {
      ignoreInitial: true,
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/__tests__/**",
        "**/README.md",
        "**/yarn.lock",
        "**/package.json",
        "**/tsconfig.json",
      ],
      persistent: true,
      awaitWriteFinish: {
        stabilityThreshold: 1000,
      },
    }).on('all', (event, changePath) => {
      log.info('path', event, changePath);
      updateComponentChange({ changePath });
    });
    this.setRuntimeConfigOnTaro(watchesFile);
    this.spawnTaroProcess();
  }
}

export function run(options: IBuildOptions) {
  log.info('进入编译环节');
  const compiler = new Builder(options);
  compiler.build();
}
