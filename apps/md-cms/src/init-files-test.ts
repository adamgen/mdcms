/// <reference types='jest'/>

import * as path from 'path';
import * as fs from 'fs-extra';

export const initFilesTest = (dir: string)=>{
  let env = process.env;
  const tempTestDir = path.join(dir, '__test-temp-data__');
  beforeEach(() => {
    env = process.env;
    process.env['FILES_SERVER_BASE_PATH'] = tempTestDir;
    fs.copySync(path.join(dir, '__testing-files__'), tempTestDir);
  });

  afterEach(() => {
    fs.removeSync(tempTestDir);
    process.env = env;
  });
}
