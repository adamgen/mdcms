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

describe('GET files', () => {
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

describe('POST files', () => {
  initFilesTest(__dirname);
  it('should fail to write to a file with missing body', async () => {
    const response = await request(app).post('/api/files/new-file.md');
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('Required body not provided.');
  });

  it('should fail writing to an existing file path', async () => {
    const response = await request(app)
      .post('/api/files/index.md')
      .send({ content: '# new index file header!' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('Trying to create an existing file');
  });

  it('should write to a file', async () => {
    const response = await request(app)
      .post('/api/files/new-file.md')
      .send({ content: '# new index file header!' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(response.body).toBe(true);
  });
});

