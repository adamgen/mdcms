import {
  DRAWER_FEATURE_KEY,
  drawerReducer,
  DrawerState,
} from './app/app-layout/app-drawer/drawer.slice';
import { filesApi } from './app/app-layout/app-drawer/fs-tree/fs-tree.slice';

export interface RootState {
  [DRAWER_FEATURE_KEY]: DrawerState;
  [filesApi.reducerPath]: any;
}

export const appReducer = {
  [DRAWER_FEATURE_KEY]: drawerReducer,
  [filesApi.reducerPath]: filesApi.reducer,
};
