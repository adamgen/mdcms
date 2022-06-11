import { RequestHandler, Router } from 'express';
import { RouteParameters } from 'express-serve-static-core';
import * as formidable from 'formidable';

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

const upsertFileHandler: RequestHandler<RouteParameters<'/*'>> = async (
  req,
  res
) => {
  const api = req.api;
  const content = req.body.content;
  const form = formidable({ multiples: true });

  const { files } = await new Promise((resolve, reject) =>
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ files });
    })
  );

  const fileNames = Object.keys(files);

  if (fileNames.length > 1) {
    res.status(401).json();
    return;
  }
  if (fileNames.length) {
    for (let i = 0; i < fileNames.length; i++) {
      const fileName = fileNames[i];
      const file = files[fileName];
      api.path = file.filepath;
      api.moveTo(req.params[0]);
    }
    res.status(200).json();
    return;
  }

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
