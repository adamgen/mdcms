import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';

import { AppLayout } from './app-layout/app-layout';
import NewFileView from './views/new-file-view/new-file-view';

const StyledApp = styled.div``;

export function App() {
  return (
    <StyledApp>
      <AppLayout>
        <Routes>
          <Route path={'/file/new'} element={<NewFileView />} />
        </Routes>
      </AppLayout>
    </StyledApp>
  );
}

export default App;
