import styled from '@emotion/styled';
import { Link, Route } from 'react-router-dom';

import { AppLayout } from './app-layout/app-layout';
import MdEditor from './md-editor/md-editor';

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
  return (
    <StyledApp>
      <AppLayout>
        <StyledPostPath defaultValue={'posts/index.md'} />
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
