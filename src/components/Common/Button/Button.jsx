import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';

const Button = ({ size, backgroundColor, onClick, label, disabled }) => {
  return (
    <MuiButton
      onClick={onClick}
      disabled={disabled}
      variant="contained"
      color={backgroundColor}
      sx={{
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: 16,
        ...(size === 'large'
          ? { width: '326px', height: '60px' }
          : { width: '167px', height: '48px' }),
        '&:hover': { backgroundColor: `${backgroundColor}.main` },
      }}
    >
      {label}
    </MuiButton>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(['large', 'medium']).isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
