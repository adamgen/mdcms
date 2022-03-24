import React from 'react';

export const Editor = React.forwardRef((props, ref) => {
  // @ts-ignore
  ref.current = {
    editorInst: {
      setMarkdown: jest.fn(),
    },
  };
  return <div />;
});
