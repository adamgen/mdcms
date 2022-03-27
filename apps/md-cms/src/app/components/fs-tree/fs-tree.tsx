import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { useGetFilesListQuery } from '../../store/files.api';
import { useQuery } from '../../hooks/use-query/use-query';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

export function FsTree() {
  const { isLoading, data } = useGetFilesListQuery();
  const name = useQuery('name') ?? '';

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
      selected={name}
      multiSelect={false}
      onNodeToggle={() => {}}
    >
      {data.map((filename) => (
        <StyledLink
          key={filename}
          to={name === filename ? '/' : `/file?name=${filename}`}
        >
          <TreeItem
            className={'Mui-selected'}
            nodeId={filename}
            label={filename}
            data-testid={`file-name--${filename}`}
          />
        </StyledLink>
      ))}
    </TreeView>
  );
}
