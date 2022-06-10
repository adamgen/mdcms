import { RequestHandler, Router } from 'express';
import * as fs from 'fs-extra';
import * as path from 'path';
import { RouteParameters } from 'express-serve-static-core';

const filesRouter = Router();

const getFilePath = (...pathParts: string[]) =>
  path.join(process.env['FILES_SERVER_BASE_PATH'], ...pathParts);

filesRouter.get('/*', (req, res) => {
  const api = req.api;
  api.setPath(req.params[0]);
  if (!api.exists()) {
    console.error(`File not found on path ${api.path}`);
    return res.status(404).json();
  }
  const response = api.getPathDirOrFile();
  return response ? res.status(200).json(response) : res.status(401).json();
});

const upsertFileHandler: RequestHandler<RouteParameters<'/*'>> = (req, res) => {
  const api = req.api;
  const content = req.body.content;

  api.setPath(req.params[0]);

  if (req.body.filePath) {
    // TODO normalize setPath & exists
    if (!api.exists()) {
      console.error(`File not found on path ${api.path}`);
      res.status(404).json();
      return;
    }
    api.move(req.body.filePath);
    res.status(200).json();
    return;
  }

  // TODO normalize move vs other upsert
  if (content) {
    api.write(content);
    res
      .status(201)
      .json(
        `Stored file to process.env['FILES_SERVER_BASE_PATH']/${req.params[0]}`
      );
    return;
  }
  res.status(400).json('Required body not provided.');
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
