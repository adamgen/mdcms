import { Router, RequestHandler } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';
import { File } from './file.interface';

const filesRouter = Router();

console.log(`Files base folder at ${process.env['FILES_SERVER_BASE_PATH']}`);

filesRouter.get('/*', (req, res) => {
  const filePath = path.join(
    process.env['FILES_SERVER_BASE_PATH'],
    req.params[0]
  );
  if (!fs.existsSync(filePath)) {
    console.error(`File not found on path ${filePath}`);
    return res.status(404).json();
  }
  const stat = fs.statSync(filePath);
  if (stat.isFile()) {
    const file = fs.readFileSync(filePath).toString();
    return res.json(file);
  }
  if (stat.isDirectory()) {
    const filesList = readFiles(filePath);
    return res.status(200).json(filesList);
  }
  return res.status(401).json();
});

const readFiles = (filesPath) => {
  if (!fs.existsSync(filesPath)) {
    fs.mkdirsSync(filesPath);
  }
  const filesList: File[] = fs
    .readdirSync(filesPath)
    .reduce((accumulator, filePath) => {
      const absoluteFilePath = path.join(filesPath, filePath);
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
};

const upsertFileHandler: RequestHandler = (req, res) => {
  const content = req.body.content;

  const basePath = process.env['FILES_SERVER_BASE_PATH'];

  const relativeFilePath = req.params[0];

  const absoluteFilePath = path.join(basePath, relativeFilePath);

  if (!content) {
    res.status(400).json('Required body not provided.');
    return;
  }

  try {
    if (!fs.existsSync(path.dirname(absoluteFilePath))) {
      fs.mkdirsSync(path.dirname(absoluteFilePath));
    }
    fs.writeFileSync(absoluteFilePath, content);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
    return;
  }
  res
    .status(201)
    .json(
      `Stored file to process.env['FILES_SERVER_BASE_PATH']/${relativeFilePath}`
    );
};

filesRouter.post('/*', upsertFileHandler);

filesRouter.put('/*', upsertFileHandler);

filesRouter.delete('/*', (req, res) => {
  const filePath = path.join(
    process.env['FILES_SERVER_BASE_PATH'],
    req.params[0]
  );

  if (!fs.existsSync(filePath)) {
    return res.status(400).json('Delete on non existing files.');
  }

  fs.removeSync(filePath);

  res.json('Deleted');
});

export { filesRouter };
