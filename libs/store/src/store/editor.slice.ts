import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const EDITOR_FEATURE_KEY = 'editor';

export interface EditorState {
  localContent: string;
  selectedFilePath: string; // selectedFile from th e menu
  isDrawerOpen: boolean;
}

export const initialEditorState: EditorState = {
  localContent: '',
  selectedFilePath: '',
  isDrawerOpen: true,
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
    toggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const editorReducer = editorSlice.reducer;

export const getEditorState = (rootState: any): EditorState =>
  rootState[EDITOR_FEATURE_KEY];
