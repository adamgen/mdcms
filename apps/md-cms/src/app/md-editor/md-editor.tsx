import '@toast-ui/editor/dist/toastui-editor.css';
import styled from '@emotion/styled';
import { Editor } from '@toast-ui/react-editor';
import { Editor as NativeEditor } from '@toast-ui/editor';
import { useDispatch, useSelector } from 'react-redux';
import { editorSlice, getEditorState } from '../store/editor.slice';
import { useEffect, useRef } from 'react';
import { useGetFileByNameQuery } from '../store/files.api';

/* eslint-disable-next-line */
export interface MdEditorProps {}

const StyledMdEditor = styled.div``;

export function MdEditor(props: MdEditorProps) {
  const { selectedFilePath } = useSelector(getEditorState);
  const dispatch = useDispatch();
  const editorRef = useRef<Editor & { editorInst: NativeEditor }>(null);
  const { data: content } = useGetFileByNameQuery(selectedFilePath, { skip: !selectedFilePath });

  useEffect(() => {
    editorRef.current?.editorInst.setMarkdown(content ?? '', false);
  }, [content]);

  return (
    <StyledMdEditor data-testid="editor">
      <Editor
        ref={editorRef}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        autofocus={false}
        onChange={(e) => {
          const contentUpdate = editorRef.current?.editorInst.getMarkdown();
          dispatch(
            editorSlice.actions.update({
              localContent: contentUpdate,
            })
          );
        }}
      />
    </StyledMdEditor>
  );
}

export default MdEditor;
