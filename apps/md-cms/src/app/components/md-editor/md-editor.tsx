import '@toast-ui/editor/dist/toastui-editor.css';
import styled from '@emotion/styled';
import { Editor } from '@toast-ui/react-editor';
import { Editor as NativeEditor } from '@toast-ui/editor';
import { useEffect, useRef } from 'react';

/* eslint-disable-next-line */
export interface MdEditorProps {
  content?: string;
  onChange: (value: string) => void;
}

const StyledMdEditor = styled.div``;

export function MdEditor({ content, onChange }: MdEditorProps) {
  const editorRef = useRef<Editor & { editorInst: NativeEditor }>(null);

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
          onChange(contentUpdate ?? '');
        }}
      />
    </StyledMdEditor>
  );
}

export default MdEditor;
