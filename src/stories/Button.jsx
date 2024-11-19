import React from 'react';

import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export const MainButton = ({ label, onClick, color, size, ...props }) => {
  return (
    <Button
      color={color}
      onClick={onClick}
      variant="contained"
      sx={{
        ...(size === 'large'
          ? {
              height: '60px',
              width: '326px',
            }
          : { height: '48x', width: '167px' }),
        fontSize: '16px',
        fontWeight: 800,
        font: 'text',
        borderRadius: 3,
      }}
      {...props}
    >
      {label}
    </Button>
  );
};

MainButton.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
};
