import { render } from '@testing-library/react';

import MdEditor from './md-editor';

describe('MdEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MdEditor />);
    expect(baseElement).toBeTruthy();
  });
});
