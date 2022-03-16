import {
  DRAWER_FEATURE_KEY,
  DrawerState,
} from './app/app-layout/app-drawer/drawer.slice';

export interface RootState {
  [DRAWER_FEATURE_KEY]: DrawerState;
}
