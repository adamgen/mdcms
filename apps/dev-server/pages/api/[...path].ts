import { app } from '@md-cms/file-server';

export default function handler(req, res) {
  return app(req, res);
}
