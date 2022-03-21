/// <reference types='jest'/>

import { jestFs } from './fs.interface';
import * as _ from 'lodash';

const fs = jest.createMockFromModule<jestFs>('fs');

fs.__mockFiles = Object.create(null);
const __setMockFiles: jestFs['__setMockFiles'] = (newMockFiles) => {
  fs.__mockFiles = newMockFiles;
};

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath: string) {
  if (typeof fs.__mockFiles[directoryPath] === 'string') {
    throw new Error(`Not a mocked directory path. ${directoryPath}`);
  }

  return Object.keys(fs.__mockFiles[directoryPath]) || [];
}

function readFileSync(filePath) {
  const file = _.get(fs.__mockFiles, filePath.split('/'));
  if (typeof file !== 'string') {
    throw new Error(`Not a mocked file path. ${file}`);
  }

  return file;
}

fs.__setMockFiles = __setMockFiles;
// @ts-ignore
fs.readdirSync = readdirSync;
// @ts-ignore
fs.readFileSync = readFileSync;

module.exports = fs as jestFs;
