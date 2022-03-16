import { render } from '@testing-library/react';

import AppNavigation from './app-navigation';

describe('AppNavigation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppNavigation />);
    expect(baseElement).toBeTruthy();
  });
});
