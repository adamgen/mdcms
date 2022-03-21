import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const filesRouter = Router();

filesRouter.get('/:id', (req, res, next) => {
  const file = fs.readFileSync(path.join('posts', req.params.id));
  res.json(file);
});

filesRouter.get('', (req, res, next) => {
  try {
    const filesList = fs.readdirSync('posts');
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
