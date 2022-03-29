import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { AppNavigation } from './app-navigation/app-navigation';
import AppDrawer from './app-drawer/app-drawer';
import { drawerWidth } from '../../consts';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { getEditorState } from '@md-cms/store';

const StyledAppLayout = styled.div``;
const StylesAppContent = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen &&
    css`
      margin-left: ${drawerWidth}px;
    `}

  transition: margin-left .2s;
`;

export function AppLayout(props: PropsWithChildren<unknown>) {
  const { isDrawerOpen } = useSelector(getEditorState);

  return (
    <StyledAppLayout>
      <StylesAppContent isOpen={isDrawerOpen}>
        <AppNavigation />
        {props.children}
      </StylesAppContent>
      <AppDrawer />
    </StyledAppLayout>
  );
}
