import { configureStore } from '@reduxjs/toolkit';
import { editorReducer, EDITOR_FEATURE_KEY } from './editor.slice';
import { filesApi } from './files.api';

export const makeStore = () =>
  configureStore({
    reducer: {
      [EDITOR_FEATURE_KEY]: editorReducer,
      [filesApi.reducerPath]: filesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(filesApi.middleware),
    devTools: process.env['NODE_ENV'] !== 'production',
    enhancers: [],
  });
