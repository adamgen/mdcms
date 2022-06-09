import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useGetFilesListQuery } from '@md-cms/ui-store';

import { useQuery } from '../../hooks/use-query/use-query';
import { AppLink } from '../app-link/app-link';

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
      onNodeToggle={() => {
        // TODO add folder reader
      }}
    >
      {data.map((filename) => (
        <AppLink
          key={filename}
          href={name === filename ? '/' : `/file?name=${filename}`}
        >
          <TreeItem
            className={'Mui-selected'}
            nodeId={filename}
            label={filename}
            data-testid={`file-name--${filename}`}
          />
        </AppLink>
      ))}
    </TreeView>
  );
}
