import FilePathTitle from './file-path-title';
import { render } from '../../../test-utils';

describe('FilePathTitle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilePathTitle />);
    expect(baseElement).toBeTruthy();
  });
});
