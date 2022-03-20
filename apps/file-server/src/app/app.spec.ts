import * as request from 'supertest';
import { app } from './app';

const testRoute = async (
  route: string,
  test: (response: request.Response) => unknown
) => {
  const response = await request(app).get(route);
  test(response);
};

describe('app health', () => {
  it('should respond with 404 for non existing route', async () => {
    await testRoute('/non-existing-route', (response) => {
      expect(response.statusCode).toBe(404);
    });
    await testRoute('/api', (response) => {
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe(
        JSON.stringify({ message: 'Welcome to file-server!' })
      );
    });
  });
});
