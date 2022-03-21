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

const filesArray = ['index.md', 'my-post.md', 'a-great-post.md', 'category'];

jest.mock('fs');
const fs: jestFs = require('fs');
fs.__setMockFiles({
  posts: {
    'index.md': '# Im the index',
    'my-post.md': 'Just a post',
    'a-great-post.md': 'A great post',
    category: {
      'index.md': 'category index',
    },
  },
});

describe('filesRouter', () => {
  it('should return a list of files when existing', async () => {
    await testRoute('/api/files', (response) => {
      expect(response.body).toEqual(filesArray);
    });
  });

  it('should return the contents of a file by param', async () => {
    await testRoute('/api/files/index.md', (response) => {
      expect(response.body).toEqual('# Im the index');
    });
  });
});
