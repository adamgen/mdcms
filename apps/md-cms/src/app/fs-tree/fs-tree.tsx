import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import { useGetFilesListQuery } from '../store/files.api';
import { useDispatch } from 'react-redux';
import { editorSlice } from '../store/editor.slice';

export function FsTree() {
  const { isLoading, data } = useGetFilesListQuery();
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
    >
      {data.map((filename) => (
        <TreeItem
          key={filename}
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
      ))}
    </TreeView>
  );
}
