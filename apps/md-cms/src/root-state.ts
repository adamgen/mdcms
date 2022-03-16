import {
  DRAWER_FEATURE_KEY, drawerReducer,
  DrawerState,
} from './app/app-layout/app-drawer/drawer.slice';

export interface RootState {
  [DRAWER_FEATURE_KEY]: DrawerState;
}

export const appReducer = { [DRAWER_FEATURE_KEY]: drawerReducer };
