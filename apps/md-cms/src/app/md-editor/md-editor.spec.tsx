import MdEditor from './md-editor';
import { render } from '../../test-utils';

describe('MdEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MdEditor />);
    expect(baseElement).toBeTruthy();
  });
});
