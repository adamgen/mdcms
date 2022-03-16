import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { AppNavigation } from './app-navigation/app-navigation';
import AppDrawer from './app-drawer/app-drawer';
import { drawerWidth } from '../../consts';
import { useSelector } from 'react-redux';
import { getDrawerState } from './app-drawer/drawer.slice';
import { css } from '@emotion/react';

const StyledAppLayout = styled.div`
  color: pink;
`;
const StylesAppContent = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen &&
    css`
      margin-left: ${drawerWidth}px;
    `}

  transition: margin-left .2s;
`;

export function AppLayout(props: PropsWithChildren<unknown>) {
  const { isOpen } = useSelector(getDrawerState);

  return (
    <StyledAppLayout>
      <StylesAppContent isOpen={isOpen}>
        <AppNavigation />
        {props.children}
      </StylesAppContent>
      <AppDrawer />
    </StyledAppLayout>
  );
}
