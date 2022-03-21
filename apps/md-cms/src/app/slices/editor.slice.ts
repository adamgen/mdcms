import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const EDITOR_FEATURE_KEY = 'editor';

/*
 * Update these interfaces according to your requirements.
 */
export interface EditorEntity {
  id: number;
}

export interface EditorState extends EntityState<EditorEntity> {
  loadingStatus: 'not loaded' | 'loading' | 'loaded' | 'error';
  error: string;
}

export const editorAdapter = createEntityAdapter<EditorEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchEditor())
 * }, [dispatch]);
 * ```
 */
export const fetchEditor = createAsyncThunk(
  'editor/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getEditors()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialEditorState: EditorState = editorAdapter.getInitialState({
  loadingStatus: 'not loaded',
  error: null,
});

export const editorSlice = createSlice({
  name: EDITOR_FEATURE_KEY,
  initialState: initialEditorState,
  reducers: {
    add: editorAdapter.addOne,
    remove: editorAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEditor.pending, (state: EditorState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchEditor.fulfilled,
        (state: EditorState, action: PayloadAction<EditorEntity[]>) => {
          editorAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchEditor.rejected, (state: EditorState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const editorReducer = editorSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(editorActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const editorActions = editorSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllEditor);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = editorAdapter.getSelectors();

export const getEditorState = (rootState: unknown): EditorState =>
  rootState[EDITOR_FEATURE_KEY];

export const selectAllEditor = createSelector(getEditorState, selectAll);

export const selectEditorEntities = createSelector(
  getEditorState,
  selectEntities
);
