import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';

const Button = ({ size, backgroundColor, onClick, label, disabled, style }) => {
  return (
    <MuiButton
      onClick={onClick}
      disabled={disabled}
      style={style}
      variant="contained"
      color={backgroundColor}
      sx={{
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: 16,
        ...(size === 'large'
          ? { maxWidth: '326px', width: '100%', height: '60px' }
          : { maxWidth: '180px', width: '100%', height: '48px' }),
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
