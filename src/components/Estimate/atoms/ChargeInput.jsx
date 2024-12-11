import { Box, Input, Typography } from '@mui/material';

const ChargeInput = ({ label, placeholder, value, onChange }) => {
  const handleChange = (e) => {
    const input = e.target.value;
    const numericValue = input.replace(/[^0-9]/g, '');
    onChange(parseInt(numericValue));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={3}
      sx={{
        width: '100%',
        minHeight: '60px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 7px 1px;',
      }}
    >
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        {label}
      </Typography>
      <Input
        type="text"
        disableUnderline
        placeholder={placeholder || '금액을 입력해주세요.'}
        value={value ? Number(value).toLocaleString() : ''}
        onChange={handleChange}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          style: {
            textAlign: 'right',
          },
        }}
        sx={{
          width: 'auto',
          maxWidth: '150px',
          ml: 2,
        }}
      />
    </Box>
  );
};

export default ChargeInput;
