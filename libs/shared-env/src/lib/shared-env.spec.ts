import { sharedEnv } from './shared-env';

describe('sharedEnv', () => {
  it('should work', () => {
    expect(sharedEnv()).toEqual('shared-env');
  });
});
