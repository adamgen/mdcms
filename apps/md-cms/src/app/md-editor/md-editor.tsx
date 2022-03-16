import '@toast-ui/editor/dist/toastui-editor.css';
import styled from '@emotion/styled';
import { Editor } from '@toast-ui/react-editor';

/* eslint-disable-next-line */
export interface MdEditorProps {}

const StyledMdEditor = styled.div`
  color: pink;
`;

export function MdEditor(props: MdEditorProps) {
  return (
    <StyledMdEditor>
      <Editor
        initialValue="hello react editor world!"
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
      />
    </StyledMdEditor>
  );
}

export default MdEditor;
