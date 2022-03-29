import { filesApi } from './app/store/files.api';
import { EDITOR_FEATURE_KEY, editorReducer } from './app/store/editor.slice';

export interface RootState {
  [filesApi.reducerPath]: any;
  [EDITOR_FEATURE_KEY]: any;
}

export const appReducer = {
  [EDITOR_FEATURE_KEY]: editorReducer,
  [filesApi.reducerPath]: filesApi.reducer,
};
