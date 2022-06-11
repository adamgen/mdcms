/// <reference types='jest'/>

import * as path from 'path';
import * as fs from 'fs-extra';

function makeid(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const initFilesTest = (dir: string) => {
  let env = process.env;
  const uid = makeid(7);
  const tempTestDir = path.join(dir, `__test-temp-data__${uid}`);
  beforeEach(() => {
    env = process.env;
    process.env['FILES_SERVER_BASE_PATH'] = tempTestDir;
    if (fs.existsSync(tempTestDir)) {
      fs.removeSync(tempTestDir);
    }
    fs.copySync(path.join(dir, '__testing-files__'), tempTestDir);
  });

  afterEach(() => {
    fs.removeSync(tempTestDir);
    process.env = env;
  });
};
