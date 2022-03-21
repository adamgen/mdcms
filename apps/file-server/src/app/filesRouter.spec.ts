import * as request from 'supertest';
import { app } from './app';
import * as path from 'path';
import { jestFs } from './__mocks__/fs.interface';

const testRoute = async (
  route: string,
  test: (response: request.Response) => unknown
) => {
  const response = await request(app).get(route);
  test(response);
};

const filesArray = ['index.md', 'my-post.md', 'a-great-post.md'];

jest.mock('fs');

const fs: jestFs = require('fs');
fs.__setMockFiles({
  [path.join(__dirname, 'posts', 'index.md')]: '# Im the index',
  [path.join(__dirname, 'posts', 'my-post.md')]: 'Just a post',
  [path.join(__dirname, 'posts', 'a-great-post.md')]: 'A great post',
});

describe('filesRouter', () => {
  it('should return a list of files when existing', async () => {
    await testRoute('/api/files', (response) => {
      expect(response.body).toEqual(filesArray);
    });
  });
});
