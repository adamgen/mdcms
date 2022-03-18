import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';
import { act, renderHook } from '@testing-library/react-hooks';
import { filesApi, useGetFileByNameQuery } from './fs-tree.slice';
import { appReducer } from '../../../../root-state';
import { Provider } from 'react-redux';
import React from 'react';

const makeStore = () =>
  configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(filesApi.middleware),
  });

const wrapper: React.FC = ({ children }) => {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
};

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

  it('should store server response to redux state', async () => {
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

  it('should request the right URL from a hook', async () => {
    const promise = Promise.resolve();
    fetchMock.mockResponse(JSON.stringify(''));
    const { waitForNextUpdate } = renderHook(
      () => useGetFileByNameQuery('index.md'),
      {
        wrapper,
      }
    );
    await waitForNextUpdate();

    const { url } = fetchMock.mock.calls[2][0] as Request;

    expect(url).toBe('http://localhost:3002/files/index.md');

    await act(() => promise);
  });
});
