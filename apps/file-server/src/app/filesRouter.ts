import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const filesRouter = Router();

filesRouter.get('', (req, res, next) => {
  res.json(fs.readdirSync(path.join(__dirname, 'posts')));
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
