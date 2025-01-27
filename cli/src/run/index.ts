import { execSync } from 'child_process';
import * as ora from 'ora';
import * as chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs';

import { getCliRootPath, type2FolderName } from '../util';


export function run({ componentName, type }) {
  const isRN = type === 'rn';
  const isAll = componentName === 'all';

  let hasCompPackage = true;
  if (!isAll) {
    const filePath = path.resolve(getCliRootPath(), '../packages', componentName, type2FolderName(type));
    console.log(filePath)
    hasCompPackage = fs.existsSync(filePath);
  }

  if (!hasCompPackage) console.log(chalk.red(`组件${componentName}不存在`));
  else {
    execSync(`ctl collect -n ${componentName} -t ${type}`, { stdio: 'inherit' });
    const spinner = ora(chalk.green('开始构建...\n')).start();
  }

  
  if (isRN) return;
  console.log('xxx')
  
}
