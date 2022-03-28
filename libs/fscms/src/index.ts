import { app } from '@fscms/server';
import * as path from 'path';

process.env['FILES_SERVER_BASE_PATH'] =
  process.env['FILES_SERVER_BASE_PATH'] ||
  path.join(__dirname, 'dev-server-files');

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
