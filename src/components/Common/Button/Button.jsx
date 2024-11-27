import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ size, backgroundColor, onClick, label, disabled }) => {
  const getButtonClass = () => {
    if (disabled) return 'gray';
    switch (backgroundColor) {
      case 'yellow':
        return 'yellow';
      case 'secondary':
        return 'purple';
      case 'n3':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const className = `button ${size} ${getButtonClass()}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
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
