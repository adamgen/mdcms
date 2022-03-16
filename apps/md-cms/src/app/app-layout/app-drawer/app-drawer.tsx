import * as React from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { FsTree } from './fs-tree/fs-tree';

type Anchor = 'left';
const drawerWidth = 240;

export default function AppDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  const anchor = 'left';

  return (
    <div>
      <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
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
        open={state[anchor]}
        variant="persistent"
        onClose={toggleDrawer(anchor, false)}
      >
        <Box
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
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
