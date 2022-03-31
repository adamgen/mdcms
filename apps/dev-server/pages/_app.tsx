import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { EDITOR_FEATURE_KEY, editorReducer, filesApi } from '@md-cms/store';

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

if (typeof window !== 'undefined' && (window as any)?.Cypress) {
  (window as any).store = store;
}

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Welcome to dev-server!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}

export default CustomApp;
