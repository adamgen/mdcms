import '@toast-ui/editor/dist/toastui-editor.css';
import styled from '@emotion/styled';
import { Editor } from '@toast-ui/react-editor';
import { Editor as NativeEditor } from '@toast-ui/editor';
import { useDispatch, useSelector } from 'react-redux';
import { editorSlice, getEditorState } from '../slices/editor.slice';
import { useEffect, useRef } from 'react';

/* eslint-disable-next-line */
export interface MdEditorProps {}

const StyledMdEditor = styled.div``;

export function MdEditor(props: MdEditorProps) {
  const { content, updater } = useSelector(getEditorState);
  const dispatch = useDispatch();
  const editorRef = useRef<Editor & { editorInst: NativeEditor }>(null);

  useEffect(() => {
    if (updater === 'other') {
      editorRef.current?.editorInst.setMarkdown(content ?? '');
    }
  }, [content, updater]);

  return (
    <StyledMdEditor data-testid="editor">
      <Editor
        ref={editorRef}
        initialValue={content ?? ''}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        onChange={(e) => {
          const content = editorRef.current?.editorInst.getMarkdown();
          dispatch(editorSlice.actions.update({ content, updater: 'editor' }));
        }}
      />
    </StyledMdEditor>
  );
}

export default MdEditor;
