import * as request from 'supertest';
import { app } from './app';

describe('app health', () => {
  it('should respond with 404 for non existing route', async () => {
    const response = await request(app).get('/non-existing-route');
    expect(response.statusCode).toBe(404);
  });
});
