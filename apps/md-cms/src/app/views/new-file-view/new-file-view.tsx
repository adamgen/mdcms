import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface NewFileViewProps {}

const StyledNewFileView = styled.div`
  color: pink;
`;

export function NewFileView(props: NewFileViewProps) {
  return (
    <StyledNewFileView>
      <h1>Welcome to NewFileView!</h1>
    </StyledNewFileView>
  );
}

export default NewFileView;
