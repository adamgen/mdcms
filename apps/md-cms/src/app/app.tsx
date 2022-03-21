import styled from '@emotion/styled';
import { Link, Route } from 'react-router-dom';

import { AppLayout } from './app-layout/app-layout';
import MdEditor from './md-editor/md-editor';
import { useDispatch, useSelector } from 'react-redux';
import { editorSlice, getEditorState } from './slices/editor.slice';

const StyledApp = styled.div`
  // Your style here
`;

const StyledPostPath = styled.input`
  font-size: 2rem;
  padding: 10px;
  margin: 20px 0;
  background: lightgray;
  font-family: sans-serif;
  display: inline-block;
  border: 0;
`;

export function App() {
  const selector = useSelector(getEditorState);
  const dispatch = useDispatch();

  return (
    <StyledApp>
      <AppLayout>
        <StyledPostPath
          defaultValue={selector.path ?? ''}
          onChange={(e) => {
            dispatch(editorSlice.actions.update({ path: e.target.value }));
          }}
          data-testid={'post-title'}
        />
        <MdEditor />
        <Route
          path="/"
          exact
          render={() => (
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          )}
        />
        <Route
          path="/page-2"
          exact
          render={() => (
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          )}
        />
      </AppLayout>
    </StyledApp>
  );
}

export default App;
