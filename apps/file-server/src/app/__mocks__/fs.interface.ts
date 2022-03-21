import * as nodefs from 'fs';

interface MockFilesInput {
  [path: string]: string | MockFilesInput;
}

export type jestFs = typeof nodefs & {
  __setMockFiles: (filesList: MockFilesInput) => void;
  __mockFiles: MockFilesInput;
};
