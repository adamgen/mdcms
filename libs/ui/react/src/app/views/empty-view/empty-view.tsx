import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface EmptyViewProps {}

const StyledEmptyView = styled.div`
  color: pink;
`;

export function EmptyView(props: EmptyViewProps) {
  return (
    <StyledEmptyView>
      <h1>Welcome to EmptyView!</h1>
    </StyledEmptyView>
  );
}
