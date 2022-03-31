import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';

import { AppLayout } from './app-layout/app-layout';
import EmptyView from './views/empty-view/empty-view';
import NewFileView from './views/new-file-view/new-file-view';
import SelectedFileView from './views/selected-file-view/selected-file-view';

const StyledApp = styled.div``;

export function App() {
  return (
    <StyledApp>
      <AppLayout>
        <Routes>
          <Route path={'/'} element={<EmptyView />} />
          <Route path={'/file/new'} element={<NewFileView />} />
          <Route path={'/file'} element={<SelectedFileView />} />
        </Routes>
      </AppLayout>
    </StyledApp>
  );
}

export default App;
