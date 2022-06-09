import React from 'react';

export const Editor = React.forwardRef((props, ref) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ref.current = {
    editorInst: {
      setMarkdown: jest.fn(),
    },
  };
  return <div />;
});
