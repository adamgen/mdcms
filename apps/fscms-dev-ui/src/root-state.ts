import { EDITOR_FEATURE_KEY, editorReducer, filesApi } from '@md-cms/store';

export interface RootState {
  [filesApi.reducerPath]: ReturnType<typeof filesApi.reducer>;
  [EDITOR_FEATURE_KEY]: ReturnType<typeof editorReducer>;
}

export const appReducer = {
  [EDITOR_FEATURE_KEY]: editorReducer,
  [filesApi.reducerPath]: filesApi.reducer,
};
