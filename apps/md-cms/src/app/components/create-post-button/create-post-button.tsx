import styled from '@emotion/styled';
import { Button } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface CreatePostButtonProps {}

const StyledCreatePostButton = styled(Button)``;

export function CreatePostButton(props: CreatePostButtonProps) {
  return (
    <Link to={'/file/new'}>
      <StyledCreatePostButton
        data-testid="new-post-button"
        sx={{
          marginTop: 'auto',
        }}
        variant="contained"
      >
        Create a new post
      </StyledCreatePostButton>
    </Link>
  );
}
