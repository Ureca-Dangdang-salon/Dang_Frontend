import { styled } from '@mui/material';

export const Layer = styled('div')(() => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 100px)',
  gap: '3rem',
  justifyContent: 'center',
  padding: '32px 0',
}));
