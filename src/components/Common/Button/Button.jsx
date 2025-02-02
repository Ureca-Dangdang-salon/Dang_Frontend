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
        fontSize: { xs: 14, sm: 16 },
        ...(size === 'large'
          ? { width: '326px', height: '60px' }
          : { width: '180px', height: '48px' }),
        '&:hover': { backgroundColor: `${backgroundColor}.main` },
        '@media (max-width: 500px)': {
          width: '100%',
        },
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
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  disabled: PropTypes.bool,
};

export default Button;
