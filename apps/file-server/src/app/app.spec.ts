import * as request from 'supertest';
import { app } from './app';
import * as path from 'path';
import * as fs from 'fs-extra';

const testRoute = async (
  route: string,
  test: (response: request.Response) => unknown
) => {
  const response = await request(app).get(route);
  test(response);
};

describe('app health', () => {
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
