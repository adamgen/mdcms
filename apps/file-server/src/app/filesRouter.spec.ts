import * as request from 'supertest';
import { app } from './app';

const testRoute = async (
  route: string,
  test: (response: request.Response) => unknown
) => {
  const response = await request(app).get(route);
  test(response);
};

const filesArray = [];

describe('filesRouter', () => {
  it('should return a list of files when existing', async () => {
    await testRoute('/api/files', (response) => {
      expect(response.body).toEqual(filesArray);
    });
  });
});
