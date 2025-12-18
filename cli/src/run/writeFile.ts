import * as fs from 'fs';
import * as path from 'path';
import { getCliRootPath } from '../lib/util';
import { TemplateInfo } from '../lib/types';

export function writeFileTaroHomeConstants(templateInfos: TemplateInfo[], pagesRoute: string[]) {
  const runtimeHomePath = path.resolve(
    getCliRootPath(),
    '../packages/runtime-taro/src/const.ts'
  );
  const config = `
    export const templateInfos = ${JSON.stringify(templateInfos)};
    export const pagesRoute = ${JSON.stringify(pagesRoute)};
    \n
  `;
  fs.writeFileSync(runtimeHomePath, config, { flag: 'w+' });
}
