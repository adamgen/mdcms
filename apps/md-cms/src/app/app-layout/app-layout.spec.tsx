import { fireEvent, screen } from '@testing-library/react';

import { AppLayout } from './app-layout';
import { render } from '../../test-utils';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '../../root-state';

describe('AppLayout', () => {
  it('should render successfully', () => {
    const store = configureStore({ reducer: appReducer });
    const { baseElement } = render(<AppLayout />, {
      store,
    });
    expect(baseElement).toBeTruthy();

    expect(store.getState().drawer.isOpen).toBe(true);
    fireEvent.click(screen.getByTestId('drawer-toggler'));
    expect(store.getState().drawer.isOpen).toBe(false);
    fireEvent.click(screen.getByTestId('drawer-toggler'));
    expect(store.getState().drawer.isOpen).toBe(true);
  });
});
