import { render } from '@testing-library/react';

import { FsTree } from './fs-tree';

describe('Tree', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FsTree />);
    expect(baseElement).toBeTruthy();
  });
});
