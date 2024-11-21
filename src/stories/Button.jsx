import PropTypes from 'prop-types';
import './button.css';

const Button = ({ size, backgroundColor, onClick, label }) => {
  const className = `button ${size} ${backgroundColor === '#FDD94E' ? 'yellow' : 'gray'}`;

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

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
