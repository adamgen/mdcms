import * as React from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { getEditorState } from '@md-cms/ui-store';
import { FsTree } from '../../components/fs-tree/fs-tree';
import { useSelector } from 'react-redux';
import { CreatePostButton } from '../../components/create-post-button/create-post-button';

export default function AppDrawer() {
  const { isDrawerOpen } = useSelector(getEditorState);

  return (
    <MuiDrawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
      anchor={'left'}
      open={isDrawerOpen}
      variant="persistent"
    >
      <Box
        sx={{
          padding: 2,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        role="presentation"
        data-testid="side-menu-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <FsTree />

        <CreatePostButton />
      </Box>
    </MuiDrawer>
  );
}
