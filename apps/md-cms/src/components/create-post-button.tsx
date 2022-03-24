import styled from '@emotion/styled';
import { Button } from '@mui/material';
import * as React from 'react';

/* eslint-disable-next-line */
export interface CreatePostButtonProps {}

const StyledCreatePostButton = styled(Button)``;

export function CreatePostButton(props: CreatePostButtonProps) {
  return (
    <StyledCreatePostButton
      data-testid="new-post-button"
      sx={{
        marginTop: 'auto',
      }}
      variant="contained"
    >
      Create a new post
    </StyledCreatePostButton>
  );
}
