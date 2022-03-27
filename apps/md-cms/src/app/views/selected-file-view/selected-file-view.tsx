import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface SelectedFileViewProps {}

const StyledSelectedFileView = styled.div`
  color: pink;
`;

export function SelectedFileView(props: SelectedFileViewProps) {
  return (
    <StyledSelectedFileView>
      <h1>Welcome to SelectedFileView!</h1>
    </StyledSelectedFileView>
  );
}

export default SelectedFileView;
