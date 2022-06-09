import AppDrawer from './app-drawer';
import { render } from '../../../test-utils';

describe('Drawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppDrawer />);
    expect(baseElement).toBeTruthy();
  });
});
