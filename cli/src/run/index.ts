import { execSync } from 'child_process';
import * as ora from 'ora';
import * as chalk from 'chalk';

export function run({ componentName, type }) {
  console.log('run', `componentName: ${componentName}`, `type: ${type}`);
  const isRN = type === 'rn';
  const isAll = componentName === 'all';

  execSync(`ctl collect -n ${componentName} -t ${type}`, { stdio: 'inherit' });
  const spinner = ora(chalk.green('开始构建...\n')).start();
  if (isRN) return;
  
  console.log('xxx')
  
}
