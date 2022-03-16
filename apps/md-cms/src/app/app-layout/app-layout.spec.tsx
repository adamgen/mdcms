import { fireEvent, screen } from '@testing-library/react';

import { AppLayout } from './app-layout';
import {render} from '../../test-utils';

describe('AppLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppLayout />);
    expect(baseElement).toBeTruthy();

    fireEvent.click(screen.getByTestId('drawer-toggler'));
  });
});
