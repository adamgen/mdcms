import styled from '@emotion/styled';
import FilePathTitle from '../../components/file-path-title/file-path-title';
import MdEditor from '../../components/md-editor/md-editor';

/* eslint-disable-next-line */
export interface SelectedFileViewProps {}

const StyledSelectedFileView = styled.div`
  color: pink;
`;

export function SelectedFileView(props: SelectedFileViewProps) {
  return (
    <StyledSelectedFileView>
      <FilePathTitle />
      <MdEditor />
    </StyledSelectedFileView>
  );
}

export default SelectedFileView;
