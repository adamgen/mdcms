import * as request from 'supertest';
import { app } from './app';
import { initFilesTest } from '../../../md-cms/src/init-files-test';

const testRoute = async (
  route: string,
  test: (response: request.Response) => unknown
) => {
  const response = await request(app).get(route);
  test(response);
};

const filesArray = ['index.md', 'my-post.md', 'a-great-post.md', 'category'];

describe('filesRouter', () => {
  initFilesTest(__dirname);

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
