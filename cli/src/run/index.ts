import { execSync } from 'child_process';
import * as ora from 'ora';
import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';
import * as chokidar from 'chokidar';

import { getCliRootPath, type2FolderName } from '../util';
import { collect } from '../collect';


export function run({ componentName, type }) {
  const isRN = type === 'rn';
  const isAll = componentName === 'all';
  const folderTypeName = type2FolderName(type);

  let hasCompPackage = true;
  let watches:string[] = [];
  if (!isAll) {
    const filePath = path.resolve(getCliRootPath(), '../packages', folderTypeName, componentName);
    hasCompPackage = fs.existsSync(filePath);
  }

  if (!hasCompPackage) console.log(chalk.red(`组件${componentName}不存在`));
  else {
    const watchesFile = collect({ name: componentName, type });
    watches = watchesFile.map((file) => file.path);
  }
  const spinner = ora(chalk.green('开始构建...\n')).start();
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
    collect({ name: componentName, type })
  });
}
