import { RequestHandler, Router } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';
import { FileController } from './FileController';

const filesRouter = Router();

// console.log(`Files base folder at ${process.env['FILES_SERVER_BASE_PATH']}`);

const getFilePath = (...pathParts: string[]) =>
  path.join(process.env['FILES_SERVER_BASE_PATH'], ...pathParts);

const api = new FileController();

filesRouter.get('/*', (req, res) => {
  const filePath = getFilePath(req.params[0]);
  if (!api.exists(filePath)) {
    console.error(`File not found on path ${filePath}`);
    return res.status(404).json();
  }
  const response = api.getPathDirOrFile(filePath);
  return response ? res.status(200).json(response) : res.status(401).json();
});

const upsertFileHandler: RequestHandler = (req, res) => {
  const content = req.body.content;

  const relativeFilePath = req.params[0];

  const absoluteFilePath = getFilePath(relativeFilePath);

  if (req.body.filePath) {
    if (!fs.existsSync(path.dirname(absoluteFilePath))) {
      res.status(400).json();
      return;
    }

    const newFileAbsolutePath = getFilePath(req.body.filePath);
    try {
      fs.moveSync(absoluteFilePath, newFileAbsolutePath);
    } catch (e) {
      console.error(e);
    }

    res.status(200).json();
    return;
  }

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
  const filePath = getFilePath(req.params[0]);

  if (!fs.existsSync(filePath)) {
    return res.status(400).json('Delete on non existing files.');
  }

  fs.removeSync(filePath);

  res.json('Deleted');
});

// TODO add file upload support

export { filesRouter };
