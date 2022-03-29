import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { filesApi } from '@md-cms/store';

import { appReducer } from './root-state';

function render(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: appReducer,
      // Additional middleware can be passed to this array
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(filesApi.middleware),
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: React.PropsWithChildren<unknown>) {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
export { render };
