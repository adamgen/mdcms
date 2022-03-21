import { render } from '@testing-library/react';

import FilePathTitle from './file-path-title';

describe('FilePathTitle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilePathTitle />);
    expect(baseElement).toBeTruthy();
  });
});
