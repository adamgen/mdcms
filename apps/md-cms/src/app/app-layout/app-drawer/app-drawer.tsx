import * as React from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { FsTree } from './fs-tree/fs-tree';
import { useSelector } from 'react-redux';
import { getDrawerState } from './drawer.slice';
import { drawerWidth } from '../../../consts';

export default function AppDrawer() {
  const { isOpen } = useSelector(getDrawerState);

  return (
    <MuiDrawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      anchor={'left'}
      open={isOpen}
      variant="persistent"
    >
      <Box
        sx={{
          padding: 2,
        }}
        role="presentation"
        data-testid="side-menu-container"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <FsTree />
        </div>
      </Box>
    </MuiDrawer>
  );
}
