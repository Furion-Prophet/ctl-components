import * as validate from 'validate-npm-package-name';
import * as path from 'path';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as ejs from 'ejs';
import { getCliRootPath, buildComponentName, printPkgVersion } from '../util';

const allowTypes = ['rn', 'taro'];
export const promptList = [
  {
    type: 'input',
    message: '请输入组件名:',
    name: 'name',
    transformer(name) {
      return name.trim();
    },
  },
  {
    name: 'type',
    type: 'checkbox',
    message: '请选择组件类型',
    choices: allowTypes,
    default: ['rn'],
  }
];

export function initComponent({ name, type }) {
  const { kebabCase, PascalCase } = buildComponentName(name);
  const packagePath = path.resolve(getCliRootPath(), '../packages', kebabCase);
  const valid = checkValid(name, packagePath);
  if (!valid) return;
  const tempPath = path.resolve(getCliRootPath(), './template');

  const data = {
    kebabCaseComponentName: kebabCase,
    PascalCaseComponentName: PascalCase,
    version: printPkgVersion(),
  }
  create({ targetPath: packagePath, tempPath, data })
}

function create({ targetPath, tempPath, data = {} }) {
  if (!fs.existsSync(targetPath)) fse.mkdirsSync(targetPath); // 创建组件文件夹
  fs.readdir(tempPath, function(err, files) {
    if (err) {
      console.warn(err, "读取文件夹错误！")
    } else {
      files.forEach((filename) => {
        const tempFilePath = path.join(tempPath, filename);
        fs.stat(tempFilePath, (error, stats) => {
          if (error) {
            console.warn('获取文件stats失败');
          } else {
            const isDir = stats.isDirectory(); //是文件夹
            const isTemp = filename.endsWith('.tpl');
            const newFileName = filename.split('.tpl')[0];
            const targetFile = path.resolve(targetPath, newFileName);
            if (isDir) create({ targetPath: `${targetPath}/${filename}`, tempPath: `${tempPath}/${filename}`, data});
            else if (isTemp) {
              ejs.renderFile(tempFilePath, data, (err, str) => {
                fse.writeFileSync(targetFile, str || '');
              });
            } else fse.copySync(tempFilePath, targetFile);
          }
        })}
      );
    }
  });
}


function checkValid(name, packagePath) {
  const valid = validate(name);
  const { validForNewPackages } = valid;
  if (!validForNewPackages) {
    console.log('组件名称不合法');
    return false
  }
  const hasPackage = fs.existsSync(packagePath);
  if (hasPackage) {
    console.log('该组件已存在');
    return false;
  }
  return true
}