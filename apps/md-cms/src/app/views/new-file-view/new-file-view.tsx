import styled from '@emotion/styled';
import FilePathTitle from '../../components/file-path-title/file-path-title';
import MdEditor from '../../components/md-editor/md-editor';
import { useMemo, useState } from 'react';
import { useCreateFileMutation } from '../../store/files.api';

const StyledNewFileView = styled.div``;

export function NewFileView() {
  const [path, setPath] = useState('');
  const [content, setContent] = useState('');

  const [createFile] = useCreateFileMutation();

  const isButtonDisabled = useMemo(() => {
    return !path && !content;
  }, [content, path]);

  const missingDataTooltipTitle = useMemo(() => {
    if (!path && !content) {
      return 'Missing content and file path';
    }
    if (!content) {
      return 'Missing content';
    }
    if (!path) {
      return 'Missing file path';
    }

    return null;
  }, [content, path]);

  return (
    <StyledNewFileView>
      <FilePathTitle
        path={path}
        onChange={(value) => {
          // dispatch(editorSlice.actions.update({ path: value }));
          setPath(value);
        }}
        onSave={() => {
          if (!path || !content) {
            return;
          }

          if (isButtonDisabled) {
            return;
          }

          createFile({ content: content, filename: path });
        }}
        iconTooltip={missingDataTooltipTitle ?? ''}
      />

      <MdEditor
        content={content}
        onChange={(value) => {
          setContent(value);
        }}
      />
    </StyledNewFileView>
  );
}

export default NewFileView;
