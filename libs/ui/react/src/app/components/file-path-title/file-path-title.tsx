import styled from '@emotion/styled';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { SvgIconTypeMap } from '@mui/material/SvgIcon/SvgIcon';
import { Tooltip } from '@mui/material';

/* eslint-disable-next-line */
export interface FilePathTitleProps {
  path: string;
  onChange: (value: string) => void;
  onSave: () => void;
  iconTooltip: string;
}

const StyledFilePathTitle = styled.div`
  display: flex;
  align-items: center;
`;
const StyledFilePathTitleInput = styled.input`
  font-size: 2rem;
  padding: 10px;
  margin: 20px 0;
  background: lightgray;
  font-family: sans-serif;
  display: inline-block;
  border: 0;
`;

export function FilePathTitle({
  path,
  onChange,
  onSave,
  iconTooltip,
}: FilePathTitleProps) {
  const iconProps: SvgIconTypeMap['props'] = {
    sx: { cursor: 'pointer', padding: 1 },
    fontSize: 'large',
  };
  return (
    <StyledFilePathTitle>
      <StyledFilePathTitleInput
        value={path ?? ''}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        data-testid={'post-title'}
      />
      <div data-testid="save-to-filesystem-button" onClick={onSave}>
        {iconTooltip && (
          <Tooltip title={iconTooltip} data-testid="missing-data-tooltip">
            <SaveAltIcon {...iconProps} />
          </Tooltip>
        )}
        {!iconTooltip && <SaveAltIcon {...iconProps} />}
      </div>
    </StyledFilePathTitle>
  );
}

export default FilePathTitle;
