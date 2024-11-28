import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ size, backgroundColor, onClick, label, disabled }) => {
  const className = `button ${size} ${backgroundColor}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(['large', 'medium']).isRequired,
  backgroundColor: PropTypes.oneOf(['primary', 'secondary', 'gray', 'delete'])
    .isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
