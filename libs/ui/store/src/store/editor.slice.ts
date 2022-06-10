import { createSlice } from '@reduxjs/toolkit';

export const EDITOR_FEATURE_KEY = 'editor';

export interface EditorState {
  isDrawerOpen: boolean;
}

export const initialEditorState: EditorState = {
  isDrawerOpen: true,
};

export const editorSlice = createSlice({
  name: EDITOR_FEATURE_KEY,
  initialState: initialEditorState,
  reducers: {
    toggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const editorReducer = editorSlice.reducer;

export const getEditorState = (rootState: {
  [EDITOR_FEATURE_KEY]: EditorState;
}): EditorState => rootState[EDITOR_FEATURE_KEY];
