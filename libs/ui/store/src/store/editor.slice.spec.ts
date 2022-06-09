import {
  editorReducer,
  editorSlice,
  EditorState,
  initialEditorState,
} from './editor.slice';

const testReducer = (payload: Partial<EditorState>) =>
  editorReducer(initialEditorState, {
    ...editorSlice.actions.update,
    payload,
  });

describe('editor slice', () => {
  fit('should update the state', async () => {
    const newFilePath = 'posts/index.md';
    expect(testReducer({ path: newFilePath })).toEqual({
      ...initialEditorState,
      path: newFilePath,
    });
  });
});
