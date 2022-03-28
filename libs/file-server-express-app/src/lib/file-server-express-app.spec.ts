import { fileServerExpressApp } from './file-server-express-app';

describe('fileServerExpressApp', () => {
  it('should work', () => {
    expect(fileServerExpressApp()).toEqual('file-server-express-app');
  });
});
