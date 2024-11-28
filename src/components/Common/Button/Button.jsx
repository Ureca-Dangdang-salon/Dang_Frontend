import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ size, backgroundColor, onClick, label, disabled }) => {
  const getButtonClass = () => {
    switch (backgroundColor) {
      case 'primary':
        return 'yellow';
      case 'secondary':
        return 'purple';
      case 'gray':
        return 'gray';
      case 'delete':
        return 'delete';
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
  backgroundColor: PropTypes.oneOf(['primary', 'secondary', 'gray', 'delete'])
    .isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Button;
