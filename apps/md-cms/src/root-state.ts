import {
  DRAWER_FEATURE_KEY,
  drawerReducer,
  DrawerState,
} from './app/app-layout/app-drawer/drawer.slice';
import { filesApi } from './app/app-layout/app-drawer/fs-tree/fs-tree.slice';
import { EDITOR_FEATURE_KEY, editorReducer } from './app/slices/editor.slice';

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
