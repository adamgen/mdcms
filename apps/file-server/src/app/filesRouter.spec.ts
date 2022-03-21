import * as request from 'supertest';
import { app } from './app';
import { initFilesTest } from '../../../md-cms/src/init-files-test';
import * as path from 'path';
import * as fs from 'fs';

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

describe('Upsert post/put files', () => {
  initFilesTest(__dirname);
  it('should fail to write to a file with missing body', async () => {
    const response = await request(app).post('/api/files/new-file.md');
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('Required body not provided.');
  });

  it('should succeed writing to an existing file path', async () => {
    const response = await request(app)
      .post('/api/files/index.md')
      .send({ content: '# new index file header!' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(response.body).toBe(true);

    expect(
      fs.readFileSync(path.join(process.env['FILES_SERVER_BASE_PATH'], 'index.md')).toString()
    ).toEqual('# new index file header!');
  });

  it('should write to a new file', async () => {
    const response = await request(app)
      .post('/api/files/new-file.md')
      .send({ content: '# new random file header!' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(response.body).toBe(true);

    expect(
      fs.readFileSync(path.join(process.env['FILES_SERVER_BASE_PATH'], 'new-file.md')).toString()
    ).toEqual('# new random file header!');
  });
});
