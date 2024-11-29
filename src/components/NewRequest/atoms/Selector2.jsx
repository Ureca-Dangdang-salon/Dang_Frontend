import { Box, Typography } from '@mui/material';

export const Selector2 = ({ label, content, icon: Icon, setOpen }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      px={3}
      justifyContent="space-between"
      sx={{
        width: '100%',
        minHeight: '60px',
        borderRadius: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 7px 1px',
        cursor: 'pointer',
      }}
      onClick={() => setOpen((e) => !e)}
    >
      <Typography
        fontSize={16}
        fontWeight="bold"
        sx={{ color: content ? 'text.main' : 'n2.main' }}
      >
        {content ? content : label}
      </Typography>
      {Icon && <Icon sx={{ color: 'n2.main' }} />}
    </Box>
  );
};
