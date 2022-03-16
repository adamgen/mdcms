import styled from '@emotion/styled';
import {PropsWithChildren} from 'react';
import {AppNavigation} from './app-navigation/app-navigation';
import AppDrawer from './app-drawer/app-drawer';

const StyledAppLayout = styled.div`
  color: pink;
`;

export function AppLayout(props: PropsWithChildren<unknown>) {
  return (
    <StyledAppLayout>
      <AppNavigation />
      {props.children}
      <AppDrawer />
    </StyledAppLayout>
  );
}
