import * as request from 'supertest';
import { app } from './app';
import {jestFs} from './__mocks__/fs.interface';

const testRoute = async (
  route: string,
  test: (response: request.Response) => unknown
) => {
  const response = await request(app).get(route);
  test(response);
};

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

describe('app health', () => {
  it('should respond with 404 for non existing route', async () => {
    const response = await request(app).get('/non-existing-route');
    expect(response.statusCode).toBe(404);
  });
  it('should respond with 200 for existing routes', async () => {
    await testRoute('/api', (response) => {
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe(
        JSON.stringify({ message: 'Welcome to file-server!' })
      );
    });
    await testRoute('/api/files', (response) => {
      expect(response.statusCode).toBe(200);
    });
  });
});
