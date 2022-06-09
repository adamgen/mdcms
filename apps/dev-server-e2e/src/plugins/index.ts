import * as fs from 'fs-extra';

import * as path from 'path';

const devServerFilesPath = path.join(
  process.cwd(),
  '..',
  '..',
  'dev-server-files'
);

console.log('dir', devServerFilesPath);

module.exports = (on) => {
  on('task', {
    resetDevFilesFolder() {
      fs.removeSync(devServerFilesPath);
      fs.mkdirsSync(devServerFilesPath);
      return null;
    },
    readDevFile(filename) {
      const filePath = path.join(devServerFilesPath, filename);
      if (fs.existsSync(filePath)) {
        return fs.readFileSync(filePath, 'utf8');
      }
      return null;
    },
    listDevFiles() {
      return fs.readdirSync(devServerFilesPath);
    },
    makeDevFile({ name, content }) {
      const filePath = path.join(devServerFilesPath, name);
      fs.writeFileSync(filePath, content);
      return null;
    },
  });
};
