import * as request from 'supertest';
import { app } from './app';
import * as path from 'path';
import * as fs from 'fs';
import { initFilesTest } from './init-files-test';
import { File } from './file.interface';

const testRoute = async (
  route: string,
  test: (response: request.Response) => unknown
) => {
  const response = await request(app).get(route);
  test(response);
};

describe('GET files', () => {
  initFilesTest(__dirname);

  it('should return a list of files when existing', async () => {
    await testRoute('/api/files', (response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.sort()).toEqual([
        { type: 'file', path: 'a-great-post.md' },
        { type: 'directory', path: 'category' },
        { type: 'file', path: 'index.md' },
        { type: 'file', path: 'my-post.md' },
      ]);
    });
  });

  it('should return a list of files from a subfolder', async () => {
    await testRoute('/api/files/category', (response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.sort()).toEqual([
        { type: 'file', path: 'index.md' },
        { type: 'directory', path: 'sub-category' },
      ]);
    });
  });

  it('should return a list of files from a sub-subfolder', async () => {
    await testRoute('/api/files/category/sub-category', (response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body.sort()).toEqual([
        { type: 'file', path: 'index.md' },
      ]);
    });
  });

  it('should return the contents of a file by param', async () => {
    await testRoute('/api/files/index.md', (response) => {
      expect(response.body).toMatchInlineSnapshot(`
        "# Im the index
        "
      `);
    });
  });
});

const getfile = (filePath: string) => {
  return fs
    .readFileSync(path.join(process.env['FILES_SERVER_BASE_PATH'], filePath))
    .toString();
};

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
    expect(response.body).toMatchInlineSnapshot(
      `"Stored file to process.env['FILES_SERVER_BASE_PATH']/index.md"`
    );

    expect(getfile('index.md')).toEqual('# new index file header!');
  });

  it('should succeed writing to an existing subfolder file path', async () => {
    const response = await request(app)
      .post('/api/files/category/index.md')
      .send({ content: '# new index file header!' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchInlineSnapshot(
      `"Stored file to process.env['FILES_SERVER_BASE_PATH']/category/index.md"`
    );

    expect(getfile('category/index.md')).toEqual('# new index file header!');
  });

  it('should write to a new file', async () => {
    const response = await request(app)
      .post('/api/files/new-file.md')
      .send({ content: '# new random file header!' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchInlineSnapshot(
      `"Stored file to process.env['FILES_SERVER_BASE_PATH']/new-file.md"`
    );

    expect(getfile('new-file.md')).toEqual('# new random file header!');
  });

  it('should write to a non existing path', async () => {
    const response = await request(app)
      .post('/api/files/subfolder/sub-subfolder/new-file.md')
      .send({ content: '# new random file header!' })
      .set('Accept', 'application/json');
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchInlineSnapshot(
      `"Stored file to process.env['FILES_SERVER_BASE_PATH']/subfolder/sub-subfolder/new-file.md"`
    );

    expect(getfile('subfolder/sub-subfolder/new-file.md')).toEqual(
      '# new random file header!'
    );
  });
});

describe('Delete files', () => {
  initFilesTest(__dirname);
  it('should fail to delete non existing files', async () => {
    const response = await request(app).delete('/api/files/new-file.md');
    expect(response.statusCode).toBe(400);
    expect(response.body).toBe('Delete on non existing files.');
  });

  it('should delete existing files', async () => {
    const indexFilePath = path.join(
      process.env['FILES_SERVER_BASE_PATH'],
      'index.md'
    );
    expect(fs.existsSync(indexFilePath)).toBeTruthy();

    const response = await request(app).delete('/api/files/index.md');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Deleted');
    expect(fs.existsSync(indexFilePath)).toBeFalsy();
  });

  it('should delete existing subfolder files', async () => {
    const indexFilePath = path.join(
      process.env['FILES_SERVER_BASE_PATH'],
      'category/index.md'
    );
    expect(fs.existsSync(indexFilePath)).toBeTruthy();

    const response = await request(app).delete('/api/files/category/index.md');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Deleted');
    expect(fs.existsSync(indexFilePath)).toBeFalsy();
  });
});
