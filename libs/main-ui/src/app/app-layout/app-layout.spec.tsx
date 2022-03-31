import { fireEvent, screen } from '@testing-library/react';

import { AppLayout } from './app-layout';
import { render } from '../../../../../apps/fscms-dev-ui/src/test-utils';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '../../../../../apps/fscms-dev-ui/src/root-state';
import { filesApi } from '../store/files.api';

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
  });
});
