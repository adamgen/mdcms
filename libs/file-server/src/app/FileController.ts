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
    // TODO remove support for reading non existing directories
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirsSync(directoryPath);
    }
    const filesList: File[] = fs
      .readdirSync(directoryPath)
      .reduce((accumulator, filePath) => {
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
      }, [] as File[]);

    return filesList;
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
