import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { editorSlice, getEditorState } from '../slices/editor.slice';
import {
  useCreateFileMutation,
  useGetFilesListQuery,
} from '../fs-tree/fs-tree.slice';
import SaveIcon from '@mui/icons-material/save';

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

  return (
    <StyledFilePathTitle>
      <StyledFilePathTitleInput
        defaultValue={path ?? ''}
        onChange={(e) => {
          dispatch(editorSlice.actions.update({ path: e.target.value }));
        }}
        data-testid={'post-title'}
      />
      {!isPathExists && (
        <SaveIcon
          sx={{ cursor: 'pointer', padding: 1 }}
          fontSize="large"
          onClick={() => {
            if (!path) {
              return;
            }

            createFile({ content, filename: path });
          }}
        />
      )}
    </StyledFilePathTitle>
  );
}

export default FilePathTitle;
