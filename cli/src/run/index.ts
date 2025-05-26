import { spawn } from 'child_process';
import * as ora from 'ora';
import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';
import * as chokidar from 'chokidar';

import { getCliRootPath, type2FolderName } from '../lib/util';
import { collect } from '../collect';
import log from '../lib/log';
import { IBuildOptions } from '../lib/types';
import { ENV_SHORT } from '../lib/const';
import { TARO_PLAYGROUND } from '../lib/constants';

class Builder {
  options: IBuildOptions;
  constructor(options: IBuildOptions) {
    this.options = options;
  }

  get isRN() {
    return this.options.type === 'rn';
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
  

  taroProcess.on('data', (data) => {
    console.log(data.toString());
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
    else {
      const watchesFile = this.copyDependenciesToProject();
      watches = watchesFile.map((file) => file.path);
    }
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
    }).on('all', (event, path) => {
      log.info('path', event, path);
    });
    this.spawnTaroProcess();
  }
}

export function run(options: IBuildOptions) {
  log.info('进入编译环节');
  const compiler = new Builder(options);
  compiler.build();
}
