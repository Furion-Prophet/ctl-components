import * as path from 'path';
import * as fs from 'fs';
import * as chalk from 'chalk';
import * as ora from 'ora';
import { getCliRootPath } from '../util';

const getAllCompFiles = () => {
  const packagePath = path.resolve(getCliRootPath(), '../packages');
  const files = fs.readdirSync(packagePath);
  return files.filter(
    (name) => name !== 'runtime-taro' && name !== 'runtime-rn'
  );
};
export function collectAllComponentsName() {
  const files = getAllCompFiles();
  return ['all'].concat(files);
}

export function collect({ type, name }) {
  const isAll = name === 'all';
  const spinner = ora(chalk.green('收集组件工作开始...\n')).start();

  const packagePath = path.resolve(getCliRootPath(), '../packages');
  if (isAll || !name) {
    const files = getAllCompFiles();
    files.forEach((filename) => {
      const filePath = path.resolve(
        getCliRootPath(),
        '../packages',
        filename,
        type
      );
      console.log(filePath);
    });
  } else {
    const filePath = path.resolve(getCliRootPath(), '../packages', name, type);
    const hasPackage = fs.existsSync(filePath);
    if (!hasPackage) {
      return spinner.fail(chalk.red(`${name}组件不存在`));
    } 
    
  }

  // spinner.succeed(chalk.green('收集完成'));
}
