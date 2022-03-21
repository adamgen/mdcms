import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const filesRouter = Router();

filesRouter.get('/:id', (req, res, next) => {
  const file = fs.readFileSync(path.join(process.env['FILES_SERVER_BASE_PATH'], req.params.id)).toString();
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

filesRouter.post('', (req, res, next) => {
  res.json({});
});

filesRouter.put('', (req, res, next) => {
  res.json({});
});

filesRouter.delete('', (req, res, next) => {
  res.json({});
});

export { filesRouter };
