import { fetchEditor, editorAdapter, editorReducer } from './editor.slice';

describe('editor reducer', () => {
  it('should handle initial state', () => {
    const expected = editorAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(editorReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchEditors', () => {
    let state = editorReducer(undefined, fetchEditor.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = editorReducer(
      state,
      fetchEditor.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = editorReducer(
      state,
      fetchEditor.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
