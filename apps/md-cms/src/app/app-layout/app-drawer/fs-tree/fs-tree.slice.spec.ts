import { filesApi } from './fs-tree.slice';
import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from '../../../../root-state';

describe('fsTree reducer', () => {
  it('should handle initial state', async () => {
    const store = configureStore({ reducer: appReducer });
    await store.dispatch(filesApi.endpoints.getFileByName.initiate('index.md'));
    expect(fetch).toBeCalledTimes(1);
  });
});
