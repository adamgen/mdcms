import { configureStore } from '@reduxjs/toolkit';
import { filesApi } from './fs-tree.slice';
import fetchMock from "jest-fetch-mock"
import { appReducer } from '../../../../root-state';

describe('fsTree reducer', () => {
  it('should handle initial state', async () => {
    const store = configureStore({
      reducer: appReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(filesApi.middleware),
    });

    await store.dispatch(filesApi.endpoints.getFileByName.initiate('index.md'));
    expect(fetch).toBeCalledTimes(1);
    const { method, headers, url } = fetchMock.mock.calls[0][0] as Request;

    const accept = headers.get('accept');
    const authorization = headers.get('authorization');

    expect(method).toBe('GET');
    expect(url).toBe('http://localhost:3002/files/index.md');
    expect(accept).toBe('application/json');
    expect(authorization).toBeNull();
  });
});
