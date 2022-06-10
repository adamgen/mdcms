import * as fs from 'fs-extra';
import * as _ from 'lodash';
import { File } from './file.interface';
import * as path from 'path';

const stat = _.memoize(fs.statSync);

export class FileController {
  // Basic
  path: string;
  setPath(...pathParts: string[]) {
    this.path = this.getFilePath(...pathParts);
  }

  getFilePath(...pathParts: string[]) {
    return path.join(process.env['FILES_SERVER_BASE_PATH'], ...pathParts);
  }

  // Upsert

  move(newFilePath: string) {
    const newFileAbsolutePath = this.getFilePath(newFilePath);
    fs.moveSync(this.path, newFileAbsolutePath);
    this.setPath(newFilePath);
  }

  write(content: string) {
    const dirname = path.dirname(this.path);
    if (!fs.existsSync(dirname)) {
      fs.mkdirsSync(dirname);
    }
    fs.writeFileSync(this.path, content);
  }

  // Get

  getPathDirOrFile(existingPath: string = this.path) {
    if (this.isFile(existingPath)) {
      return this.getFileContents(existingPath);
    }
    if (this.isDirectory(existingPath)) {
      return this.getDirectoryListing(existingPath);
    }
  }
  getDirectoryListing(directoryPath: string = this.path) {
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
  getFileContents(filePath: string = this.path) {
    return fs.readFileSync(filePath).toString();
  }
  isDirectory(filePath: string = this.path) {
    return stat(filePath).isDirectory();
  }
  isFile(filePath: string = this.path) {
    return stat(filePath).isFile();
  }
  exists(filePath: string = this.path) {
    return fs.existsSync(filePath);
  }
}
