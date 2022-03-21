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

filesRouter.post('/:fileName', (req, res, next) => {
  const content = req.body.content;
  const filePath = path.join(
    process.env['FILES_SERVER_BASE_PATH'],
    req.params.fileName
  );

  if (!content) {
    res.status(400).json('Required body not provided.');
    return;
  }

  if (fs.existsSync(filePath)) {
    res.status(400).json('Trying to create an existing file');
  }
  try {
    fs.writeFileSync(filePath, content);
  } catch (e) {
    console.error(e);
    res.status(500).json(e);
    return;
  }
  res.status(201).json(true);
});

filesRouter.put('/:fileName', (req, res, next) => {
  res.json({});
});

filesRouter.delete('/:fileName', (req, res, next) => {
  res.json({});
});

export { filesRouter };
