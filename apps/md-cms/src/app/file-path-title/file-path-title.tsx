import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { editorSlice, getEditorState } from '../store/editor.slice';
import {
  useCreateFileMutation,
  useGetFilesListQuery,
} from '../store/files.api';
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
  const { path, localContent } = useSelector(getEditorState);
  const filesQuery = useGetFilesListQuery();
  const [createFile] = useCreateFileMutation();
  const dispatch = useDispatch();

  const isPathExists = useMemo(() => {
    return path && filesQuery.data?.includes(path);
  }, [filesQuery, path]);

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

  const iconProps: SvgIconTypeMap['props'] = {
    sx: { cursor: 'pointer', padding: 1 },
    fontSize: 'large',
  };

  return (
    <StyledFilePathTitle>
      <StyledFilePathTitleInput
        value={path ?? ''}
        onChange={(e) => {
          dispatch(editorSlice.actions.update({ path: e.target.value }));
        }}
        data-testid={'post-title'}
      />
      <div
        data-testid="save-to-filesystem-button"
        onClick={() => {
          if (!path || !localContent) {
            return;
          }

          if (isButtonDisabled) {
            return;
          }

          createFile({ content: localContent, filename: path });
        }}
      >
        {missingDataTooltipTitle && (
          <>
            <Tooltip
              title={missingDataTooltipTitle}
              data-testid="missing-data-tooltip"
            >
              {/*MUST use a div here in order for tooltip to work*/}
              <div>
                {!isPathExists && <AddIcon {...iconProps} />}
                {isPathExists && <SaveAltIcon {...iconProps} />}
              </div>
            </Tooltip>
          </>
        )}
        {!missingDataTooltipTitle && (
          <>
            {!isPathExists && <AddIcon {...iconProps} />}
            {isPathExists && <SaveAltIcon {...iconProps} />}
          </>
        )}
      </div>
    </StyledFilePathTitle>
  );
}

export default FilePathTitle;
