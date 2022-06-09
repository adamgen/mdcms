import { Router, RequestHandler } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';

const filesRouter = Router();

console.log(`Files base folder at ${process.env['FILES_SERVER_BASE_PATH']}`);

filesRouter.get('/:fileName', (req, res, next) => {
  const filePath = path.join(
    process.env['FILES_SERVER_BASE_PATH'],
    req.params.fileName
  );
  if (!fs.existsSync(filePath)) {
    if (req.query.check) {
      return res.status(200).json(null);
    }
    return res.status(404).json(`File not found on path ${filePath}`);
  }
  const file = fs.readFileSync(filePath).toString();
  res.json(file);
});

filesRouter.get('', (req, res, next) => {
  const baseFilesPath = path.join(process.env['FILES_SERVER_BASE_PATH']);

  try {
    if (!fs.existsSync(baseFilesPath)) {
      fs.mkdirsSync(baseFilesPath);
    }
    const filesList = fs.readdirSync(baseFilesPath);
    res.status(200).json(filesList);
  } catch (e) {
    console.error(e);
    res.status(500).json(null);
  }
});

const upsertFileHandler: RequestHandler = (req, res) => {
  const content = req.body.content;
  const filePath = path.join(
    process.env['FILES_SERVER_BASE_PATH'],
    req.params.fileName
  );

  if (!content) {
    res.status(400).json('Required body not provided.');
    return;
  }

  try {
    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirsSync(path.dirname(filePath));
    }
    fs.writeFileSync(filePath, content);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
    return;
  }
  res
    .status(201)
    .json(
      `Stored file to process.env['FILES_SERVER_BASE_PATH']/${req.params.fileName}`
    );
};

filesRouter.post('/:fileName', upsertFileHandler);

filesRouter.post('/*/:fileName', upsertFileHandler);

filesRouter.put('/:fileName', upsertFileHandler);

filesRouter.delete('/:fileName', (req, res, next) => {
  const filePath = path.join(
    process.env['FILES_SERVER_BASE_PATH'],
    req.params.fileName
  );

  if (!fs.existsSync(filePath)) {
    return res.status(400).json('Delete on non existing files.');
  }

  fs.removeSync(filePath);

  res.json('Deleted');
});

export { filesRouter };
