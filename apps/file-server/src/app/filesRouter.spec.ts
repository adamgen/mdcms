import * as request from 'supertest';
import { app } from './app';
import * as path from 'path';
import * as fs from 'fs-extra';
// import { jestFs } from './__mocks__/fs.interface';

const testRoute = async (
  route: string,
  test: (response: request.Response) => unknown
) => {
  const response = await request(app).get(route);
  test(response);
};

const filesArray = ['index.md', 'my-post.md', 'a-great-post.md', 'category'];

describe('filesRouter', () => {
  let env = process.env;
  const tempTestDir = path.join(__dirname, '__test-temp-data__');
  beforeEach(() => {
    env = process.env;
    process.env['FILES_SERVER_BASE_PATH'] = tempTestDir;
    fs.copySync(path.join(__dirname, '__testing-files__'), tempTestDir);
  });

  afterEach(() => {
    fs.removeSync(tempTestDir);
    process.env = env;
  });

  it('should return a list of files when existing', async () => {
    await testRoute('/api/files', (response) => {
      expect(response.body.sort()).toEqual(filesArray.sort());
    });
  });

  it('should return the contents of a file by param', async () => {
    await testRoute('/api/files/index.md', (response) => {
      expect(response.body.trim()).toEqual('# Im the index');
    });
  });
});
