import styled from '@emotion/styled';
import { Route, Routes } from 'react-router-dom';

import { AppLayout } from './app-layout/app-layout';
import MdEditor from './components/md-editor/md-editor';
import FilePathTitle from './components/file-path-title/file-path-title';
import EmptyView from './views/empty-view/empty-view';
import NewFileView from './views/new-file-view/new-file-view';

const StyledApp = styled.div``;

export function App() {
  return (
    <StyledApp>
      <AppLayout>
        <Routes>
          <Route path={'/'} element={<EmptyView />} />
          <Route path={'/file/new'} element={<NewFileView />} />
          <Route
            path={'/file'}
            element={
              <>
                <FilePathTitle />
                <MdEditor />
              </>
            }
          />
        </Routes>
      </AppLayout>
    </StyledApp>
  );
}

export default App;
