import { Router } from 'express';

const filesRouter = Router();

filesRouter.get('', (req, res, next) => {
  res.json({});
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
