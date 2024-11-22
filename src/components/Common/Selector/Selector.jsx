import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Autocomplete, TextField, Typography } from '@mui/material';

export const Selector = ({ label, choices }) => {
  const [choice, setChoice] = useState('');

  const handleChange = (event, newValue) => {
    setChoice(newValue);
  };

  return (
    <Box
      sx={{
        width: '326px',
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
        value={choice}
        onChange={handleChange}
        options={choices}
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={label}
            sx={{
              '& .MuiInputBase-input': {
                color: 'text.main', // Change text color to red
                fontWeight: 'bold', // Make the font bold
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
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
};
