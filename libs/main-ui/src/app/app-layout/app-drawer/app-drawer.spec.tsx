import AppDrawer from './app-drawer';
import { render } from '../../../../../../apps/fscms-dev-ui/src/test-utils';

describe('Drawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppDrawer />);
    expect(baseElement).toBeTruthy();
  });
});
