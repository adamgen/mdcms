import { render } from '@testing-library/react';

import AppDrawer from './app-drawer';

describe('Drawer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppDrawer />);
    expect(baseElement).toBeTruthy();
  });
});
