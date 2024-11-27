import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ size, backgroundColor, onClick, label }) => {
  if (backgroundColor != 'primary' && backgroundColor != 'delete')
    backgroundColor = 'gray';

  const className = `button ${size} ${backgroundColor}`;

  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.oneOf(['large', 'medium']).isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export default Button;
