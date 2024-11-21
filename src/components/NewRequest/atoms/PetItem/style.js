import { styled } from '@mui/material';

export const Layer = styled('div')(({ theme, isSelected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  fontSize: '14px',
  fontWeight: isSelected ? 'bold' : 'normal',
  cursor: 'pointer',
  transition: 'all 0.1s ease',
  div: {
    border: isSelected ? `2px solid ${theme.palette.secondary.main}` : 'none',
    transition: 'all 0.1s ease',
  },
}));

export const Img = styled('div')(({ theme }) => ({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  background: theme.palette.p3.main,
}));
