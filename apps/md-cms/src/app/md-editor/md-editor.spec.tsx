import MdEditor from './md-editor';
import { render } from '../../test-utils';

jest.mock('@toast-ui/react-editor');

describe('MdEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MdEditor />);
    expect(baseElement).toBeTruthy();
  });
});
