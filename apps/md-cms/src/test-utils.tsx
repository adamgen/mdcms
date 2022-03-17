import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { appReducer } from './root-state';
// Import your own reducer

function render(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({ reducer: appReducer }),
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