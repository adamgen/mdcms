import * as nodefs from 'fs';

export type jestFs = typeof nodefs & {
  __setMockFiles: (filesList: { [filename: string]: string }) => void;
};
