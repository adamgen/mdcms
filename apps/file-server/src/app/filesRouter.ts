import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const filesRouter = Router();

filesRouter.get('/:fileName', (req, res, next) => {
  const file = fs.readFileSync(path.join(process.env['FILES_SERVER_BASE_PATH'], req.params.fileName)).toString();
  res.json(file);
});

filesRouter.get('', (req, res, next) => {
  try {
    const filesList = fs.readdirSync(path.join(process.env['FILES_SERVER_BASE_PATH']));
    res.status(200).json(filesList);
  } catch (e) {
    res.status(500).json(null);
  }
});

filesRouter.post('/:fileName', (req, res, next) => {
  res.json({});
});

filesRouter.put('/:fileName', (req, res, next) => {
  res.json({});
});

filesRouter.delete('/:fileName', (req, res, next) => {
  res.json({});
});

export { filesRouter };
