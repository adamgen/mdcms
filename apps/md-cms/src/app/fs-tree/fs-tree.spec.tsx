import { render } from '../../test-utils';

import { FsTree } from './fs-tree';

describe('Tree', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FsTree />);
    expect(baseElement).toBeTruthy();
  });
});
