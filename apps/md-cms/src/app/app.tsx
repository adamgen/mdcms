import styled from '@emotion/styled';

import { Link, Route } from 'react-router-dom';
import { AppLayout } from './app-layout/app-layout';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <AppLayout>
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
