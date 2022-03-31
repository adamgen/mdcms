import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';

import { appReducer } from './root-state';
import { EDITOR_FEATURE_KEY, editorReducer, filesApi } from '@md-cms/store';
import { App } from '@md-cms/main-ui';

const store = configureStore({
  reducer: {
    ...appReducer,
    [EDITOR_FEATURE_KEY]: editorReducer,
    [filesApi.reducerPath]: filesApi.reducer,
  },
  // Additional middleware can be passed to this array
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filesApi.middleware),
  devTools: process.env['NODE_ENV'] !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

if ((window as any).Cypress) {
  (window as any).store = store;
}

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
