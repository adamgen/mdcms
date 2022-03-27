import styled from '@emotion/styled';
import FilePathTitle from '../../components/file-path-title/file-path-title';
import MdEditor from '../../components/md-editor/md-editor';
import { useQuery } from '../../hooks/use-query/use-query';
import { useDispatch, useSelector } from 'react-redux';
import { editorSlice, getEditorState } from '../../store/editor.slice';
import { useCreateFileMutation } from '../../store/files.api';
import { useMemo } from 'react';

/* eslint-disable-next-line */
export interface SelectedFileViewProps {}

const StyledSelectedFileView = styled.div``;

export function SelectedFileView(props: SelectedFileViewProps) {
  const path = useQuery('name') ?? '';

  const { localContent } = useSelector(getEditorState);
  const [createFile] = useCreateFileMutation();
  const dispatch = useDispatch();

  const isButtonDisabled = useMemo(() => {
    return !path && !localContent;
  }, [localContent, path]);

  const missingDataTooltipTitle = useMemo(() => {
    if (!path && !localContent) {
      return 'Missing localContent and file path';
    }
    if (!localContent) {
      return 'Missing localContent';
    }
    if (!path) {
      return 'Missing file path';
    }

    return null;
  }, [localContent, path]);

  return (
    <StyledSelectedFileView>
      <FilePathTitle
        path={path}
        onChange={(value) => {
          dispatch(editorSlice.actions.update({ path: value }));
        }}
        onClick={() => {
          if (!path || !localContent) {
            return;
          }

          if (isButtonDisabled) {
            return;
          }

          createFile({ content: localContent, filename: path });
        }}
        iconTooltip={missingDataTooltipTitle ?? ''}
      />

      <MdEditor />
    </StyledSelectedFileView>
  );
}

export default SelectedFileView;
