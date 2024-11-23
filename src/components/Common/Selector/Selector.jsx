import PropTypes from 'prop-types';
import { Box, Autocomplete, TextField, Typography } from '@mui/material';

export const Selector = ({ label, choices, value, onChange, field }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '60px',
        backgroundColor: 'white.main',
        '.MuiOutlinedInput-notchedOutline': {
          borderRadius: '10px',
          border: 'none',
          borderColor: 'text.main',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 7px 1px;',
        },
      }}
    >
      <Autocomplete
        value={value}
        options={choices}
        getOptionLabel={(option) => option}
        onChange={(e, newValue) => onChange(field, newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={label}
            sx={{
              '& .MuiInputBase-input': {
                color: 'text.main',
                fontWeight: 'bold',
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            <Typography>{option}</Typography>
          </li>
        )}
      />
    </Box>
  );
};

Selector.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
};
