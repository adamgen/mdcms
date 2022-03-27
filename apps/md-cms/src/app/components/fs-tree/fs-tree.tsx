import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import { useGetFilesListQuery } from '../../store/files.api';
import { editorSlice } from '../../store/editor.slice';

function useQuery(param: string) {
  const { search } = useLocation();

  return (
    React.useMemo(() => new URLSearchParams(search), [search]).get(param) ??
    undefined
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

export function FsTree() {
  const { isLoading, data } = useGetFilesListQuery();
  const name = useQuery('name');

  const dispatch = useDispatch();

  if (isLoading) {
    return <>Loading...</>;
  }

  if (!data) {
    return <>no files are present...</>;
  }

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      data-testid="fs-tree"
      defaultSelected={name}
      multiSelect={false}
    >
      {data.map((filename) => (
        <StyledLink key={filename} to={`/file?name=${filename}`}>
          <TreeItem
            className={'Mui-selected'}
            onClick={() => {
              dispatch(
                editorSlice.actions.update({
                  selectedFilePath: filename,
                  path: filename,
                })
              );
            }}
            nodeId={filename}
            label={filename}
            data-testid={`file-name--${filename}`}
          />
        </StyledLink>
      ))}
    </TreeView>
  );
}
