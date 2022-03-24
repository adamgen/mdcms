import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './app/app';
import { appReducer } from './root-state';
import { filesApi } from './app/slices/files.api';
import {
  DRAWER_FEATURE_KEY,
  drawerReducer,
} from './app/app-layout/app-drawer/drawer.slice';

import { EDITOR_FEATURE_KEY, editorReducer } from './app/slices/editor.slice';

const store = configureStore({
  reducer: {
    ...appReducer,
    [EDITOR_FEATURE_KEY]: editorReducer,
    [DRAWER_FEATURE_KEY]: drawerReducer,
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
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>,
  document.getElementById('root')
);
