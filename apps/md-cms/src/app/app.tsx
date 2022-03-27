import styled from '@emotion/styled';
import { Route } from 'react-router-dom';

import { AppLayout } from './app-layout/app-layout';
import MdEditor from './components/md-editor/md-editor';
import FilePathTitle from './components/file-path-title/file-path-title';
import EmptyView from './views/empty-view/empty-view';

const StyledApp = styled.div``;

export function App() {
  return (
    <StyledApp>
      <AppLayout>
        <Route path={'/'} exact={true}>
          <EmptyView />
        </Route>
        <Route path={'/file'}>
          <FilePathTitle />
          <MdEditor />
        </Route>
      </AppLayout>
    </StyledApp>
  );
}

export default App;
