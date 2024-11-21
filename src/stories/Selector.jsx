import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, FormControl, Select, MenuItem, Typography } from '@mui/material';

export const Selector = ({ label, choices }) => {
  const [choice, setChoice] = useState(label);

  const handleChange = (event) => {
    setChoice(event.target.value);
  };

  return (
    <Box
      sx={{
        minWidth: 200,
        '.MuiOutlinedInput-notchedOutline': {
          borderRadius: '10px',
          border: 'none',
          borderColor: 'text.main',
          boxShadow: '0px 0px 5px 0px rgba(51, 51, 51, 0.08)',
        },
      }}
    >
      <FormControl
        fullWidth
        sx={{
          minHeight: '60px',
          height: '60px',
          justifyContent: 'center',
        }}
      >
        <Select
          labelId="demo-customized-select-native"
          id="demo-simple-select"
          value={choice}
          label={label}
          onChange={handleChange}
        >
          <MenuItem disabled value={label}>
            <Typography color="n2.main" fontWeight={600}>
              {label}
            </Typography>
          </MenuItem>
          {choices.map((item) => (
            <MenuItem
              key={item}
              value={item}
              sx={{
                color: 'text.main',
                '&:hover': {
                  backgroundColor: 'p3.main',
                },
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

Selector.PropTypes = {
  label: PropTypes.string,
  choices: PropTypes.array,
};
