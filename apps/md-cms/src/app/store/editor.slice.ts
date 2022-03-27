import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../root-state';

export const EDITOR_FEATURE_KEY = 'editor';

export interface File {
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
  selectedFile: undefined,
  newFile: undefined,
};

const storeAllowedKeys = Object.keys(initialEditorState);
type TStoreAllowedKeys = (keyof EditorState)[];

export const editorSlice = createSlice({
  name: EDITOR_FEATURE_KEY,
  initialState: initialEditorState,
  reducers: {
    update: (state, action: PayloadAction<Partial<EditorState>>) => {
      (Object.keys(action.payload) as TStoreAllowedKeys)
        .filter((key) => storeAllowedKeys.includes(key))
        .forEach((key) => {
          const value = action.payload[key];
          if (!value) {
            return;
          }
          // @ts-ignore
          state[key] = value;
        });
    },
  },
});

export const editorReducer = editorSlice.reducer;

export const getEditorState = (rootState: RootState): EditorState =>
  rootState[EDITOR_FEATURE_KEY];
