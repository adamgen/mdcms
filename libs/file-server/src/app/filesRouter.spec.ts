import * as request from 'supertest';
import { app } from './app';
import * as path from 'path';
import * as fs from 'fs';
import { initFilesTest } from './init-files-test';

const getFilePath = (...pathParts: string[]) =>
  path.join(process.env['FILES_SERVER_BASE_PATH'], ...pathParts);

describe('GET files', () => {
  initFilesTest(__dirname);

  it('should return a list of files when existing', async () => {
    await request(app)
      .get('/api/files')
      .expect(200, [
        { type: 'file', path: 'a-great-post.md' },
        { type: 'directory', path: 'category' },
        { type: 'file', path: 'index.md' },
        { type: 'file', path: 'my-post.md' },
      ]);
  });

  it('should return a list of files from a subfolder', async () => {
    await request(app)
      .get('/api/files/category')
      .expect(200, [
        { type: 'file', path: 'index.md' },
        { type: 'directory', path: 'sub-category' },
      ]);
  });

  it('should return a list of files from a sub-subfolder', async () => {
    await request(app)
      .get('/api/files/category/sub-category')
      .expect(200, [{ type: 'file', path: 'index.md' }]);
  });

  it('should return the contents of a file by param', async () => {
    await request(app)
      .get('/api/files/index.md')
      .expect(200, '"# Im the index\\n"');
  });
});

const getfilePath = (filePath: string) => {
  return fs.readFileSync(getFilePath(filePath)).toString();
};

describe('Upsert post/put files', () => {
  initFilesTest(__dirname);
  it('should fail to write to a file with missing body', async () => {
    const response = await request(app)
      .post('/api/files/new-file.md')
      .expect(400);
    expect(response.body).toBe('Required body not provided.');
  });

  it('should succeed writing to an existing file path', async () => {
    const response = await request(app)
      .post('/api/files/index.md')
      .send({ content: '# new index file header!' })
      .set('Accept', 'application/json')
      .expect(201);
    expect(response.body).toMatchInlineSnapshot(
      `"Stored file to process.env['FILES_SERVER_BASE_PATH']/index.md"`
    );

    expect(getfilePath('index.md')).toEqual('# new index file header!');
  });

  it('should succeed writing to an existing subfolder file path', async () => {
    const response = await request(app)
      .post('/api/files/category/index.md')
      .send({ content: '# new index file header!' })
      .set('Accept', 'application/json')
      .expect(201);
    expect(response.body).toMatchInlineSnapshot(
      `"Stored file to process.env['FILES_SERVER_BASE_PATH']/category/index.md"`
    );

    expect(getfilePath('category/index.md')).toEqual(
      '# new index file header!'
    );
  });

  it('should write to a new file', async () => {
    const response = await request(app)
      .post('/api/files/new-file.md')
      .send({ content: '# new random file header!' })
      .set('Accept', 'application/json')
      .expect(201);
    expect(response.body).toMatchInlineSnapshot(
      `"Stored file to process.env['FILES_SERVER_BASE_PATH']/new-file.md"`
    );

    expect(getfilePath('new-file.md')).toEqual('# new random file header!');
  });

  it('should write to a non existing path', async () => {
    const response = await request(app)
      .post('/api/files/subfolder/sub-subfolder/new-file.md')
      .send({ content: '# new random file header!' })
      .set('Accept', 'application/json')
      .expect(201);
    expect(response.body).toMatchInlineSnapshot(
      `"Stored file to process.env['FILES_SERVER_BASE_PATH']/subfolder/sub-subfolder/new-file.md"`
    );

    expect(getfilePath('subfolder/sub-subfolder/new-file.md')).toEqual(
      '# new random file header!'
    );
  });
});

describe('Delete files', () => {
  initFilesTest(__dirname);
  it('should fail to delete non existing files', async () => {
    await request(app)
      .delete('/api/files/new-file.md')
      .expect(400, '"Delete on non existing files."');
  });

  it('should delete existing files', async () => {
    const indexFilePath = getFilePath('index.md');
    expect(fs.existsSync(indexFilePath)).toBeTruthy();

    await request(app).delete('/api/files/index.md').expect(200, '"Deleted"');
    expect(fs.existsSync(indexFilePath)).toBeFalsy();
  });

  it('should delete existing subfolder files', async () => {
    const indexFilePath = getFilePath('category/index.md');
    expect(fs.existsSync(indexFilePath)).toBeTruthy();

    await request(app)
      .delete('/api/files/category/index.md')
      .expect(200, '"Deleted"');
    expect(fs.existsSync(indexFilePath)).toBeFalsy();
  });

  // TODO add multer to support file uploads
  it.skip('should post files', async () => {
    const buf = Buffer.from('');
    await request(app)
      .post('/api/files/my.jpg')
      .set('Accept', 'multipart/form-data')
      .attach('', buf)
      .expect(200);
  });

  const moveFile = async (source: string, dest: string) => {
    const sourceFilePath = getFilePath(source);
    const destFilePath = getFilePath(dest);

    expect(fs.existsSync(destFilePath)).toBeFalsy();
    await request(app)
      .put(`/api/files/${source}`)
      .send({ filePath: dest })
      .expect(200);
    expect(fs.existsSync(sourceFilePath)).toBeFalsy();
    expect(fs.existsSync(destFilePath)).toBeTruthy();
    expect(fs.readFileSync(destFilePath).toString()).toEqual(
      '# Im the index\n'
    );
  };
  it('should move file location', async () => {
    await moveFile('index.md', 'new-index-location.md');
    await moveFile('new-index-location.md', 'second-new-index-location.md');
    await moveFile('second-new-index-location.md', 'index.md');

    await moveFile('index.md', 'subfolder/new-index-location.md');
  });
});
