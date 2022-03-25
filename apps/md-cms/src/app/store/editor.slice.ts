import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../root-state';

export const EDITOR_FEATURE_KEY = 'editor';

export interface EditorState {
  path: string | null;
  localContent: string;
  selectedFile: string;
}

export const initialEditorState: EditorState = {
  path: null,
  localContent: '',
  selectedFile: '',
};

export const editorSlice = createSlice({
  name: EDITOR_FEATURE_KEY,
  initialState: initialEditorState,
  reducers: {
    update: (state, action: PayloadAction<Partial<EditorState>>) => {
      state.path = action.payload.path ?? state.path;
      state.localContent = action.payload.localContent ?? state.localContent;
      state.selectedFile = action.payload.selectedFile ?? state.selectedFile;
    },
  },
});

export const editorReducer = editorSlice.reducer;

export const editorActions = editorSlice.actions;

export const getEditorState = (rootState: RootState): EditorState =>
  rootState[EDITOR_FEATURE_KEY];
