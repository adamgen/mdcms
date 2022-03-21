import { fireEvent, screen } from '@testing-library/react';

import { AppLayout } from './app-layout';
import { render } from '../../test-utils';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '../../root-state';
import { filesApi } from '../fs-tree/fs-tree.slice';

describe('AppLayout', () => {
  it('should render successfully', () => {
    const store = configureStore({
      reducer: appReducer,
      // Additional middleware can be passed to this array
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(filesApi.middleware),
    });
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
