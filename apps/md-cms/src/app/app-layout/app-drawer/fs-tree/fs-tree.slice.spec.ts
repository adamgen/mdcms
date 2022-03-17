import { configureStore } from '@reduxjs/toolkit';
import { filesApi } from './fs-tree.slice';
import fetchMock from 'jest-fetch-mock';
import { appReducer } from '../../../../root-state';

const makeStore = () =>
  configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(filesApi.middleware),
  });

describe('fsTree reducer', () => {
  it('should handle initial state', async () => {
    const store = makeStore();
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

  it('should store server response to state', async () => {
    const store = makeStore();
    fetchMock.mockResponse(JSON.stringify(''));

    await store.dispatch(filesApi.endpoints.getFileByName.initiate('index.md'));
    const request =
      store.getState()[filesApi.reducerPath].queries[
        'getFileByName("index.md")'
      ]!;

    expect(request).toBeTruthy();

    expect(request.data).toBe('');
  });
});
