import { configureStore } from '@reduxjs/toolkit';
import fetchMock from 'jest-fetch-mock';
import { act, renderHook } from '@testing-library/react-hooks';
import { filesApi, useGetFileByNameQuery } from './fs-tree.slice';
import { appReducer } from '../../../../root-state';
import { Provider } from 'react-redux';
import React from 'react';
import { getBackendUrl } from '@md-cms/shared-env';

const BACKEND_URL = getBackendUrl();

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

const indexMd = 'index.md';
const blogMd = 'blog.md';
const filesMock = {
  [indexMd]: `# This is the index file`,
  [blogMd]: `# This is the blog`,
};

describe('fsTree reducer', () => {
  it('should call fetch when called', async () => {
    const store = makeStore();
    await store.dispatch(filesApi.endpoints.getFileByName.initiate(indexMd));
    expect(fetch).toBeCalledTimes(1);
    const { method, headers, url } = fetchMock.mock.calls[0][0] as Request;

    const accept = headers.get('accept');
    const authorization = headers.get('authorization');

    expect(method).toBe('GET');
    expect(url).toBe(`${BACKEND_URL}/files/${indexMd}`);
    expect(accept).toBe('application/json');
    expect(authorization).toBeNull();
  });

  it('should store server response to redux state', async () => {
    const store = makeStore();
    fetchMock.mockResponse(JSON.stringify(filesMock[indexMd]));

    await store.dispatch(filesApi.endpoints.getFileByName.initiate(indexMd));
    const request =
      store.getState()[filesApi.reducerPath].queries[
        `getFileByName("${indexMd}")`
      ]!;

    expect(request).toBeTruthy();

    expect(request.data).toBe(filesMock[indexMd]);
  });

  it('should request the right URL from a hook', async () => {
    const promise = Promise.resolve();
    fetchMock.mockResponse(JSON.stringify(filesMock[indexMd]));
    const { waitForNextUpdate } = renderHook(
      () => useGetFileByNameQuery(indexMd),
      {
        wrapper,
      }
    );
    await waitForNextUpdate();

    const { url } = fetchMock.mock.calls[2][0] as Request;

    expect(url).toBe(`${BACKEND_URL}/files/${indexMd}`);

    await act(() => promise);
  });

  it('should return server response for a singular get from a hook', async () => {
    const promise = Promise.resolve();
    fetchMock.mockResponse(JSON.stringify(filesMock[indexMd]));
    const { result, waitForNextUpdate } = renderHook(
      () => useGetFileByNameQuery(indexMd),
      {
        wrapper,
      }
    );
    await waitForNextUpdate();

    expect(result.current.data).toBe(filesMock[indexMd]);

    await act(() => promise);
  });
});
