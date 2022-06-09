import { AppLayout } from './app-layout';
import { render } from '../../test-utils';
import { configureStore } from '@reduxjs/toolkit';
import { EDITOR_FEATURE_KEY, editorReducer, filesApi } from '@md-cms/ui-store';

describe('AppLayout', () => {
  it('should render successfully', () => {
    const store = configureStore({
      reducer: {
        [EDITOR_FEATURE_KEY]: editorReducer,
        [filesApi.reducerPath]: filesApi.reducer,
      },
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
