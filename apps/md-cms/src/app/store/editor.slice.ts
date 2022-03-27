import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../root-state';

export const EDITOR_FEATURE_KEY = 'editor';

interface File {
  path: string;
  content: string;
}

export interface EditorState {
  path: string | null;
  localContent: string;
  selectedFilePath: string; // selectedFile from th e menu
  // TODO update app to match
  selectedFile?: File;
  newFile?: Partial<File>;
}

export const initialEditorState: EditorState = {
  path: null,
  localContent: '',
  selectedFilePath: '',
};

export const editorSlice = createSlice({
  name: EDITOR_FEATURE_KEY,
  initialState: initialEditorState,
  reducers: {
    update: (state, action: PayloadAction<Partial<EditorState>>) => {
      state.path = action.payload.path ?? state.path;
      state.localContent = action.payload.localContent ?? state.localContent;
      state.selectedFilePath =
        action.payload.selectedFilePath ?? state.selectedFilePath;
    },
  },
});

export const editorReducer = editorSlice.reducer;

export const editorActions = editorSlice.actions;

export const getEditorState = (rootState: RootState): EditorState =>
  rootState[EDITOR_FEATURE_KEY];
