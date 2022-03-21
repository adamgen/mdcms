import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { editorSlice, getEditorState } from '../slices/editor.slice';

/* eslint-disable-next-line */
export interface FilePathTitleProps {}

const StyledFilePathTitle = styled.input`
  font-size: 2rem;
  padding: 10px;
  margin: 20px 0;
  background: lightgray;
  font-family: sans-serif;
  display: inline-block;
  border: 0;
`;

export function FilePathTitle(props: FilePathTitleProps) {
  const selector = useSelector(getEditorState);
  const dispatch = useDispatch();

  return (
    <StyledFilePathTitle
      defaultValue={selector.path ?? ''}
      onChange={(e) => {
        dispatch(editorSlice.actions.update({ path: e.target.value }));
      }}
      data-testid={'post-title'}
    />
  );
}

export default FilePathTitle;
