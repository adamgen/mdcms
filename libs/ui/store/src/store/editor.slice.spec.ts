import { editorReducer, editorSlice, initialEditorState } from './editor.slice';

describe('editor slice', () => {
  it('should update the state', async () => {
    const state = editorReducer(initialEditorState, {
      ...editorSlice.actions.toggleDrawer,
    });
    expect(state).toEqual({
      ...initialEditorState,
      isDrawerOpen: false,
    });

    expect(editorReducer(state, editorSlice.actions.toggleDrawer)).toEqual({
      ...initialEditorState,
      isDrawerOpen: true,
    });
  });
});
