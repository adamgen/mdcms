import MdEditor from './md-editor';
import { render } from '../../../../../../apps/fscms-dev-ui/src/test-utils';

jest.mock('@toast-ui/react-editor');

describe('MdEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MdEditor />);
    expect(baseElement).toBeTruthy();
  });
});
