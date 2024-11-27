import { Box, TextField } from '@mui/material';

const TextArea = ({ placeholder, value, onChange, rows, disable }) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'white.main',
        '.MuiOutlinedInput-notchedOutline': {
          borderRadius: '10px',
          border: 'none',
          borderColor: 'text.main',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 7px 1px',
        },
      }}
    >
      <TextField
        multiline
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disable}
        sx={{
          width: '100%',
          '& .MuiInputBase-input': {
            color: 'text.main',
            fontWeight: 'bold',
          },
          '& .MuiOutlinedInput-root': {
            padding: '16px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '10px',
            border: 'none',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 7px 1px',
          },
        }}
      />
    </Box>
  );
};

export default TextArea;
