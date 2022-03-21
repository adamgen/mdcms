import styled from '@emotion/styled';

import { AppLayout } from './app-layout/app-layout';
import MdEditor from './md-editor/md-editor';
import FilePathTitle from './file-path-title/file-path-title';

const StyledApp = styled.div``;

export function App() {
  return (
    <StyledApp>
      <AppLayout>
        <FilePathTitle />
        <MdEditor />
      </AppLayout>
    </StyledApp>
  );
}

export default App;
