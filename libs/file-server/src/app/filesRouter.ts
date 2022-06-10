import { RequestHandler, Router } from 'express';
import { RouteParameters } from 'express-serve-static-core';

const filesRouter = Router();

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

  const destFilePath = req.body.filePath;

  if (destFilePath) {
    if (!api.exists()) {
      console.error(`File not found on path ${api.path}`);
      res.status(404).json();
      return;
    }
    if (api.exists(destFilePath, true)) {
      console.error(`Destination file exists ${api.path}`);
      res.status(401).json();
      return;
    }
    api.moveTo(destFilePath);
    res.status(200).json();
    return;
  }

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
  const api = req.api;
  api.setPath(req.params[0]);

  if (!api.exists()) {
    return res.status(400).json('Delete on non existing files.');
  }

  api.delete();

  res.json('Deleted');
});

// TODO add file upload support

export { filesRouter };
