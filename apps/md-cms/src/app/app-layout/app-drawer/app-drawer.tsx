import * as React from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { FsTree } from './fs-tree/fs-tree';
import { useSelector } from 'react-redux';
import { drawerActions, getDrawerState } from './drawer.slice';

const drawerWidth = 240;

export default function AppDrawer() {
  const { isOpen } = useSelector(getDrawerState);

  const toggleDrawer =
    (isOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      // if (isOpen) {
      //   drawerActions.open();
      // } else {
      //   drawerActions.close();
      // }

      // setState({ left: open });
    };
  const anchor = 'left';

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>{anchor}</Button>
      <MuiDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        anchor={anchor}
        open={isOpen}
        variant="persistent"
        onClose={toggleDrawer(false)}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
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
    </div>
  );
}
