import { Box, Input, Typography } from '@mui/material';
import toast from 'react-hot-toast';

const ChargeInput = ({ label, placeholder, value, onChange }) => {
  const handleChange = (e) => {
    const input = e.target.value;
    let numericValue = input.replace(/[^0-9]/g, '');

    if (numericValue == '') {
      onChange(0);
      return;
    }

    if (numericValue <= 1000000) {
      onChange(parseInt(numericValue));
    } else {
      toast.error('입력할 수 있는 최대 금액을 초과하셨습니다.');
    }
  };

  const handleBlur = () => {
    let validValue = Math.floor(value / 100) * 100;
    onChange(validValue);
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
        onBlur={handleBlur}
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
