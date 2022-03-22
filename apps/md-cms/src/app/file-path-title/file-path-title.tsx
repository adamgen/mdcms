import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { editorSlice, getEditorState } from '../slices/editor.slice';
import {
  useCreateFileMutation,
  useGetFilesListQuery,
} from '../fs-tree/fs-tree.slice';
import AddIcon from '@mui/icons-material/Add';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { Tooltip } from '@mui/material';

/* eslint-disable-next-line */
export interface FilePathTitleProps {}

const StyledFilePathTitle = styled.div`
  display: flex;
  align-items: center;
`;
const StyledFilePathTitleInput = styled.input`
  font-size: 2rem;
  padding: 10px;
  margin: 20px 0;
  background: lightgray;
  font-family: sans-serif;
  display: inline-block;
  border: 0;
`;

export function FilePathTitle(props: FilePathTitleProps) {
  const { path } = useSelector(getEditorState);
  const filesQuery = useGetFilesListQuery();
  const [createFile] = useCreateFileMutation();
  const dispatch = useDispatch();
  const { content } = useSelector(getEditorState);

  const isPathExists = useMemo(() => {
    return path && filesQuery.data?.includes(path);
  }, [filesQuery, path]);

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

  const iconProps: SvgIconTypeMap<{ onClick: () => void }>['props'] = {
    sx: { cursor: 'pointer', padding: 1 },
    fontSize: 'large',
    onClick: () => {
      if (!path) {
        return;
      }

      if (isButtonDisabled) {
        return;
      }

      createFile({ content, filename: path });
    },
  };

  return (
    <StyledFilePathTitle data-testid="save-to-filesystem-button">
      <StyledFilePathTitleInput
        defaultValue={path ?? ''}
        onChange={(e) => {
          dispatch(editorSlice.actions.update({ path: e.target.value }));
        }}
        data-testid={'post-title'}
      />
      {missingDataTooltipTitle && (
        <Tooltip
          title={missingDataTooltipTitle}
          data-testid="missing-data-tooltip"
        >
          <div>
            {!isPathExists && <AddIcon {...iconProps} />}
            {isPathExists && <SaveAltIcon {...iconProps} />}
          </div>
        </Tooltip>
      )}
      {!missingDataTooltipTitle && (
        <>
          {!isPathExists && <AddIcon {...iconProps} />}
          {isPathExists && <SaveAltIcon {...iconProps} />}
        </>
      )}
    </StyledFilePathTitle>
  );
}

export default FilePathTitle;
