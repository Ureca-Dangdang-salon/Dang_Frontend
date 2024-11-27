import { Box, TextField } from '@mui/material';

const TextArea = ({ placeholder, value, onChange, rows, disable }) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'white.main',
        '.MuiOutlinedInput-notchedOutline': {
          borderRadius: '10px',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 7px 1px',
        },
      }}
    >
      <TextField
        fullWidth
        multiline
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disable}
        sx={{
          '& .MuiInputBase-input': {
            fontWeight: 'bold',
          },
          '& .MuiOutlinedInput-root': {
            padding: '16px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
        }}
      />
    </Box>
  );
};

export default TextArea;
