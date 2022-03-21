import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../root-state';

export const EDITOR_FEATURE_KEY = 'editor';

export interface EditorState {
  path: string | null;
  content: string | null;
}

export const initialEditorState: EditorState = {
  path: null,
  content: null,
};

export const editorSlice = createSlice({
  name: EDITOR_FEATURE_KEY,
  initialState: initialEditorState,
  reducers: {
    update: (state, action) => {
      state.path = action.payload.path ?? state.path;
      state.content = action.payload.content ?? state.content;
    },
  },
});

export const editorReducer = editorSlice.reducer;

export const editorActions = editorSlice.actions;

export const getEditorState = (rootState: RootState): EditorState =>
  rootState[EDITOR_FEATURE_KEY];

// export const selectAllEditor = createSelector(getEditorState);
