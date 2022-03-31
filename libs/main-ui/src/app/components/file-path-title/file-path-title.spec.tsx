import FilePathTitle from './file-path-title';
import { render } from '../../../../../../apps/fscms-dev-ui/src/test-utils';

describe('FilePathTitle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FilePathTitle />);
    expect(baseElement).toBeTruthy();
  });
});
