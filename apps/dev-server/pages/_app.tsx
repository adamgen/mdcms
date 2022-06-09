import { AppProps } from 'next/app';
import './styles.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { EDITOR_FEATURE_KEY, editorReducer, filesApi } from '@md-cms/ui-store';
import { AppLayout } from '@md-cms/ui-react/src/app/app-layout/app-layout';

const store = configureStore({
  reducer: {
    [EDITOR_FEATURE_KEY]: editorReducer,
    [filesApi.reducerPath]: filesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filesApi.middleware),
  devTools: process.env['NODE_ENV'] !== 'production',
  enhancers: [],
});

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
if (typeof window !== 'undefined' && (window as any)?.Cypress) {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  (window as any).store = store;
}

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  );
}

export default CustomApp;
