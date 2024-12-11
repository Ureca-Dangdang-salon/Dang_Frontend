import PropTypes from 'prop-types';
import './RadioButton.css';

const RadioButton = ({ size, selected, label, onChange }) => {
  return (
    <div
      className={`radio-button ${size} ${selected ? 'selected' : ''}`}
      onClick={onChange}
      style={{ marginBottom: '12px' }}
    >
      <div className={`radio-circle ${selected ? 'checked' : ''}`}>
        <div className={`${selected ? 'inner-circle' : ''}`}></div>
      </div>
      <span className="radio-label">{label}</span>
    </div>
  );
};

RadioButton.propTypes = {
  size: PropTypes.oneOf(['large', 'small']),
  selected: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioButton;
