import * as fs from 'fs-extra';
import * as _ from 'lodash';
import { File } from './file.interface';
import * as path from 'path';

const stat = _.memoize(fs.statSync);

export class FileController {
  getPathDirOrFile(existingPath: string) {
    if (this.isFile(existingPath)) {
      return this.getFileContents(existingPath);
    }
    if (this.isDirectory(existingPath)) {
      return this.getDirectoryListing(existingPath);
    }
  }
  getDirectoryListing(directoryPath: string) {
    return fs
      .readdirSync(directoryPath)
      .reduce<File[]>((accumulator, filePath) => {
        const absoluteFilePath = path.join(directoryPath, filePath);
        const stat = fs.statSync(absoluteFilePath);
        const type = stat.isFile() ? 'file' : stat.isDirectory() && 'directory';
        if (type !== 'file' && type !== 'directory') {
          return accumulator;
        }
        return [
          ...accumulator,
          {
            path: filePath,
            type: type,
          },
        ];
      }, []);
  }
  getFileContents(filePath: string) {
    return fs.readFileSync(filePath).toString();
  }
  isDirectory(filePath: string) {
    return stat(filePath).isDirectory();
  }
  isFile(filePath: string) {
    return stat(filePath).isFile();
  }
  exists(filePath: string) {
    return fs.existsSync(filePath);
  }
}
