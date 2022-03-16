import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../root-state';

export const DRAWER_FEATURE_KEY = 'drawer';

export interface DrawerState {
  isOpen: boolean;
}

export const initialDrawerState: DrawerState = {
  isOpen: true,
};

export const drawerSlice = createSlice({
  name: DRAWER_FEATURE_KEY,
  initialState: initialDrawerState,
  reducers: {
    close: (state) => {
      console.log('console.log()');;
      return { ...state, isOpen: false };
    },
    open: (state) => {
      return { ...state, isOpen: true };
    },
    toggle: (state) => {
      return { ...state, isOpen: !state.isOpen };
    },
  },
});

export const drawerReducer = drawerSlice.reducer;
export const drawerActions = drawerSlice.actions;

export const getDrawerState = (rootState: RootState): DrawerState =>
  rootState[DRAWER_FEATURE_KEY];
