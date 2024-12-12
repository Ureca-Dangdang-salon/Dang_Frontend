import PropTypes from 'prop-types';
import { Box, Autocomplete, TextField, Typography } from '@mui/material';

export const Selector = ({ label, choices, value, onChange, field }) => {
  return (
    <Box
      sx={{
        width: '100%',
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
                height: '27px',
                color: 'text.main',
                fontWeight: 'bold',
              },
            }}
          />
        )}
        renderOption={(props, option) => {
          const { key, ...rest } = props;
          return (
            <li
              key={key}
              {...rest}
              style={{ padding: '8px 16px', cursor: 'pointer' }}
            >
              <Typography>{option}</Typography>
            </li>
          );
        }}
        noOptionsText="해당 견종을 찾을 수 없습니다."
      />

      {!value && (
        <Typography fontSize={12} color="red" mt="5px" ml="8px">
          견종을 선택해주세요.
        </Typography>
      )}
    </Box>
  );
};

Selector.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
};
