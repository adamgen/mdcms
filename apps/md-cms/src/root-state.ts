import {
  DRAWER_FEATURE_KEY,
  drawerReducer,
  DrawerState,
} from './app/app-layout/app-drawer/drawer.slice';
import { filesApi } from './app/store/files.api';
import { EDITOR_FEATURE_KEY, editorReducer } from './app/store/editor.slice';

export interface RootState {
  [DRAWER_FEATURE_KEY]: DrawerState;
  [filesApi.reducerPath]: any;
  [EDITOR_FEATURE_KEY]: any;
}

export const appReducer = {
  [EDITOR_FEATURE_KEY]: editorReducer,
  [DRAWER_FEATURE_KEY]: drawerReducer,
  [filesApi.reducerPath]: filesApi.reducer,
};
