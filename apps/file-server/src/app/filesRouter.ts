import { Router } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';

const filesRouter = Router();

filesRouter.get('/:fileName', (req, res, next) => {
  const file = fs
    .readFileSync(
      path.join(process.env['FILES_SERVER_BASE_PATH'], req.params.fileName)
    )
    .toString();
  res.json(file);
});

filesRouter.get('', (req, res, next) => {
  try {
    const filesList = fs.readdirSync(
      path.join(process.env['FILES_SERVER_BASE_PATH'])
    );
    res.status(200).json(filesList);
  } catch (e) {
    res.status(500).json(null);
  }
});

const upsertFileHandler = (req, res) => {
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
    fs.writeFileSync(filePath, content);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
    return;
  }
  res.status(201).json(true);
};

filesRouter.post('/:fileName', upsertFileHandler);

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
