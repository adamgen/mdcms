import { jestFs } from './fs.interface';

jest.mock('fs');

const fs: jestFs = require('fs');

describe('files mock', () => {
  it('should mock files effectively', async () => {
    const filesObj = {
      posts: {
        'index.md': '# Im the index',
        'my-post.md': 'Just a post',
        'a-great-post.md': 'A great post',
        category: {
          'index.md': 'category index',
        },
      },
    };
    fs.__setMockFiles(filesObj);

    expect(fs.__mockFiles).toEqual(filesObj);
    expect(fs.readdirSync('posts')).toEqual([
      'index.md',
      'my-post.md',
      'a-great-post.md',
      'category',
    ]);
    expect(fs.readFileSync('posts/index.md')).toEqual('# Im the index');
  });
});
