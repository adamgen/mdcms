import styled from '@emotion/styled';
import FilePathTitle from '../../components/file-path-title/file-path-title';
import { useEffect, useMemo, useState } from 'react';

import MdEditor from '../../components/md-editor/md-editor';
import { useQuery } from '../../hooks/use-query/use-query';
import { useCreateFileMutation, useGetFileByNameQuery } from '@md-cms/store';

const StyledSelectedFileView = styled.div``;

export function SelectedFileView() {
  const path = useQuery('name') ?? '';
  const [content, setContent] = useState('');

  const [createFile] = useCreateFileMutation();

  const isButtonDisabled = useMemo(() => {
    return !path && !content;
  }, [content, path]);

  const missingDataTooltipTitle = useMemo(() => {
    if (!path && !content) {
      return 'Missing content and file path';
    }
    if (!content) {
      return 'Missing content';
    }
    if (!path) {
      return 'Missing file path';
    }

    return null;
  }, [content, path]);

  const name = useQuery('name') ?? '';
  const { data } = useGetFileByNameQuery(name, {
    skip: !name,
  });

  useEffect(() => {
    setContent(data ?? '');
  }, [data]);

  return (
    <StyledSelectedFileView>
      <FilePathTitle
        path={path}
        onChange={(value) => {
          // TODO add edit title option and validation
        }}
        onSave={() => {
          if (!path || !content) {
            return;
          }

          if (isButtonDisabled) {
            return;
          }

          createFile({ content, filename: path });
        }}
        iconTooltip={missingDataTooltipTitle ?? ''}
      />

      <MdEditor
        content={content ?? ''}
        onChange={(value) => {
          setContent(value);
        }}
      />
    </StyledSelectedFileView>
  );
}

export default SelectedFileView;
